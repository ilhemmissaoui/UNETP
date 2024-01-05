import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useAuth from '../hooks/use-auth';
import { FormParamsProvider } from '../hooks/use-form-params';
import useToast from '../hooks/use-toast';
import { profileSchema } from '../schemas/users';
import settings from '../settings';
import UserAvatar from '../ui/components/UserAvatar';
import GlobalInfo from '../ui/components/Users/components/Form/GlobalInfo';
import { withAuthenticatedRoute } from '../ui/fragments/AuthenticatedRoute';
import Layout from '../ui/layouts';
import { generateFullName } from '../ui/utils/nav';
const componentsParams = {
    coordinates: {
        arrayName: 'coordinates'
    },
    histories: {
        arrayName: 'histories'
    }
};
const { endpointUrl } = settings;
const Profile = () => {
    const { setToast } = useToast();
    const { user, gatherUserInfo } = useAuth();
    const { push } = useRouter();

    const updateForm = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: user.profile
    });
    const {
        handleSubmit,
        formState: { isSubmitting }
    } = updateForm;

    const submit = async (data) => {
        try {
            await axios.post(`${endpointUrl}/users/update-user`, data);
            setToast({
                message: 'Informations personnelles ont été mis à jour avec succès',
                variant: 'success'
            });
            push('/');
            gatherUserInfo();
        } catch (e) {
            setToast({
                message: 'Erreur lors de mis à jour des informations personnelles',
                variant: 'danger'
            });
        }
    };

    return (
        <Layout>
            <Head>
                <title>Profile | {process.env.platformName} </title>
            </Head>

            <form id="add-user" onSubmit={handleSubmit(submit)}></form>
            <div className="content d-flex flex-column flex-column-fluid" id="kt_post">
                <div className="content container-fluid">
                    <div className="card mb-5 mb-xl-10">
                        <div className="card-body pt-9 pb-0">
                            <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                                <div className="me-7 mb-4">
                                    <UserAvatar />
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                        <div className="d-flex flex-column">
                                            <div className="d-flex align-items-center mb-2">
                                                <a
                                                    href="#"
                                                    className=" btn btn-link text-gray-900 text-hover-primary fs-2 fw-bolder me-1">
                                                    {generateFullName(user?.profile)}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <form action="" id="update-me">
                                <FormProvider {...updateForm}>
                                    <FormParamsProvider {...componentsParams}>
                                        <GlobalInfo />
                                    </FormParamsProvider>
                                </FormProvider>
                            </form>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <Link href="/" passHref>
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
            </div>
        </Layout>
    );
};
export default withAuthenticatedRoute(Profile);
