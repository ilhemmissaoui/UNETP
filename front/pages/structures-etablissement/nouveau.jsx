import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useAuth from '../../hooks/use-auth';
import useCRUD, { MultiCRUDProvider } from '../../hooks/use-crud';
import { FormParamsProvider } from '../../hooks/use-form-params';
import useToast from '../../hooks/use-toast';
import etablissmentSchema, {
    etablissmentAdminSchema,
    etablissmentAdminSchemas,
    etablissmentSchemas
} from '../../schemas/establishmentSchema';
import GlobalInfo from '../../ui/components/Establishments/GlobalInfo';
import withAbility from '../../ui/components/GUARDS';
import Users from '../../ui/components/SharedComponents/Functions';
import Histories from '../../ui/components/SharedComponents/Histories';
import Layout from '../../ui/layouts';
const componentsParams = {
    parameter: {
        functionType: 4
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

const NewEstablishment = () => {
    const { setToast } = useToast();
    const { user } = useAuth();

    const memberAndManagerRoles = [0, 300];
    const adminRole = [100];
    const addForm = useForm({
        resolver: yupResolver(
            adminRole.includes(user?.role)
                ? etablissmentAdminSchema
                : memberAndManagerRoles.includes(user?.role)
                ? etablissmentSchema
                : etablissmentSchema
        )
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

    const { push } = useRouter();
    const submit = async (data) => {
        try {
            await establishments.add(data);
            setToast({
                message: 'établissement ajouté avec succès',
                variant: 'success'
            });
            push('/structures-etablissement');
        } catch (e) {
            setToast({
                message: "Erreur lors de l'ajout de l'établissement",
                variant: 'danger'
            });
        }
    };
    const handleError = (errors) => {
        const firstKey = Object.keys(errors)[0];
        const index =
            user?.role === 100
                ? etablissmentAdminSchemas.findIndex((e) =>
                      Object.keys(e.fields).includes(firstKey)
                  )
                : etablissmentSchemas.findIndex((e) => Object.keys(e.fields).includes(firstKey));
        setCurrentTab(Object.keys(tabs)[index]);
    };

    const establishments = useCRUD({
        singleName: 'establishment',
        pluralName: 'establishments',
        pageSize: null
    });

    return (
        <Layout>
            <Head>
                <title>Création d&apos;un établissement | {process.env.platformName} </title>
            </Head>
            <MultiCRUDProvider establishments={establishments}>
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
                                <Link href="/structures-etablissement" passHref>
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
            </MultiCRUDProvider>
        </Layout>
    );
};
export default withAbility(NewEstablishment, { a: 'establishment', I: 'create' });
