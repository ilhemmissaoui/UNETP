import React from 'react';

import { roles } from '../../../../../schemas/users';

const Access = ({ data }) => {
    const role = roles?.find((e) => e.id === data?.access?.role);
    return (
        <>
            <div className="form-group mb-3">
                <span className="h6">
                    Identifiant :{' '}
                    <span className="fw-bold fs-6 text-gray-600"> {data?.access?.username}</span>{' '}
                </span>
            </div>

            <div className="form-group mb-3">
                <span className="h6">
                    Profil :{' '}
                    <span className="fw-bold fs-6 text-gray-600">
                        {' '}
                        {role?.label}{' '}
                        {role?.badge && (
                            <span className="badge badge-secondary badge-sm">{role?.badge}</span>
                        )}
                    </span>{' '}
                </span>
            </div>

            <div className="alert alert-dismissible bg-success d-flex flex-column flex-sm-row w-100 p-5 mb-5">
                <div className="d-flex flex-column text-light pe-0 pe-sm-10 fw-bolder">
                    <span>
                        Si la personne a oublié ou perdu ses identifiants de connexion (login et mot
                        de passe), il est possible de lui envoyer un e-mail lui permettant à nouveau
                        de se connecter. Pour cela, il vous suffit de cliquer sur le lien
                        ci-dessous.
                    </span>
                </div>
            </div>

            <div className="form-group mb-3">
                <span className="fw-bold fs-6 text-success-800">
                    <i className="bi bi-envelope"></i>
                    <button className="btn btn-link p-0">
                        {' '}
                        Envoyez un lien de réinitialisation du mot de passe par e-mail
                    </button>{' '}
                </span>
            </div>
        </>
    );
};

export default Access;
