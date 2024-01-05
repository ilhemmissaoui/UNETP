import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import clsx from 'clsx';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import { FormParamsProvider } from '../../../hooks/use-form-params';
import useToast from '../../../hooks/use-toast';
import unetpSchema, { unetpSchemas } from '../../../schemas/unetpSchema';
import settings from '../../../settings';
import { Ability } from '../../../ui/components/GUARDS';
import Users from '../../../ui/components/SharedComponents/Functions';
import Histories from '../../../ui/components/SharedComponents/Histories';
import GlobalInfos from '../../../ui/components/UNETP/components/GlobalInfos';
import Layout from '../../../ui/layouts';
import FormProviderSafety from '../../../ui/utils/FormProviderSafety';
const { endpointUrl } = settings;

const componentsParams = {
    parameter: {
        functionType: 3
    },
    histories: {
        arrayName: 'histories'
    },
    coordinates: {
        arrayName: 'coordinates'
    },
    functions: {
        arrayName: 'functions'
    }
};
const tabs = {
    globalInfo: {
        component: GlobalInfos,
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
const OfficeDirectorsBoard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [boardDirector, setBoardDirector] = useState();

    const { setToast } = useToast();
    const addForm = useForm({
        resolver: yupResolver(unetpSchema)
    });
    const {
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = addForm;
    const [currentTab, setCurrentTab] = useState(Object.keys(tabs)[0]);
    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    const { component: Component } = tabs[currentTab];
    const handleError = (errors) => {
        console.log(errors);
        const firstKey = Object.keys(errors)[0];
        const index = unetpSchemas.findIndex((e) => Object.keys(e.fields).includes(firstKey));
        setCurrentTab(Object.keys(tabs)[index]);
    };
    const fetchOffice = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/office-board-directors`);
            console.log({ data });
            reset({
                name: data?.organization?.name,
                functions: data?.organization?.functions,
                histories: data?.organization?.histories,
                coordinates: data?.organization?.coordinates
            });
            setIsLoading(false);
            setBoardDirector(data);
        } catch (e) {
            console.log(e);
            setToast({
                message: "Erreur lors de la récupération de l'établissement",
                variant: 'danger'
            });
        }
    };
    const submit = async (data) => {
        try {
            await axios.post(`${endpointUrl}/office-board-directors/${boardDirector.id}`, data);
            setToast({
                message: 'Bureau du C.A. a été mis à jour avec succès',
                variant: 'success'
            });
            await fetchOffice();
        } catch (e) {
            setToast({
                message: 'Erreur lors de mis à jour du Bureau C.A. ',
                variant: 'danger'
            });
        }
    };

    useEffect(() => {
        fetchOffice();
    }, [!boardDirector]);

    return (
        <Layout>
            <Head>
                <title>Modification bureau du C.A | {process.env.platformName} </title>
            </Head>
            {isLoading ? (
                <div className="d-flex w-100 justify-content-center my-20">
                    <Spinner animation="border" />
                </div>
            ) : (
                <FormProvider {...addForm}>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
                                <form
                                    id="add-unetp"
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
                                        <form
                                            id="edit-bureau"
                                            onSubmit={handleSubmit(submit)}></form>

                                        <Component />
                                    </FormParamsProvider>
                                </FormProviderSafety>
                            </div>
                            <div className="card-footer d-flex justify-content-end">
                                <button
                                    className="btn btn-primary d-flex"
                                    form="add-unetp"
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
                            <Ability I="save" an="unetp">
                                <div className="card-footer d-flex justify-content-end">
                                    <button className="btn btn-primary" form="edit-bureau">
                                        {' '}
                                        <i className="fa fa-save"></i> Enregistrer
                                    </button>
                                </div>
                            </Ability>
                        </div>
                    </div>
                </FormProvider>
            )}
        </Layout>
    );
};

export default OfficeDirectorsBoard;
