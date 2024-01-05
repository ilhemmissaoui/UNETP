import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useCRUD from '../../../hooks/use-crud';
import { FormParamsProvider } from '../../../hooks/use-form-params';
import useToast from '../../../hooks/use-toast';
import delegationSchema, { delegationSchemas } from '../../../schemas/delegationSchema';
import settings from '../../../settings';
import GlobalInfo from '../../../ui/components/Delegations/GlobalInfo';
import withAbility from '../../../ui/components/GUARDS';
import Users from '../../../ui/components/SharedComponents/Functions';
import Histories from '../../../ui/components/SharedComponents/Histories';
import Layout from '../../../ui/layouts';
import FormProviderSafety from '../../../ui/utils/FormProviderSafety';
const { endpointUrl } = settings;
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
    },
    parameter: {
        functionType: 5
    }
};
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

const Update = () => {
    const [delegation, setDelegation] = useState();
    const { setToast } = useToast();
    const updateForm = useForm({
        resolver: yupResolver(delegationSchema)
    });
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
    const { component: Component } = tabs[currentTab];
    const { push } = useRouter();
    const submit = async (data) => {
        try {
            await update({ id: query?.id, data });
            setToast({
                message: 'Delegation mis à jour  avec succès',
                variant: 'success'
            });
            push('/delegations-regionales');
        } catch (e) {
            setToast({
                message: 'Erreur lors de mis à jour de delegation',
                variant: 'danger'
            });
        }
    };
    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/delegations/${query?.id}`);
            console.log(data);
            setDelegation(data);
            const { reference, organization, organizationId } = data;
            reset({
                reference,
                organizationId,
                coordinates: organization?.coordinates,
                histories: organization?.histories,
                users: organization?.functions,
                delegationName: organization?.name
            });
        } catch (e) {
            setToast({
                message: 'Erreur lors de la récupération de delegation',
                variant: 'danger'
            });
        }
    };
    const handleError = (errors) => {
        console.log(errors);
        const firstKey = Object.keys(errors)[0];
        const index = delegationSchemas.findIndex((e) => Object.keys(e.fields).includes(firstKey));
        setCurrentTab(Object.keys(tabs)[index]);
    };
    const { update } = useCRUD({
        singleName: 'delegation',
        pluralName: 'delegations'
    });
    useEffect(() => {
        if (query?.id) fetchUser();
    }, [query?.id]);
    return (
        <Layout>
            <Head>
                <title>Mise à jour d&apos;une délégation | {process.env.platformName} </title>
            </Head>
            <FormParamsProvider {...componentsParams}>
                <FormProvider {...updateForm}>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">{delegation?.organization?.name}</div>
                            </div>
                            <div className="card-body">
                                <form
                                    id="add-delegation"
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
                                    <Component />
                                </FormProviderSafety>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <Link href="/delegations-regionales" passHref>
                                    <a className="btn btn-secondary">
                                        <i className="fa fa-arrow-left"></i> Annuler
                                    </a>
                                </Link>

                                <button
                                    className="btn btn-primary d-flex"
                                    form="add-delegation"
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
            </FormParamsProvider>
        </Layout>
    );
};
export default withAbility(Update, { a: 'delegation', I: 'write' });
