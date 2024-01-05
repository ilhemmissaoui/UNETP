import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import zxcvbn from 'zxcvbn';

import useToast from '../hooks/use-toast';
import { changePasswordSchema } from '../schemas/users';
import settings from '../settings';
import InputPasswordToggle from '../ui/components/Form/InputPasswordToggle';
import Layout from '../ui/layouts';
const { endpointUrl } = settings;

const ChangePassword = () => {
    const [passwordStrength, setPasswordStrength] = useState(0);
    const {
        handleSubmit,
        register,
        watch,
        formState: { isSubmitting, errors }
    } = useForm({
        resolver: yupResolver(changePasswordSchema)
    });

    const { replace } = useRouter();
    const { setToast } = useToast();
    const submit = async ({ newPassword, oldPassword }) => {
        try {
            await axios.post(`${endpointUrl}/auth/change-password`, {
                oldPassword,
                newPassword
            });
            setToast({
                message:
                    "Votre mot de passe a été changé avec succès, Redirection vers la page d'authentification",
                variant: 'success'
            });
            replace('/login');
        } catch (e) {
            setToast({
                message: e?.response?.data?.data?.message,
                variant: 'danger'
            });
        }
    };
    const password = watch('newPassword');

    const checkPasswordStrength = (password) => {
        if (password) {
            var pwd = zxcvbn(password.toString());
            setPasswordStrength(pwd?.score);
        }
    };

    useEffect(() => {
        checkPasswordStrength(password);
    }, [password]);

    return (
        <>
            <Layout>
                <Head>
                    <title>Changement de mot de passe | {process.env.platformName} </title>
                </Head>

                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body row justify-content-center py-10">
                            <div className="col-md-6">
                                <form
                                    className="form"
                                    noValidate="novalidate"
                                    id="kt_sign_in_form"
                                    onSubmit={handleSubmit(submit)}>
                                    <div className="fv-row mb-8">
                                        <label htmlFor="password" className="form-label">
                                            Ancien mot de passe :
                                        </label>
                                        <InputPasswordToggle
                                            id="login-password"
                                            {...register('oldPassword')}
                                            inputClassName={
                                                errors?.oldPassword ? 'is-invalid' : null
                                            }>
                                            <div className="invalid-feedback">
                                                {errors?.oldPassword?.message}
                                            </div>
                                        </InputPasswordToggle>
                                    </div>

                                    <div className="fv-row mb-8" data-kt-password-meter="true">
                                        <label htmlFor="" className="form-label">
                                            Nouveau mot de passe :
                                        </label>
                                        <div className="input-group mb-3">
                                            <InputPasswordToggle
                                                id="login-password"
                                                {...register('newPassword')}
                                                inputClassName={
                                                    errors?.newPassword ? 'is-invalid' : null
                                                }>
                                                <div className="invalid-feedback">
                                                    {errors?.newPassword?.message}
                                                </div>
                                            </InputPasswordToggle>
                                        </div>
                                        <div
                                            className="d-flex align-items-center mb-3"
                                            data-kt-password-meter-control="highlight">
                                            <div
                                                className={clsx(
                                                    'flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2',
                                                    { 'bg-danger': passwordStrength >= 1 }
                                                )}
                                            />
                                            <div
                                                className={clsx(
                                                    'flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2',
                                                    { 'bg-warning': passwordStrength >= 2 }
                                                )}
                                            />
                                            <div
                                                className={clsx(
                                                    'flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2',
                                                    { 'bg-success': passwordStrength >= 3 }
                                                )}
                                            />
                                            <div
                                                className={clsx(
                                                    'flex-grow-1  bg-active-success rounded h-5px me-2',
                                                    { 'bg-primary': passwordStrength >= 4 },
                                                    { 'bg-secondary': passwordStrength < 4 }
                                                )}
                                            />
                                        </div>

                                        <div className="text-muted">
                                            Utilisez 8 caractères ou plus avec un mélange de
                                            lettres, de chiffres et de &amp; symboles.
                                        </div>
                                    </div>

                                    <div className="fv-row mb-8">
                                        <label htmlFor="" className="form-label">
                                            Confirmez le mot de passe :
                                        </label>
                                        <div className="input-group mb-3">
                                            <InputPasswordToggle
                                                id="login-password"
                                                {...register('confirmPassword')}
                                                inputClassName={
                                                    errors?.confirmPassword ? 'is-invalid' : null
                                                }>
                                                <div className="invalid-feedback">
                                                    {errors?.confirmPassword?.message}
                                                </div>
                                            </InputPasswordToggle>
                                        </div>
                                    </div>

                                    <div className="d-grid">
                                        <button
                                            id="kt_password_reset_submit"
                                            className="btn btn-lg btn-primary fw-bolder"
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
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default ChangePassword;
