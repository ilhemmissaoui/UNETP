import Link from 'next/link';
import React from 'react';

const Success = () => {
    return (
        <>
            <div className="container d-flex  py-20 ">
                <div className="card card-docs flex-row-fluid  border-success border border-dashed bg-light-success">
                    <div className="card-body row justify-content-center py-10 fs-6   ">
                        <div className="row justify-content-center  ">
                            <div className="col-md-12 text-center">
                                <div className="symbol symbol-circle symbol-100px mb-10 ">
                                    <div className="symbol-label fs-2 fw-semibold bg-success ">
                                        <i className="fa fa-check display-1 text-white" />
                                    </div>
                                </div>

                                <div className="col-md-12 ">
                                    <h2 className="info-card_label">Paiement validé avec succés</h2>
                                    <div className="info-card_message">
                                        Consultez l&apos;historique de votre compte.
                                    </div>{' '}
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center py-5">
                            <div className="col-md-12  text-center">
                                <Link href="/" passHref>
                                    <a className="btn btn-success fs-3">
                                        {' '}
                                        retour à l&apos;accueil{' '}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Success;
