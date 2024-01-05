import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useCRUD, { MultiCRUDProvider } from '../../hooks/use-crud';
import useToast from '../../hooks/use-toast';
import { multipleCapacityHistory } from '../../schemas/capacityHisotrySchema';
import settings from '../../settings';
import Cotisation from '../../ui/components/FeesCall/cotisation';
import Layout from '../../ui/layouts';
import { getCurrentYear } from '../../ui/utils/time';

const EstablishmentNumber = () => {
    const { push } = useRouter();

    const [data, setData] = useState([]);
    const { query } = useRouter();
    const { endpointUrl } = settings;
    const { setToast } = useToast();
    const currentYear = getCurrentYear();
    const countries = useCRUD({
        singleName: 'country',
        pluralName: 'countries',
        pageSize: null
    });
    const updateForm = useForm({
        resolver: yupResolver(multipleCapacityHistory)
    });

    const {
        handleSubmit,

        reset,
        formState: { isSubmitting }
    } = updateForm;

    const fetchCotisation = async () => {
        try {
            const { data } = await axios.get(
                `${endpointUrl}/users/establishments-cotisation/${query?.establishmentNumber}`
            );
            setData(data);
            reset({
                capacityHistories: data.map((e) => ({ ...e?.capacityHistories[0] }))
            });
        } catch (e) {
            setToast('Erreur lors de la récupération de cotisations');
        }
    };

    const submit = async (data) => {
        try {
            await axios.post(`${endpointUrl}/establishments/update-capacity-history`, data);
            setToast({
                message: 'Les capacités a été mise à jour avec succés.',
                variant: 'success'
            });
            push(`/paiement-de-solde`);
        } catch (e) {
            setToast({
                message: 'Erreur lors de la mise à jour des capacités.',
                variant: 'danger'
            });
        }
    };
    useEffect(async () => {
        await fetchCotisation();
    }, [query?.establishmentNumber]);
    return (
        <>
            <Layout>
                <Head>
                    <title>
                        Gestion des structures d&apos;établissement | {process.env.platformName}
                    </title>
                </Head>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <div className="pt-7">
                                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                                    Appel général à cotisations {currentYear}
                                </span>
                                <span className="text-dark fs-1 fw-bolder d-flex">
                                    {data.map(({ name }, i) => (
                                        <div className="ms-1" key={i}>
                                            {name?.substring(0, 3)}
                                            {i !== data?.length - 1 && '+'}
                                        </div>
                                    ))}
                                    <div className="ms-2">(N° {query?.establishmentNumber})</div>
                                </span>
                            </div>
                        </div>

                        <div className="card-body">
                            <MultiCRUDProvider refetch={fetchCotisation} countries={countries}>
                                <form id="update-capacity" onSubmit={handleSubmit(submit)}></form>
                                <FormProvider {...updateForm}>
                                    {data.map((e, i) => {
                                        return <Cotisation data={{ ...e, index: i }} key={e.id} />;
                                    })}
                                </FormProvider>
                            </MultiCRUDProvider>
                        </div>

                        <div className="card-footer d-flex justify-content-between">
                            <Link href="/" passHref>
                                <a href="#" className="btn btn-secondary">
                                    <i className="fa fa-arrow-left"></i> Fermer
                                </a>
                            </Link>

                            <button
                                className="btn btn-primary"
                                type="submit"
                                form="update-capacity"
                                disabled={isSubmitting}>
                                {!isSubmitting ? (
                                    <>
                                        <i className="fa fa-save"></i> Enregistrer / payer{' '}
                                    </>
                                ) : (
                                    <span className="indicator-progress d-block">
                                        S&apos;il vous plaît, attendez...
                                        <span className="spinner-border spinner-border-sm align-middle ms-2" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};
export default EstablishmentNumber;
