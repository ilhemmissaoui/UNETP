import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useCRUD, { MultiCRUDProvider } from '../../hooks/use-crud';
import { FormParamsProvider } from '../../hooks/use-form-params';
import useToast from '../../hooks/use-toast';
import networkSchema, { networkSchemas } from '../../schemas/networkSchema';
import withAbility from '../../ui/components/GUARDS';
import GlobalInfo from '../../ui/components/Networks/components/GlobalInfo';
import Users from '../../ui/components/SharedComponents/Functions';
import Histories from '../../ui/components/SharedComponents/Histories';
import Layout from '../../ui/layouts';

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
        label: 'Personnes'
    },
    histories: {
        component: Histories,
        label: 'Historique'
    }
};

const NewNetwork = () => {
    const { setToast } = useToast();
    const addForm = useForm({
        resolver: yupResolver(networkSchema)
    });
    const {
        handleSubmit,
        formState: { isSubmitting }
    } = addForm;
    const [currentTab, setCurrentTab] = useState(Object.keys(tabs)[0]);
    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    console.log(addForm?.formState?.errors);
    const { component: Component } = tabs[currentTab];
    const handleError = (errors) => {
        const firstKey = Object.keys(errors)[0];
        const index = networkSchemas.findIndex((e) => Object.keys(e.fields).includes(firstKey));
        setCurrentTab(Object.keys(tabs)[index]);
    };
    const { add } = useCRUD({
        singleName: 'network',
        pluralName: 'networks'
    });
    const functionLabels = useCRUD({
        singleName: 'function-label',
        pluralName: 'function-labels',
        pageSize: null
    });
    const countries = useCRUD({
        singleName: 'country',
        pluralName: 'countries',
        pageSize: null
    });
    const establishments = useCRUD({
        singleName: 'establishment',
        pluralName: 'establishments',
        pageSize: null
    });
    const { push } = useRouter();
    const submit = async (data) => {
        try {
            await add(data);
            setToast({
                message: 'Réseau créé avec succès',
                variant: 'success'
            });
            push('/reseaux');
        } catch (e) {
            console.log(e);
            setToast({
                message: 'Erreur lors de creation de réseau',
                variant: 'danger'
            });
        }
    };

    return (
        <Layout>
            <Head>
                <title>Création d&apos;un réseau | {process.env.platformName} </title>
            </Head>
            <MultiCRUDProvider
                functionLabels={functionLabels}
                countries={countries}
                establishments={establishments}>
                <FormProvider {...addForm}>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <form
                                    id="add-network"
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
                                <FormParamsProvider {...componentsParams}>
                                    <Component />
                                </FormParamsProvider>
                            </div>

                            <div className="card-footer d-flex justify-content-between">
                                <Link href="/reseaux" passHref>
                                    <a className="btn btn-secondary">
                                        <i className="fa fa-arrow-left"></i> Annuler
                                    </a>
                                </Link>
                                <button
                                    className="btn btn-primary d-flex"
                                    form="add-network"
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
                    </div>
                </FormProvider>
            </MultiCRUDProvider>
        </Layout>
    );
};
export default withAbility(NewNetwork, { a: 'network', I: 'create' });
