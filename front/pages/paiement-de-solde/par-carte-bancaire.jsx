import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

import useToast from '../../hooks/use-toast';
import settings from '../../settings';
import Layout from '../../ui/layouts';
const { endpointUrl } = settings;
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CardPayment = () => {
    const [establishment, setEstablishment] = useState();
    const [paymentInfo, setpaymentInfo] = useState();
    const { query } = useRouter();
    const { setToast } = useToast();

    const fetchSubscriptionFees = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/subscription-fees`);
            console.log(data);
            console.log(query?.subscriptionFeesIds?.split(','));
            const subscriptionFeesIds = query?.subscriptionFeesIds?.split(',');
            const org = data.filter((e) =>
                subscriptionFeesIds.includes(`${e?.organization?.subscriptionFees[0]?.id}`)
            );
            const paymentInfo = await axios.post(
                `${endpointUrl}/subscription-fees/request-payment`,
                subscriptionFeesIds
            );
            setpaymentInfo(paymentInfo?.data);
            console.log('org', org);
            setEstablishment(org);
        } catch (e) {
            console.log(e);
            setToast('Erreur lors de la récupération de cotisations');
        }
    };

    useEffect(async () => {
        await fetchSubscriptionFees();
    }, [query?.subscriptionFeesIds]);

    const totalAmount = establishment?.reduce((pv, cv) => {
        return (
            pv +
            cv?.organization?.subscriptionFees.reduce(
                (ppv, ccv) =>
                    ppv +
                    parseFloat(
                        (ccv?.customAmount ? ccv?.customAmount : ccv?.calculatedAmount) || 0
                    ),

                0
            )
        );
    }, 0);
    const totalUnPaid =
        totalAmount -
        establishment?.reduce((pv, cv) => {
            return (
                pv +
                cv?.organization?.subscriptionFees.reduce(
                    (ppv, ccv) =>
                        ppv +
                        (ccv?.subscriptionPayments?.reduce((pppv, cccv) => pppv + cccv.amount, 0) ||
                            0),
                    0,
                    0
                )
            );
        }, 0);

    return (
        <>
            <Layout>
                <Head>
                    <title>Paiement de vos cotisations | {process.env.platformName} </title>
                </Head>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body fs-5">
                            <span className="h1 ">PAIEMENT DE VOS COTISATIONS</span>
                            <div className="separator my-5" />

                            <div className="text-gray-700 mb-5">
                                Vous avez choisi de payer vos cotisations Unetp par carte bancaire ;
                                nous vous en remercions
                            </div>

                            <div className="text-gray-700 mb-5">
                                Afin de finaliser votre règlement, nous vous demandons :
                            </div>

                            <ul>
                                <li className="text-gray-700 mb-2">
                                    De cocher la case ci-dessous et de cliquer sur le bouton “payer
                                    en ligne” afin de recevoir un mail récapitulatif de votre
                                    déclaration de cotisations (l’Unetp est également informée de
                                    votre paiement) et régler la somme de{' '}
                                    <strong>{totalUnPaid} Є</strong>. Vous serez redirigé sur un
                                    serveur de paiement sécurisé.
                                </li>
                            </ul>

                            <div className="text-gray-700 mb-1">
                                Un justificatif vous sera délivré après validation de votre
                                règlement par les services de l’Unetp.
                            </div>
                            <div className="text-gray-700 mb-3">
                                En outre, il sera disponible en vous connectant sur le système de
                                gestion de l’Unetp.
                            </div>
                            <div className="text-gray-700 mb-1 ">Bien cordialement.</div>
                            <div className="text-gray-700 mb-5">L’équipe de l’Unetp</div>

                            <div className="separator" />

                            <div className="border border-dashed border-primary bg-light-primary text-center justify-content-center p-4">
                                <div className="form-group mb-3  text-center">
                                    <div
                                        className="form-check form-check-custom form-check-success form-check-solid mb-3 justify-content-center
">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="confirm"
                                            value={true}
                                        />
                                        <label className="form-check-label " htmlFor="confirm">
                                            Je confirme mon règlement par carte bancaire.
                                        </label>
                                    </div>
                                    <div className="invalid-feedback d-flex">{''}</div>
                                </div>
                                <button className="btn btn-success" type="button">
                                    Payer en ligne
                                </button>
                            </div>
                        </div>
                        <div className="card-footer d-flex justify-content-between py-3">
                            <Link href="/" passHref>
                                <a className="btn btn-secondary btn-sm">
                                    <i className="fa fa-arrow-left"></i> Accueil
                                </a>
                            </Link>

                            <form
                                id="pay"
                                method="POST"
                                action="https://paiement.systempay.fr/vads-payment/">
                                <input
                                    type="hidden"
                                    name="vads_action_mode"
                                    value={paymentInfo?.vads_action_mode}
                                />
                                <input
                                    type="hidden"
                                    name="vads_amount"
                                    value={paymentInfo?.vads_amount}
                                />
                                <input
                                    type="hidden"
                                    name="vads_ctx_mode"
                                    value={paymentInfo?.vads_ctx_mode}
                                />
                                <input
                                    type="hidden"
                                    name="vads_currency"
                                    value={paymentInfo?.vads_currency}
                                />
                                <input
                                    type="hidden"
                                    name="vads_order_info"
                                    value={paymentInfo?.vads_order_info}
                                />
                                <input
                                    type="hidden"
                                    name="vads_page_action"
                                    value={paymentInfo?.vads_page_action}
                                />
                                <input
                                    type="hidden"
                                    name="vads_payment_config"
                                    value={paymentInfo?.vads_payment_config}
                                />
                                <input
                                    type="hidden"
                                    name="vads_site_id"
                                    value={paymentInfo?.vads_site_id}
                                />
                                <input
                                    type="hidden"
                                    name="vads_trans_date"
                                    value={paymentInfo?.vads_trans_date}
                                />
                                <input
                                    type="hidden"
                                    name="vads_trans_id"
                                    value={paymentInfo?.vads_trans_id}
                                />
                                <input
                                    type="hidden"
                                    name="vads_version"
                                    value={paymentInfo?.vads_version}
                                />
                                <input
                                    type="hidden"
                                    name="signature"
                                    value={paymentInfo?.signature}
                                />
                                <button className="btn btn-primary btn-sm" form="pay">
                                    Payer en ligne
                                </button>{' '}
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default CardPayment;
