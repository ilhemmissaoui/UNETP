import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { FormProvider, useForm } from 'react-hook-form';

import useCRUD, { MultiCRUDProvider } from '../../../hooks/use-crud';
import { FormParamsProvider } from '../../../hooks/use-form-params';
import useToast from '../../../hooks/use-toast';
import networkSchema, { networkSchemas } from '../../../schemas/networkSchema';
import settings from '../../../settings';
import withAbility from '../../../ui/components/GUARDS';
import GlobalInfo from '../../../ui/components/Networks/components/GlobalInfo';
import Users from '../../../ui/components/SharedComponents/Functions';
import Histories from '../../../ui/components/SharedComponents/Histories';
import Layout from '../../../ui/layouts';
import FormProviderSafety from '../../../ui/utils/FormProviderSafety';

const { endpointUrl } = settings;
const componentsParams = {
    parameter: {
        functionType: 6
    },
    histories: {
        arrayName: 'organization.histories'
    },
    coordinates: {
        arrayName: 'organization.coordinates'
    },
    functions: {
        arrayName: 'organization.functions'
    }
};

const tabs = {
    globalInfo: {
        component: GlobalInfo,
        label: 'Informations Générales'
    },
    function: {
        component: Users,
        label: 'Fonctions'
    },
    histories: {
        component: Histories,
        label: 'Historique'
    }
};

const Update = () => {
    const [network, setNetwork] = useState();
    const { setToast } = useToast();
    const updateForm = useForm({
        resolver: yupResolver(networkSchema)
    });
    const [isLoading, setIsLoading] = useState(true);

    const { query } = useRouter();
    const {
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = updateForm;
    const [currentTab, setCurrentTab] = useState(Object.keys(tabs)[0]);
    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    console.log(updateForm.formState.errors);
    const { component: Component } = tabs[currentTab];
    const establishments = useCRUD({
        singleName: 'establishment',
        pluralName: 'establishments',
        pageSize: null
    });
    const { update } = useCRUD({
        singleName: 'network',
        pluralName: 'networks'
    });
    const { push } = useRouter();
    const submit = async (data) => {
        try {
            await update({ id: query?.id, data });
            setToast({
                message: 'Réseau mis à jour avec succès',
                variant: 'success'
            });
            push('/reseaux');
        } catch (e) {
            console.log(e);
            setToast({
                message: 'Erreur lors de mis à jour de réseau',
                variant: 'danger'
            });
        }
    };
    const fetchNetwork = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/networks/${query?.id}`);
            setNetwork(data);
            const { organization } = data;
            console.log(organization?.id);
            reset({
                organization: {
                    id: organization?.id,
                    name: organization?.name,
                    description: organization?.description,
                    functions: organization?.functions,
                    coordinates: organization?.coordinates,

                    histories: organization?.histories
                },
                establishments: data?.organizations.map(
                    ({ organization, networkId, establishmentId }) => {
                        return {
                            mode: 'search',
                            id: organization?.id,
                            establishmentId,
                            organization,
                            networkId,
                            establishmentKey: organization?.establishment?.establishmentKey,
                            establishmentNumber: organization?.establishment?.establishmentNumber
                        };
                    }
                ),
                createdAt: data?.createdAt
            });
            setIsLoading(false);
        } catch (e) {
            setToast({
                message: 'Erreur lors de la récupération de réseau',
                variant: 'danger'
            });
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (query?.id) fetchNetwork();
    }, [query?.id]);
    const handleError = (errors) => {
        const firstKey = Object.keys(errors)[0];
        const index = networkSchemas.findIndex((e) => Object.keys(e.fields).includes(firstKey));
        setCurrentTab(Object.keys(tabs)[index]);
    };

    return (
        <Layout>
            <Head>
                <title>Mise à jour d&apos;un réseau | {process.env.platformName} </title>
            </Head>
            {isLoading ? (
                <div className="d-flex w-100 justify-content-center my-20">
                    <Spinner animation="border" />
                </div>
            ) : (
                <FormProvider {...updateForm}>
                    <MultiCRUDProvider establishments={establishments}>
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        {' '}
                                        {network?.organization?.name}{' '}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form
                                        id="update-network"
                                        onSubmit={handleSubmit(submit, handleError)}></form>
                                    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x fs-5 fw-bolder mt-5 mb-10">
                                        {Object.entries(tabs).map(([key, { label }]) => (
                                            <li className="nav-item" key={key}>
                                                <a
                                                    href="#"
                                                    className={clsx(
                                                        'nav-link nav-link text-active-primary',
                                                        {
                                                            active: currentTab === key
                                                        }
                                                    )}
                                                    onClick={handleSelectedTab(key)}>
                                                    {label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    <FormProviderSafety>
                                        <FormParamsProvider {...componentsParams}>
                                            <Component />
                                        </FormParamsProvider>
                                    </FormProviderSafety>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <Link href="/reseaux" passHref>
                                        <a href="#" className="btn btn-secondary">
                                            <i className="fa fa-arrow-left"></i> Annuler
                                        </a>
                                    </Link>

                                    <button
                                        className="btn btn-primary d-flex"
                                        form="update-network"
                                        disabled={isSubmitting}>
                                        <span>
                                            {!isSubmitting ? (
                                                <i className="fa fa-save"></i>
                                            ) : (
                                                <span className="spinner-border spinner-border-sm align-middle me-2 " />
                                            )}
                                        </span>

                                        <span> Enregistrer </span>
                                    </button>
                                </div>
                            </div>
                        </div>{' '}
                    </MultiCRUDProvider>
                </FormProvider>
            )}
        </Layout>
    );
};
export default withAbility(Update, { a: 'network', I: 'write' });
