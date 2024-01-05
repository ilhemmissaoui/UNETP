import { subject } from '@casl/ability';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { MultiCRUDProvider } from '../../../../hooks/use-crud';
import useToast from '../../../../hooks/use-toast';
import { establishmentSubscriptionFee } from '../../../../schemas/subscriptionFeeSchema';
import settings from '../../../../settings';
import withAbility from '../../../../ui/components/GUARDS';
import View from '../../../../ui/components/Modals/View';
import SubscriptionFees from '../../../../ui/components/SubscriptionFees/EstablishmentSubscriptionFees';
import EstablishmentView from '../../../../ui/components/Tables/Establishments/View';
import Layout from '../../../../ui/layouts';
const { endpointUrl } = settings;

const Update = () => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    const { query } = useRouter();
    const [data, setData] = useState();
    const { setToast } = useToast();
    const cleanData = (data) =>
        Object.fromEntries(
            Object.entries(data)
                ?.filter((e) => e[1] !== null)
                .map((e) => {
                    let value = e[1];
                    if (Array.isArray(value)) {
                        value = value.map(cleanData);
                    } else if (typeof value === 'object') {
                        value = cleanData(value);
                    }
                    return [e[0], value];
                })
        );
    const editFrom = useForm({
        resolver: yupResolver(establishmentSubscriptionFee, { stripUnknown: true })
    });

    const { reset, handleSubmit } = editFrom;
    const fetchSubscriptionFees = async () => {
        try {
            const res = await axios.get(`${endpointUrl}/subscription-fees/${query?.id}`);
            const clearedData = cleanData(res.data);
            const entities = [
                {
                    ...clearedData.organization,
                    type: 'organization'
                },
                ...clearedData.userSubscriptionFees.map((e) => ({
                    ...e?.user,
                    type: 'user'
                }))
            ];
            const refactoredData = {
                ...clearedData,
                payments: Object.values(
                    [
                        ...(clearedData.subscriptionPayments || []).map((e) => ({
                            ...e,
                            type: 'organization',
                            entityId: res?.data?.organization?.id,
                            paymentId: e?.id
                        })),
                        ...(clearedData?.userSubscriptionFees
                            ?.map((e) =>
                                e?.subscriptionPayments?.map((s) => ({
                                    ...s,
                                    paymentId: s?.id,
                                    entityId: e?.user?.id
                                }))
                            )
                            .flat()
                            ?.map((e) => ({ ...e, type: 'user' })) || [])
                    ].reduce((acc, cv) => {
                        if (acc[cv?.paymentRefId]) {
                            acc[cv?.paymentRefId] = {
                                ...acc[cv?.paymentRefId],
                                enitiesPayments: [...acc[cv?.paymentRefId].enitiesPayments, cv]
                            };
                        } else {
                            acc[cv?.paymentRefId] = {
                                ...cv.subscriptionFeesPaymentRef,
                                enitiesPayments: [cv]
                            };
                        }
                        return acc;
                    }, {})
                ).map((e) => {
                    const entitiesUnpaid = entities
                        .filter((c) => !e?.enitiesPayments?.find((a) => a?.entityId == c?.id))
                        .map((f) => ({
                            entityId: f?.id,
                            type: f?.type
                        }));
                    return { ...e, enitiesPayments: [...e.enitiesPayments, ...entitiesUnpaid] };
                })
            };
            setData({ ...clearedData, entities });
            reset(refactoredData);
        } catch (e) {
            setToast({
                message: 'Erreur lors de la récupération du personne',
                variant: 'danger'
            });
        }
    };

    const submit = async (data) => {
        try {
            await axios.post(`${endpointUrl}/subscription-fees/${query?.id}`, data);
            setToast({
                message: 'Cotisation a été mis à jour avec succès',
                variant: 'success'
            });
            //  push('/structures-etablissement');
        } catch (e) {
            setToast({
                message: 'Erreur lors de la mise à jour de cotisation ',
                variant: 'danger'
            });
        }
    };
    useEffect(() => {
        if (query?.id) fetchSubscriptionFees();
    }, [query?.id]);

    const Header = ({ data }) => {
        const city = Header;
        data?.coordinates.find((e) => e?.isDefault)?.city || data?.coordinates[0]?.city;

        return (
            <div className="d-flex flex-column w-100">
                <div>
                    <div className="d-flex align-items-center">
                        <span>{data?.name}</span>
                        {data?.establishment?.department?.departmentCode && (
                            <span className="ms-2 badge badge-info badge-outline">
                                {data?.establishment?.department?.departmentCode}
                            </span>
                        )}
                        {city && (
                            <span className="ms-2 badge badge-secondary badge-outline">{city}</span>
                        )}
                    </div>
                    <span className="badge badge-primary badge-lg">
                        {data?.establishment?.establishmentKey}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <>
            <Layout>
                <Head>
                    <title>Mise à jour d&apos;une cotisation | {process.env.platformName} </title>
                </Head>

                <MultiCRUDProvider entities={data?.entities}>
                    {' '}
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">
                                    <span>GESTION D&apos;UNE COTISATION</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="notice bg-light-success border-dashed border-success rounded border p-3 mb-3">
                                    <div className="flex-shrink-0 mb-3">
                                        <span className="text-gray-600 fs-5 fw-bolder me-2 d-flex lh-1 pb-1 p-3">
                                            Contexte :
                                        </span>
                                        <ul className="py-3 fw-bolder">
                                            <li>
                                                <span className="text-gray-800 fs-5  me-2">
                                                    Année :
                                                </span>
                                                <span className="text-gray-700 fids-6">
                                                    {data?.subscriptionParam?.year}
                                                </span>
                                            </li>
                                            <li>
                                                <span className="text-gray-800 fs-5 me-2">
                                                    Cotisation de l&apos;établissement :{' '}
                                                </span>
                                                <span className="text-gray-700 fids-6">
                                                    <button
                                                        onClick={toggleIsView}
                                                        className="btn btn-link me-2">
                                                        {data?.organization?.name}
                                                    </button>
                                                    <span className="badge badge-primary">
                                                        {
                                                            data?.organization?.establishment
                                                                ?.establishmentKey
                                                        }
                                                    </span>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>{' '}
                                </div>
                                <form id="save-payments" onSubmit={handleSubmit(submit)}></form>

                                <FormProvider {...editFrom}>
                                    <SubscriptionFees />
                                </FormProvider>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <Link href="/structures-etablissement" passHref>
                                    <a className="btn btn-secondary">
                                        <i className="fa fa-arrow-left"></i> Annuler
                                    </a>
                                </Link>
                                <button className="btn btn-primary" form="save-payments">
                                    <i className="fa fa-save"></i> Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                </MultiCRUDProvider>
            </Layout>

            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                bsPrefix="modal-header py-3"
                pluralName="establishments"
                id={data?.organization?.establishment?.id}
                customTitle={<Header data={data?.organization} />}>
                <EstablishmentView />
            </View>
        </>
    );
};

export default withAbility(Update, (query) => ({
    I: 'write',
    this: subject('subscriptionFee', { id: parseInt(query?.id) })
}));
