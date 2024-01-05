import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useAuth from '../hooks/use-auth';
import { loginSchema } from '../schemas/users';
import Alert from '../ui/components/Alert';
import InputPasswordToggle from '../ui/components/Form/InputPasswordToggle';

const Login = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const [serverError, setServerError] = useState();

    const { login: doLogin } = useAuth();
    const { push } = useRouter();
    const submit = async ({ username, password }) => {
        try {
            await doLogin({ username, password });
            push('/');
        } catch (e) {
            setServerError(
                e?.response?.data?.message || 'Veuillez vérifier votre identifiant/mot de passe'
            );
        }
    };
    return (
        <>
            <Head>
                <title>Système de gestion de l&apos;UNETP </title>
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
                            <Alert
                                title={serverError}
                                description="Veuillez vérifier votre identifiant/mot de passe"
                                isShow={!!serverError?.length}
                            />
                            <div className="text-center mb-10">
                                <h1 className="text-dark mb-3">
                                    Système de gestion de l&apos;UNETP
                                </h1>
                                <div className="text-gray-400 fw-bold fs-4">Authentification</div>
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
                                    // eslint-disable-next-line jsx-a11y/no-autofocus
                                    autoFocus
                                    name="username"
                                    // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                                    tabIndex={1}
                                    {...register('username')}
                                />
                                <div className="fv-plugins-message-container invalid-feedback">
                                    {errors?.username?.message}
                                </div>
                            </div>
                            <div className="fv-row mb-10 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid">
                                <div className="d-flex flex-stack mb-2">
                                    <label className="form-label fw-bolder text-dark fs-6 mb-0">
                                        Mot de passe
                                    </label>
                                    <Link href="/forgot-password" passHref>
                                        <a className="link-primary fs-6 fw-bolder">
                                            Mot de passe oublié ?
                                        </a>
                                    </Link>
                                </div>
                                <InputPasswordToggle
                                    id="login-password"
                                    // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                                    tabIndex={2}
                                    {...register('password')}
                                    inputClassName={errors?.password ? 'is-invalid' : null}>
                                    <div className="invalid-feedback">
                                        {errors?.password?.message}
                                    </div>{' '}
                                </InputPasswordToggle>
                                <div className="fv-plugins-message-container invalid-feedback" />
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary w-100 mb-5"
                                    disabled={isSubmitting}>
                                    <span
                                        className={clsx('indicator-label', {
                                            'd-none': isSubmitting
                                        })}>
                                        Connexion
                                    </span>
                                    <span
                                        className={clsx('indicator-progress', {
                                            'd-block': isSubmitting
                                        })}>
                                        Authentification...
                                        <span className="spinner-border spinner-border-sm align-middle ms-2" />
                                    </span>
                                </button>
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
export default Login;
