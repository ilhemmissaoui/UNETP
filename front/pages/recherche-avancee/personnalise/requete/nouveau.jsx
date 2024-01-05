// import 'antd/dist/antd.css'; // or import "react-awesome-query-builder/css/antd.less";
// import 'react-awesome-query-builder/lib/css/styles.css';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useCRUD from '../../../../hooks/use-crud';
import useToast from '../../../../hooks/use-toast';
import requestSchema from '../../../../schemas/requestSchema';
import Form from '../../../../ui/components/AdvancedSearch/Personalized/Requests/Form';
import Layout from '../../../../ui/layouts';

const Nouveau = () => {
    const { setToast } = useToast();
    const router = useRouter();
    const crud = useCRUD({
        singleName: 'request',
        pluralName: 'requests',
        lazy: true
    });
    const { add } = crud;

    const addForm = useForm({
        resolver: yupResolver(requestSchema)
    });
    const {
        handleSubmit,
        formState: { isSubmitting }
    } = addForm;
    const submit = async ({ mode, request, result, label, tree, fieldSelected }) => {
        try {
            await add({ mode, request, result, label, tree, fieldSelected });
            setToast({
                message: 'Requête ajouté avec succès',
                variant: 'success'
            });
            router.push('/recherche-avancee/personnalise');
        } catch (e) {
            setToast({
                message: "Erreur lors de l'ajout de requête",
                variant: 'danger'
            });
            console.log(e);
        }
    };
    return (
        <Layout>
            <Head>
                <title>Création d&apos;une Requête | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title fw-bolder text-gray-800 fs-3">
                            Création d&apos;une Requête{' '}
                        </div>
                    </div>
                    <div className="card-body py-0">
                        <form id="create-request" onSubmit={handleSubmit(submit)}></form>
                        <FormProvider {...addForm}>
                            <Form />
                        </FormProvider>
                        <div className="card-footer py-3 d-flex justify-content-end">
                            <button
                                className="btn btn-success"
                                form="create-request"
                                type="submit"
                                disabled={isSubmitting}>
                                <span
                                    className={clsx('indicator-label', {
                                        'd-none': isSubmitting
                                    })}>
                                    <i className="far fa-check-circle fs-4 me-2" />
                                    Enregistrer
                                </span>
                                <span
                                    className={clsx('indicator-progress', {
                                        'd-block': isSubmitting
                                    })}>
                                    S&apos;il vous plaît, attendez...
                                    <span className="spinner-border spinner-border-sm align-middle ms-2" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Nouveau;
