import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { transferPaymentSchema } from '../../schemas/payment';
import Layout from '../../ui/layouts';

const TransferPayment = () => {
    const [fromSubmited, setFromSubmited] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(transferPaymentSchema)
    });
    console.log(errors);
    const submitForm = () => {
        setFromSubmited(true);
    };
    return (
        <>
            <Layout>
                <Head>
                    <title>Paiement de vos cotisations | {process.env.platformName} </title>
                </Head>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body fs-5">
                            <span className="h1 ">PAIEMENT DE VOS COTISATIONS </span>
                            <div className="separator my-5" />
                            <div className="text-gray-700 mb-5">
                                Vous avez choisi de payer vos cotisations Unetp par virement ; nous
                                vous en remercions Vous trouverez ci-après les coordonnées bancaires
                                de l&apos;Unetp :
                            </div>
                            <div className="mb-5 text-left">
                                <div>
                                    <div className="text-gray-900 fw-bolder ">
                                        Coordonnées bancaires (RIB) : CAISSE D&apos;EPARGNE
                                        ILE-DE-FRANCE
                                    </div>
                                    Domiciliation : CAISSE D&apos;EPARGNE ILE-DE-FRANCE <br />
                                    Code Banque
                                    <span className="text-gray-900 fw-bolder ms-1">17515</span> –
                                    Code guichet{' '}
                                    <span className="text-gray-900 fw-bolder">90000</span> – N°
                                    compte
                                    <span className="text-gray-900 fw-bolder ms-1">
                                        08004002688
                                    </span>{' '}
                                    – Clé RIB <span className="text-gray-900 fw-bolder">12</span>
                                    <br />
                                    IBAN : FR76 1751 5900 0008 0040 0268 812
                                    <br /> BIC : CEPAFRPP751 <br />
                                    UNETP - 292 rue Saint Jacques 75005 Paris
                                </div>
                            </div>
                            <div className="text-gray-700 mb-5">
                                Afin de finaliser votre règlement, nous vous demandons :
                            </div>
                            <ul>
                                <li className="text-gray-700 mb-2">
                                    De mentionner lors de votre virement votre numéro
                                    d&apos;établissement Unetp ainsi que les noms des
                                    établissements, code postal et ville.
                                </li>

                                <li className="text-gray-700">
                                    De cocher la case ci-dessous et de cliquer sur le bouton
                                    “valider” afin de recevoir un mail récapitulatif de votre
                                    déclaration de cotisations (l&apos;Unetp est également informée
                                    de votre paiement).
                                </li>
                            </ul>
                            <div className="text-gray-700 mb-1">
                                Un justificatif vous sera délivré après validation de votre
                                règlement par les services de l&apos;Unetp.
                            </div>
                            <div className="text-gray-700 mb-3">
                                En outre, il sera disponible en vous connectant sur le système de
                                gestion de l&apos;Unetp.
                            </div>
                            <div className="text-gray-700 mb-1 ">Bien cordialement.</div>
                            <div className="text-gray-700 mb-5">L&apos;équipe de l&apos;Unetp</div>
                            <div className="separator " />
                            <div className="border border-dashed border-primary bg-light-primary text-center justify-content-center p-4">
                                {!fromSubmited ? (
                                    <>
                                        {' '}
                                        <div className="form-group mb-3  text-center">
                                            <div
                                                className="form-check form-check-custom form-check-success form-check-solid mb-3 justify-content-center
">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="confirm"
                                                    value={true}
                                                    {...register('confirm')}
                                                />
                                                <label
                                                    className="form-check-label "
                                                    htmlFor="confirm">
                                                    Je confirme mon règlement par virement.
                                                </label>
                                            </div>
                                            <div className=" d-flex justify-content-center invalid-feedback ">
                                                {errors?.confirm?.message}
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-success"
                                            type="button"
                                            onClick={handleSubmit(submitForm)}>
                                            Valider
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-start">
                                        Un mail a été adressé à la compatibilité de l&apos;UNETP
                                        pour l&apos;informer de votre mode de paiement
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default TransferPayment;
