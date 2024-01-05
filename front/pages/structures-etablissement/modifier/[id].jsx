import { subject } from '@casl/ability';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { FormProvider, useForm } from 'react-hook-form';

import useAuth from '../../../hooks/use-auth';
import useCRUD, { MultiCRUDProvider } from '../../../hooks/use-crud';
import { FormParamsProvider } from '../../../hooks/use-form-params';
import useToast from '../../../hooks/use-toast';
import {
    editEstablishementAdminSchema,
    editEstablishementSchema
} from '../../../schemas/establishmentSchema';
import settings from '../../../settings';
import Diplomas from '../../../ui/components/Establishments/Diplomas';
import GlobalInfo from '../../../ui/components/Establishments/GlobalInfo';
import SubscriptionFees from '../../../ui/components/Establishments/SubscriptionFees';
import withAbility from '../../../ui/components/GUARDS';
import Functions from '../../../ui/components/SharedComponents/Functions';
import Histories from '../../../ui/components/SharedComponents/Histories';
import Layout from '../../../ui/layouts';
import FormProviderSafety from '../../../ui/utils/FormProviderSafety';
const { endpointUrl } = settings;
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
    diploma: {
        component: Diplomas,
        label: 'Diplômes'
    },
    function: {
        component: Functions,
        label: 'Personnes'
    },
    histories: {
        component: Histories,
        label: 'Historique'
    },
    subscriptionFees: {
        component: SubscriptionFees,
        label: 'Cotisations'
    }
};

const Update = () => {
    const { user } = useAuth();

    const memberAndManagerRoles = [0, 300];
    const adminRole = [100];
    const { setToast } = useToast();
    const updateForm = useForm({
        resolver: yupResolver(
            adminRole.includes(user?.role)
                ? editEstablishementAdminSchema
                : memberAndManagerRoles.includes(user?.role)
                ? editEstablishementSchema
                : editEstablishementSchema
        )
    });
    const { query } = useRouter();
    const [establishment, setEstablishment] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [organizationId, setOrganizationId] = useState();

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting, dirtyFields, errors }
    } = updateForm;
    const [currentTab, setCurrentTab] = useState(Object.keys(tabs)[0]);
    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    const { component: Component } = tabs[currentTab];

    const functionLabels = useCRUD({
        singleName: 'function-label',
        pluralName: 'function-labels',
        pageSize: null
    });
    const establishments = useCRUD({
        singleName: 'establishment',
        pluralName: 'establishments',
        pageSize: null
    });
    const subscriptionParams = useCRUD({
        singleName: 'subscription-param',
        pluralName: 'subscription-params',
        pageSize: null
    });
    const { push } = useRouter();
    const submit = async (data) => {
        try {
            await establishments?.update({ id: query?.id, data });
            setToast({
                message: "L'établissement a été mis à jour avec succès",
                variant: 'success'
            });

            const finalObject = Object.fromEntries(
                Object.keys(dirtyFields).map((e) => [e, data[e]])
            );
            user?.role !== 100 &&
                (await axios.post(
                    `${endpointUrl}/request-change/touched-fields/${query?.id}`,
                    finalObject
                ));

            push('/structures-etablissement');
        } catch (e) {
            setToast({
                message: "Erreur lors de mis à jour de L'établissement ",
                variant: 'danger'
            });
        }
    };

    const fetchEstablishment = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/establishments/${query?.id}`);

            reset({
                ...data,
                members: data?.relationship ? data?.relationship : '0',
                organization: data?.organization,
                coordinates: data?.organization?.coordinates,
                guardianships: data?.organization?.guardianships?.map(({ id, label }) => ({
                    label,
                    value: id
                })),
                childEstablishments: data?.organization?.childrenOrganizations?.map((e) => {
                    return {
                        id: e?.id,
                        value: e?.id,
                        label: e?.name,
                        mode: 'search'
                    };
                }),
                pensions: data?.organization?.pensions?.map(({ id, label }) => ({
                    value: id,
                    label
                })),
                capacityHistories: data?.organization?.capacityHistories,
                parings: data?.organization?.organizationHasCountryPairings?.map(({ country }) => {
                    return { value: country.id, label: country.label };
                }),
                partners: data?.organization?.organizationHasCountryPartners?.map(({ country }) => {
                    return { value: country.id, label: country.label };
                }),
                departmentId: data?.department?.id,
                academyId: data?.academy?.id,
                delegationId: data?.delegation?.id,
                users: data?.organization?.functions,
                diplomas: data?.organization?.diplomas?.map((d) => {
                    return {
                        diplomaId: d?.diplomaId,
                        complement: d?.complement
                    };
                }),
                histories: data?.organization?.histories?.map(
                    ({ label, startDate, endDate, comment, historyType, historyIdType, user }) => ({
                        historyIdType,
                        historyType,
                        label,
                        userId: user?.id,
                        user,
                        startDate,
                        endDate,
                        comment
                    })
                ),
                mixed: data.mixed,
                labels: data?.organization?.organizationHasEstablishmentLabels?.map(
                    ({ establishmentLabel }) => {
                        return { value: establishmentLabel?.id, label: establishmentLabel?.label };
                    }
                ),
                subscriptionFees: data?.organization?.subscriptionFees?.map((e) => {
                    return { ...e, year: e.subscriptionParam.year };
                }),
                ogecName: data?.ogecName,
                ogecAddress: data?.ogecAddress,
                ogecPhoneNumber: data?.ogecPhoneNumber,
                ogecEmail: data?.ogecEmail,
                ogecCity: data?.ogecCity
            });
            setIsLoading(false);
            setEstablishment(data);
            setOrganizationId(data.organization.id);
        } catch (e) {
            setToast({
                message: "Erreur lors de la récupération de l'établissement",
                variant: 'danger'
            });
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (query?.id) fetchEstablishment();
    }, [query?.id]);

    const city =
        establishment?.organization?.coordinates.find((e) => e?.isDefault)?.city ||
        establishment?.organization?.coordinates[0]?.city;

    return (
        <Layout>
            <Head>
                <title>Mise à jour d&apos;un établissement | {process.env.platformName} </title>
            </Head>
            {isLoading ? (
                <div className="d-flex w-100 justify-content-center my-20">
                    <Spinner animation="border" />
                </div>
            ) : (
                <MultiCRUDProvider
                    establishmentId={organizationId}
                    subscriptionParams={subscriptionParams}
                    establishments={establishments}
                    functionLabels={functionLabels}
                    establishmentKey={establishment?.establishmentKey}>
                    <FormProvider {...updateForm}>
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        <div className="d-flex flex-column w-100">
                                            <div>
                                                <div className="d-flex align-items-center">
                                                    <span className="badge badge-primary badge-lg">
                                                        {establishment?.establishmentKey}
                                                    </span>
                                                    <span className="ms-2">
                                                        {establishment?.organization?.name}
                                                    </span>

                                                    {establishment?.department?.departmentCode && (
                                                        <span className="ms-2 badge badge-info badge-outline">
                                                            {
                                                                establishment?.department
                                                                    ?.departmentCode
                                                            }
                                                        </span>
                                                    )}

                                                    {city && (
                                                        <span className="ms-2 badge badge-secondary badge-outline">
                                                            {city}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="badge badge-primary badge-lg"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form id="add-user" onSubmit={handleSubmit(submit)}></form>
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
                                            <Component isUpdate={true} />
                                        </FormParamsProvider>
                                    </FormProviderSafety>
                                </div>

                                <span className="invalid-feedback d-flex text-center">
                                    {errors?.users?.message}
                                </span>

                                <div className="card-footer d-flex justify-content-between">
                                    <Link href="/structures-etablissement" passHref>
                                        <a className="btn btn-secondary">
                                            <i className="fa fa-arrow-left"></i> Annuler
                                        </a>
                                    </Link>
                                    <button
                                        className="btn btn-primary"
                                        form="add-user"
                                        disabled={isSubmitting}>
                                        <span>
                                            {!isSubmitting ? (
                                                <i className="fa fa-save"></i>
                                            ) : (
                                                <span className="spinner-border spinner-border-sm align-middle me-2 " />
                                            )}
                                        </span>{' '}
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
export default withAbility(Update, (query) => ({
    I: 'write',
    this: subject('establishment', { id: parseInt(query?.id) })
}));
