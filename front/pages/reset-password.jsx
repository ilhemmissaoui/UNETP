import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import useToast from '../hooks/use-toast';
import { resetPasswordSchema } from '../schemas/users';
import settings from '../settings';

const { endpointUrl } = settings;
const ResetPassword = () => {
    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors }
    } = useForm({
        resolver: yupResolver(resetPasswordSchema)
    });
    const { setToast } = useToast();
    const { query, replace } = useRouter();

    const submit = async ({ password }) => {
        try {
            await axios.post(`${endpointUrl}/auth/reset-password?token=${query?.token}`, {
                password
            });
            setToast({
                message:
                    "Votre mot de passe a été changé avec succès, Redirection vers la page d'authentification",
                variant: 'success'
            });
            replace('/login');
        } catch (e) {
            console.log(e);
            setToast({
                message: 'Erreur lors de la soumission de formulaire',
                variant: 'danger'
            });
        }
    };
    return (
        <>
            <Head>
                <title>Réinitialisation de mot de passe | {process.env.platformName} </title>
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
                            <div className="text-center mb-10">
                                <h1 className="text-dark mb-3">Réinitialisation de mot de passe</h1>
                            </div>
                            <div className="fv-row mb-10 fv-plugins-icon-container">
                                <label className="form-label fw-bolder text-gray-900 fs-6">
                                    Mot de passe
                                </label>
                                <input
                                    className="form-control form-control-solid"
                                    type="password"
                                    placeholder
                                    autoComplete="off"
                                    {...register('password')}
                                />
                                <div className="fv-plugins-message-container invalid-feedback">
                                    {errors?.password?.message}
                                </div>
                            </div>
                            <div className="fv-row mb-10 fv-plugins-icon-container">
                                <label className="form-label fw-bolder text-gray-900 fs-6">
                                    Veuillez re-entrer votre mot de passe
                                </label>
                                <input
                                    className="form-control form-control-solid"
                                    type="password"
                                    placeholder
                                    autoComplete="off"
                                    {...register('confirmPassword')}
                                />
                                <div className="fv-plugins-message-container invalid-feedback">
                                    {errors?.confirmPassword?.message}
                                </div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center pb-lg-0">
                                <button
                                    id="kt_password_reset_submit"
                                    className="btn btn-lg btn-primary fw-bolder me-4"
                                    disabled={isSubmitting}>
                                    {!isSubmitting ? (
                                        <span className="indicator-label">Soumettre</span>
                                    ) : (
                                        <span className="indicator-progress d-block">
                                            S&apos;il vous plaît, attendez...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2" />
                                        </span>
                                    )}
                                </button>
                                <Link href="/login" passHref>
                                    <a className="btn btn-lg btn-light-primary fw-bolder">
                                        Annuler
                                    </a>
                                </Link>
                            </div>
                            <div />
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

export default ResetPassword;
