import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { FormProvider, useForm } from 'react-hook-form';

import withAbility from '../../..//ui/components/GUARDS';
import useCRUD, { MultiCRUDProvider } from '../../../hooks/use-crud';
import { FormParamsProvider } from '../../../hooks/use-form-params';
import useToast from '../../../hooks/use-toast';
import { editUserSchema, editUserSchemas } from '../../../schemas/users';
import settings from '../../../settings';
import Histories from '../../../ui/components/SharedComponents/Histories';
import Access from '../../../ui/components/Users/components/Form/Access';
import Functions from '../../../ui/components/Users/components/Form/Functions';
import GlobalInfo from '../../../ui/components/Users/components/Form/GlobalInfo';
import SubscriptionFees from '../../../ui/components/Users/components/Form/SubscriptionFees';
import Layout from '../../../ui/layouts';
import FormProviderSafety from '../../../ui/utils/FormProviderSafety';

const { endpointUrl } = settings;

const componentsParams = {
    histories: {
        arrayName: 'histories'
    },
    coordinates: {
        arrayName: 'coordinates'
    }
};
const cleanData = (data) =>
    Object.fromEntries(
        Object.entries(data)
            ?.filter((e) => e[1] !== null)
            .map((e) => {
                let value = e[1];
                if (Array.isArray(value)) {
                    value = value.map(cleanData);
                } else if (typeof value === 'object') {
                    value = cleanData(value);
                }
                return [e[0], value];
            })
    );
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
    subscriptionFees: {
        component: SubscriptionFees,
        label: 'Cotisation'
    },
    acessAcount: {
        component: Access,
        label: "Compte d'accès"
    }
};

const Update = (data) => {
    const [isLoading, setIsLoading] = useState(true);

    const { setToast } = useToast();
    const updateForm = useForm({
        resolver: yupResolver(editUserSchema)
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
    const { update } = useCRUD({
        singleName: 'user',
        pluralName: 'users'
    });
    const [user, setUser] = useState();
    const { push } = useRouter();
    const submit = async (data) => {
        try {
            await update({ id: query?.id, data });
            setToast({
                message: 'Personne mis à jour avec succès',
                variant: 'success'
            });
            push('/personnes');
        } catch (e) {
            setToast({
                message: 'Erreur lors de mis à jour de personne',
                variant: 'danger'
            });
        }
    };
    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/users/${query?.id}`);
            reset({
                ...cleanData(data),

                functions: data.functions.map((e) => ({
                    ...e,
                    type: e?.functionLabel?.organizationTypeId
                })),
                role: data?.access?.role,
                isDisabled: data?.access?.isDisabled
            });
            setUser(data);
            setIsLoading(false);
        } catch (e) {
            setToast({
                message: "Erreur lors de la récupération de l'utilisateur",
                variant: 'danger'
            });
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (query?.id) fetchUser();
    }, [query?.id]);
    const handleError = (errors) => {
        const firstKey = Object.keys(errors)[0];
        const index = editUserSchemas.findIndex((e) => Object.keys(e.fields).includes(firstKey));
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
    const subscriptionFeeParams = useCRUD({
        pluralName: 'subscription-params',
        singleName: 'subscription-param',
        pageSize: null,
        defaultSort: {
            field: 'year',
            direction: 'desc'
        }
    });
    return (
        <Layout>
            <Head>
                <title>Mise à jour d&apos;une personne | {process.env.platformName} </title>
            </Head>
            {isLoading ? (
                <div className="d-flex w-100 justify-content-center my-20">
                    <Spinner animation="border" />
                </div>
            ) : (
                <MultiCRUDProvider
                    subscriptionFeeParams={subscriptionFeeParams}
                    functionLabels={functionLabels}
                    organizationTypes={organizationTypes}>
                    <FormProvider {...updateForm}>
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        {user?.firstName} {user?.lastName}
                                    </div>
                                </div>
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
                                            <Component data={data} />
                                        </FormParamsProvider>
                                    </FormProviderSafety>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <Link href="/personnes" passHref>
                                        <a href="#" className="btn btn-secondary">
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
            )}
        </Layout>
    );
};
export default withAbility(Update, { a: 'user', I: 'write' });
