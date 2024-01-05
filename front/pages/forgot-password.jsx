import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import useToast from '../hooks/use-toast';
import { forgotPasswordSchema } from '../schemas/users';
import settings from '../settings';

const { endpointUrl } = settings;
const ForgotPassword = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema)
    });
    const { setToast } = useToast();
    const submit = async ({ username }) => {
        try {
            await axios.post(`${endpointUrl}/auth/forgot-password`, { username });
            setToast({
                message:
                    'Si un compte est associé à ce identifiant, vous recevrez un email contenant le lien de réinitialisation du mot de passe',
                variant: 'success'
            });
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <Head>
                <title>Mot de passe oublié | {process.env.platformName} </title>
            </Head>
            <div className="d-flex flex-column flex-root">
                <div className="d-flex flex-center flex-column flex-column-fluid">
                    <img alt="Logo" src="/images/logos/logo.png" className="h-100px mb-10" />
                    <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
                        <form
                            className="form w-100"
                            noValidate="novalidate"
                            id="kt_sign_in_form"
                            onSubmit={handleSubmit(submit)}>
                            <div className="mb-10">
                                <h1 className="text-dark mb-3">Mot de passe oublié ?</h1>
                                <div className="text-gray-400 fs-4">
                                    Saisissez votre Identifiant pour réinitialiser votre mot de
                                    passe.
                                </div>
                            </div>
                            <div className="fv-row mb-10 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                                <label className="form-label fs-6 fw-bolder text-dark">
                                    Identifiant
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className={clsx(
                                        'form-control form-control-lg form-control-solid',
                                        {
                                            'is-invalid': errors?.username
                                        }
                                    )}
                                    name="username"
                                    {...register('username')}
                                />
                                <div className="fv-plugins-message-container invalid-feedback">
                                    {errors?.username?.message}
                                </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-between">
                                <Link href="/login" passHref>
                                    <a className="btn btn-lg btn-light-primary fw-bolder">Retour</a>
                                </Link>
                                <button
                                    id="kt_password_reset_submit"
                                    className="btn btn-lg btn-primary fw-bolder"
                                    disabled={isSubmitting}>
                                    {!isSubmitting ? (
                                        <span className="indicator-label">Envoyer</span>
                                    ) : (
                                        <span className="indicator-progress d-block">
                                            S&apos;il vous plaît, attendez...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2" />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="d-flex flex-center pb-5">
                    <span className="text-muted fw-bolder">
                        ©{new Date().getFullYear()} Unetp. Tous droit réservés.{' '}
                    </span>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
