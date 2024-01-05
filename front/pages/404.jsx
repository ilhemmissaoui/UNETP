import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className="d-flex flex-column flex-root">
            <div className="d-flex flex-column flex-center flex-column-fluid p-10">
                <div className="planet">
                    <div className="crater" />
                    <div className="crater" />
                    <div className="crater" />
                    <div className="crater" />
                    <div className="crater" />
                    <div className="rover">
                        <div className="body" />
                        <div className="wheels" />
                        <div className="trace" />
                    </div>
                    <div className="flag">404</div>
                </div>
                <img alt="Logo" src="/images/logos/logo.png" className="w-150px my-5" />

                <span className="fw-bold fs-4 text-gray-700 text-center">
                    Nous sommes désolés, la page que vous avez demandée est introuvable.
                    <br /> N&apos;hésitez pas à contacter l&apos;administrateur du Système de
                    gestion pour l&apos;informer de ce problème.
                </span>
                <Link href="/" passHref>
                    <a className="btn btn-primary mt-10">Revenir à la page d&apos;accueil </a>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
