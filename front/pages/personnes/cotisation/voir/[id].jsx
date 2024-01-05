import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { MultiCRUDProvider } from '../../../../hooks/use-crud';
import useToast from '../../../../hooks/use-toast';
import settings from '../../../../settings';
import View from '../../../../ui/components/Modals/View';
import UserSubscriptionFees from '../../../../ui/components/SubscriptionFees/UserSubscriptionFees';
import UserView from '../../../../ui/components/Users/components/View';
import Layout from '../../../../ui/layouts';

const { endpointUrl } = settings;

const Update = () => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    const { query } = useRouter();
    const [data, setData] = useState();
    const [establishments, setEstablishments] = useState();
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
    const fetchSubscriptionFees = async () => {
        try {
            const res = await axios.get(`${endpointUrl}/subscription-fees/${query?.id}`);

            const clearedData = cleanData(res.data);
            const groupedFees = [
                cleanData(res.data)?.establishmentSubscriptionFees[0],
                cleanData(res.data),
                ...(cleanData(
                    res.data
                )?.establishmentSubscriptionFees[0]?.userSubscriptionFees.filter(
                    (e) => e?.id != res?.data?.id
                ) || [])
            ].filter((e) => !!e);
            const fees = clearedData?.establishmentSubscriptionFees[0];
            setData({
                ...clearedData,
                establishmentSubscriptionFees: groupedFees,
                organizationId: clearedData?.establishmentSubscriptionFees[0]?.organization?.id,
                usersIncluded:
                    clearedData?.establishmentSubscriptionFees[0]?.userSubscriptionFees.map((e) => {
                        return { entity: { ...e?.user }, type: 'user' };
                    }),
                payments: Object.values(
                    [
                        ...(fees?.subscriptionPayments || []).map((e) => ({
                            ...e,
                            type: 'organization',
                            entity: fees?.organization
                        })),
                        ...(fees?.userSubscriptionFees
                            ?.map((e) =>
                                e?.subscriptionPayments.map((s) => ({ ...s, entity: e?.user }))
                            )
                            .flat()
                            ?.map((e) => ({ ...e, type: 'user' })) || [])
                    ].reduce((acc, cv) => {
                        if (acc[cv?.paymentRefId]) {
                            acc[cv?.paymentRefId].push(cv);
                        } else {
                            acc[cv?.paymentRefId] = [cv];
                        }
                        return acc;
                    }, {})
                )
            });
            setEstablishments(cleanData(res.data));
        } catch (e) {
            setToast({
                message: 'Erreur lors de la récupération du personne',
                variant: 'danger'
            });
        }
    };

    const handleOrganizationChanged = (organizationId) => {
        if (establishments && organizationId) {
            const establishmentSubscriptionFees =
                establishments?.establishmentSubscriptionFees?.find(
                    (e) => e?.organizationId == organizationId
                );
            setData({
                ...data,
                establishmentSubscriptionFees: [
                    establishmentSubscriptionFees,
                    ...establishmentSubscriptionFees.userSubscriptionFees
                ],
                organizationId,
                usersIncluded: establishmentSubscriptionFees?.userSubscriptionFees.map((e) => {
                    return { entity: { ...e?.user }, type: 'user' };
                }),
                payments: Object.values(
                    [
                        ...(establishmentSubscriptionFees?.subscriptionPayments || []).map((e) => ({
                            ...e,
                            type: 'organization',
                            entity: establishmentSubscriptionFees.organization
                        })),
                        ...(establishmentSubscriptionFees?.userSubscriptionFees
                            ?.map((e) =>
                                e.subscriptionPayments.map((s) => ({ ...s, entity: e.user }))
                            )
                            .flat()
                            ?.map((e) => ({ ...e, type: 'user' })) || [])
                    ].reduce((acc, cv) => {
                        if (acc[cv.paymentRefId]) {
                            acc[cv.paymentRefId].push(cv);
                        } else {
                            acc[cv.paymentRefId] = [cv];
                        }
                        return acc;
                    }, {})
                )
            });
        }
    };

    useEffect(() => {
        if (query?.id) fetchSubscriptionFees();
    }, [query?.id]);

    return (
        <>
            <Layout>
                <Head>
                    <title>Mise à jour d&apos;une cotisation | {process.env.platformName} </title>
                </Head>

                <MultiCRUDProvider
                    usersIncluded={data?.usersIncluded}
                    establishmentSubscriptionFees={data?.establishmentSubscriptionFees}>
                    {' '}
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">GESTION D&apos;UNE COTISATION</div>
                            </div>

                            <div className="card-body">
                                <div className="notice  bg-light-success border-dashed  border-success rounded border p-3 mb-3">
                                    <div className="flex-shrink-0 mb-3">
                                        <span className="text-gray-600 fs-5 fw-bolder me-2 d-flex lh-1 pb-1 p-3">
                                            Contexte :
                                        </span>
                                        <ul className="py-3">
                                            <li>
                                                <span className="text-gray-800 fs-5 fw-bolder  me-2">
                                                    Année :
                                                </span>
                                                <span className="text-gray-700 fids-6">
                                                    {data?.subscriptionParam?.year}
                                                </span>
                                            </li>

                                            <li>
                                                <span className="text-gray-800 fs-5 fw-bolder  me-2">
                                                    Cotisation de personnelle de :
                                                </span>
                                                <button
                                                    className="btn btn-link"
                                                    onClick={toggleIsView}>
                                                    {`${data?.user?.civility?.abbreviation}  ${data?.user?.firstName} ${data?.user?.lastName}`}
                                                </button>
                                            </li>

                                            {establishments?.establishmentSubscriptionFees?.length >
                                            0 ? (
                                                <li>
                                                    <div className="text-gray-800 fs-5 fw-bolder  me-2">
                                                        <label className="form-label  text-gray-800 fs-5 fw-bolder  me-2">
                                                            {' '}
                                                            Pour l&apos;établissement :
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            onChange={(e) =>
                                                                handleOrganizationChanged(
                                                                    e.target.value
                                                                )
                                                            }>
                                                            {establishments?.establishmentSubscriptionFees?.map(
                                                                (e) => {
                                                                    return (
                                                                        <option
                                                                            className="text-gray-700 fs-6"
                                                                            key={e?.id}
                                                                            value={
                                                                                e?.organization?.id
                                                                            }>
                                                                            {e?.organization?.name}{' '}
                                                                            (clé{' '}
                                                                            {
                                                                                e?.organization
                                                                                    ?.establishment
                                                                                    ?.establishmentKey
                                                                            }
                                                                            )
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                        </select>
                                                    </div>
                                                </li>
                                            ) : (
                                                <li>
                                                    <span className="text-gray-800 fs-5 fw-bolder  me-2">
                                                        Cotisation non liée à un établissement
                                                    </span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>{' '}
                                </div>
                                <UserSubscriptionFees data={data} />
                            </div>
                        </div>
                    </div>
                </MultiCRUDProvider>
            </Layout>

            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                customTitle="Fiche personne"
                pluralName="users"
                id={data?.user?.id}
                label={`${data?.user?.civility?.abbreviation} ${data?.user?.firstName} ${data?.user?.lastName} `}>
                <UserView isMultipleTables={true} />
            </View>
        </>
    );
};

export default Update;
