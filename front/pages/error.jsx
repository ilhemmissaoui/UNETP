import Link from 'next/link';
import React from 'react';

const Error = () => {
    return (
        <>
            <div className="container  py-20 ">
                <div className="card card-docs flex-row-fluid  border-danger border border-dashed bg-light-danger ">
                    <div className="row justify-content-center py-10 ">
                        <div className="col-md-12 text-center">
                            <div className="symbol symbol-circle symbol-100px mb-10 ">
                                <div className="symbol-label fs-2 fw-semibold bg-danger ">
                                    <i className="fa fa-times display-1 text-white" />
                                </div>
                            </div>
                            <h1 className="info-card_label text-danger  ">Échec du paiment </h1>
                        </div>
                    </div>
                    <div className="row justify-content-center py-5">
                        <div className="col-md-12  text-center">
                            <Link href="/" passHref>
                                <a className="btn btn-danger fs-3"> retour à l&apos;accueil </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Error;
