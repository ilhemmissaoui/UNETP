import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useCRUD from '../../hooks/use-crud';
import { FormParamsProvider } from '../../hooks/use-form-params';
import useToast from '../../hooks/use-toast';
import delegationSchema, { delegationSchemas } from '../../schemas/delegationSchema';
import GlobalInfo from '../../ui/components/Delegations/GlobalInfo';
import withAbility from '../../ui/components/GUARDS';
import Users from '../../ui/components/SharedComponents/Functions';
import Histories from '../../ui/components/SharedComponents/Histories';
import Layout from '../../ui/layouts';
const componentsParams = {
    parameter: {
        functionType: 5
    },
    histories: {
        arrayName: 'histories'
    },
    coordinates: {
        arrayName: 'coordinates'
    },
    functions: {
        arrayName: 'users'
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

const NewDelegation = () => {
    const { setToast } = useToast();
    const addForm = useForm({
        resolver: yupResolver(delegationSchema)
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
        singleName: 'delegation',
        pluralName: 'delegations'
    });
    const { push } = useRouter();
    const submit = async (data) => {
        try {
            await add(data);
            setToast({
                message: 'Delegation ajouté avec succès',
                variant: 'success'
            });
            push('/delegations-regionales');
        } catch (e) {
            setToast({
                message: "Erreur lors de l'ajout de delegation",
                variant: 'danger'
            });
        }
    };
    const handleError = (errors) => {
        const firstKey = Object.keys(errors)[0];
        const index = delegationSchemas.findIndex((e) => Object.keys(e.fields).includes(firstKey));
        setCurrentTab(Object.keys(tabs)[index]);
    };

    return (
        <Layout>
            <Head>
                <title>Création d&apos;une délégation | {process.env.platformName} </title>
            </Head>
            <FormProvider {...addForm}>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <form
                                id="add-establishment"
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
                            <Link href="/delegations-regionales" passHref>
                                <a className="btn btn-secondary">
                                    <i className="fa fa-arrow-left"></i> Annuler
                                </a>
                            </Link>
                            <button
                                className="btn btn-primary d-flex"
                                form="add-establishment"
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
        </Layout>
    );
};
export default withAbility(NewDelegation, { a: 'delegation', I: 'create' });
