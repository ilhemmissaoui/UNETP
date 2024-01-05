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
import userSchema, { userSchemas } from '../../schemas/users';
import withAbility from '../../ui/components/GUARDS';
import Histories from '../../ui/components/SharedComponents/Histories';
import Access from '../../ui/components/Users/components/Form/Access';
import Functions from '../../ui/components/Users/components/Form/Functions';
import GlobalInfo from '../../ui/components/Users/components/Form/GlobalInfo';
import Layout from '../../ui/layouts';
import FormProviderSafety from '../../ui/utils/FormProviderSafety';

const componentsParams = {
    histories: {
        arrayName: 'histories'
    },
    coordinates: {
        arrayName: 'coordinates'
    }
};
const tabs = {
    globalInfo: {
        component: GlobalInfo,
        label: 'Informations Générales'
    },
    function: {
        component: Functions,
        label: 'Fonctions'
    },
    histories: {
        component: Histories,
        label: 'Historique'
    },
    access: {
        component: Access,
        label: "Compte d'accès"
    }
};
const NewUser = () => {
    const { setToast } = useToast();
    const addForm = useForm({
        resolver: yupResolver(userSchema)
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
    const { component: Component } = tabs[currentTab];
    const { add } = useCRUD({
        singleName: 'user',
        pluralName: 'users'
    });
    const { push } = useRouter();
    const submit = async (data) => {
        try {
            await add(data);

            setToast({
                message: 'Personne ajouté avec succès',
                variant: 'success'
            });
            push('/personnes');
        } catch (e) {
            setToast({
                message: "Erreur lors de l'ajout de personne",
                variant: 'danger'
            });
        }
    };
    const handleError = (errors) => {
        const firstKey = Object.keys(errors)[0];
        const index = userSchemas.findIndex((e) => Object.keys(e.fields).includes(firstKey));
        setCurrentTab(Object.keys(tabs)[index]);
    };
    const functionLabels = useCRUD({
        singleName: 'function-label',
        pluralName: 'function-labels',
        pageSize: null
    });
    const organizationTypes = useCRUD({
        singleName: 'organization-type',
        pluralName: 'organization-types',
        pageSize: null
    });
    const organizations = useCRUD({
        singleName: 'organization',
        pluralName: 'organizations',
        pageSize: null
    });
    return (
        <Layout>
            <Head>
                <title>Création d&apos;une personne | {process.env.platformName} </title>
            </Head>
            <MultiCRUDProvider
                functionLabels={functionLabels}
                organizationTypes={organizationTypes}
                organizations={organizations}>
                <FormProvider {...addForm}>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <form
                                    id="add-user"
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
                                <Link href="/personnes" passHref>
                                    <a className="btn btn-secondary">
                                        <i className="fa fa-arrow-left"></i> Annuler
                                    </a>
                                </Link>
                                <button
                                    className="btn btn-primary d-flex"
                                    form="add-user"
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
export default withAbility(NewUser, { a: 'user', I: 'create' });
