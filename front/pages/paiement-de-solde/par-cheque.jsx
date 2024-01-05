import Head from 'next/head';

import Layout from '../../ui/layouts';

const CheckPayment = () => {
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
                                Vous avez choisi de payer vos cotisations Unetp par chèque ; nous
                                vous en remercions
                            </div>

                            <div className="text-gray-700 mb-5">
                                Afin de finaliser votre règlement, nous vous demandons :
                            </div>
                            <ul>
                                <li className="text-gray-700 mb-2">
                                    De libeller votre chèque à l&lsquo;ordre de l&lsquo;Unetp.
                                </li>

                                <li className="text-gray-700 mb-2">
                                    D&lsquo;imprimer le mail récapitulatif de votre declaration de
                                    cotisations que vous allez <br /> recevoir par mail.
                                </li>

                                <li className="text-gray-700 mb-2">
                                    D&lsquo;envoyer ces deux documents à :
                                    <span className="fw-bolder ms-1">
                                        {' '}
                                        Unetp – Service Computability – 292 rue Saint Jacques –
                                        75005 Paris.
                                    </span>
                                </li>

                                <li className="text-gray-700 mb-2">
                                    De cocher la case ci-dessous et de cliquer sur le bouton
                                    “valider” afin de recevoir un mail récapitulatif de votre
                                    déclaration de cotisations (l&lsquo;Unetp est également
                                    <br />
                                    informée de votre paiement).
                                </li>
                            </ul>

                            <div className="text-gray-700 mb-1">
                                Un justificatif vous sera délivré après validation de votre
                                règlement par les services de l&lsquo;Unetp.
                            </div>
                            <div className="text-gray-700 mb-3">
                                En outre, il sera disponible en vous connectant sur le système de
                                gestion de l&lsquo;Unetp.
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
                                            Je confirme mon règlement par chèque.
                                        </label>
                                    </div>
                                    <div className="invalid-feedback d-flex">{''}</div>
                                </div>
                                <button className="btn btn-success" type="button">
                                    Valider
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default CheckPayment;
