import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

import GlobalInfo from '../../ui/components/UNETP/components/GlobalInfo';
import Histories from '../../ui/components/UNETP/components/histories';
import Users from '../../ui/components/UNETP/components/users';
import Layout from '../../ui/layouts';

const tabs = {
    globalInfo: {
        component: GlobalInfo,
        label: 'Informations Générales'
    },
    function: {
        component: Users,
        label: 'Personnes'
    },
    histories: {
        component: Histories,
        label: 'Historique'
    }
};

const Unetp = () => {
    const [currentTab, setCurrentTab] = useState(Object.keys(tabs)[0]);
    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    const { component: Component } = tabs[currentTab];
    return (
        <Layout>
            <Head>
                <title>Gestion UNETP | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <form>
                            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x fs-5 fw-bolder mt-5 mb-10">
                                {Object.entries(tabs).map(([key, { label }]) => (
                                    <li className="nav-item" key={key}>
                                        <a
                                            href="#"
                                            className={clsx(
                                                'nav-link nav-link text-active-primary',
                                                {
                                                    active: currentTab === key
                                                }
                                            )}
                                            onClick={handleSelectedTab(key)}>
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <Component />
                        </form>
                    </div>

                    <div className="card-footer d-flex justify-content-between">
                        <Link href="/reseaux" passHref>
                            <a className="btn btn-secondary">
                                <i className="fa fa-arrow-left"></i> Annuler
                            </a>
                        </Link>
                        <button className="btn btn-primary">
                            {' '}
                            <i className="fa fa-save"></i> Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Unetp;
