// import 'antd/dist/antd.css'; // or import "react-awesome-query-builder/css/antd.less";
// import 'react-awesome-query-builder/lib/css/styles.css';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useCRUD from '../../../../../hooks/use-crud';
import useToast from '../../../../../hooks/use-toast';
import requestSchema from '../../../../../schemas/requestSchema';
import settings from '../../../../../settings';
import Form from '../../../../../ui/components/AdvancedSearch/Personalized/Requests/Form';
import Layout from '../../../../../ui/layouts';

const { endpointUrl } = settings;

const edit = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    const { setToast } = useToast();
    const { push, query } = useRouter();
    const crud = useCRUD({
        singleName: 'request',
        pluralName: 'requests',
        lazy: true
    });
    const { update } = crud;

    const updateForm = useForm({
        resolver: yupResolver(requestSchema)
    });

    const {
        handleSubmit,
        watch,
        reset,
        formState: { isSubmitting }
    } = updateForm;

    const fetchRequest = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/requests/${query?.id}`);
            setData(data);
            reset({
                result: data?.class,
                label: data?.label,
                tree: data?.tree,
                request: data?.request,
                fieldSelected: JSON.parse(data?.fields)
                    ?.filter((e) => e !== '*')
                    ?.map((e) => ({ label: e, value: e }))
            });
            setLoading(false);
        } catch (e) {
            setToast({ message: 'failed to fetch Request ', variant: 'danger' });
        }
    };
    const submit = async (data) => {
        try {
            await update({
                id: query.id,
                data
            });
            setToast({
                message: 'Requête mis a jour avec succès',
                variant: 'success'
            });
            push('/recherche-avancee/personnalise');
        } catch (e) {
            setToast({
                message: 'Erreur lors de mis à jour de requête',
                variant: 'danger'
            });
        }
    };
    const [label, tree] = watch(['label', 'tree']);

    useEffect(() => {
        if (query?.id) fetchRequest();
    }, [query?.id]);
    return (
        <Layout>
            <Head>
                <title> Mise à jour du Requête| {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title fw-bolder text-gray-800 fs-3">
                            Mise à jour du Requête : {label}
                        </div>
                    </div>
                    <div className="card-body py-0">
                        <form id="create-request" onSubmit={handleSubmit(submit)}></form>
                        <FormProvider {...updateForm}>
                            {!loading && <Form tree={tree} data={data} />}
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

export default edit;
