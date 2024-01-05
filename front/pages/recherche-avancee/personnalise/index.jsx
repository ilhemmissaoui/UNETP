import clsx from 'clsx';
import Head from 'next/head';
import React, { useState } from 'react';

import PedefinedSearch from '../../../ui/components/AdvancedSearch/Personalized';
import Requests from '../../../ui/components/AdvancedSearch/Personalized/Requests';
import Layout from '../../../ui/layouts';
const tabs = {
    globalInfo: {
        component: PedefinedSearch,
        label: 'Exécuter une requête'
    },
    function: {
        component: Requests,
        label: 'Gestion des requêtes '
    }
};
const PredefinedSearch = () => {
    const [currentTab, setCurrentTab] = useState(Object.keys(tabs)[0]);
    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    const { component: Component } = tabs[currentTab];

    return (
        <Layout>
            <Head>
                <title>Recherche personnalisée | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <div className="card  ">
                    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x fs-5 fw-bolder ps-5 mt-5 me-5 mb-10">
                        {Object.entries(tabs).map(([key, { label }]) => (
                            <li className="nav-item" key={key}>
                                <a
                                    href="#"
                                    className={clsx('nav-link nav-link text-active-primary', {
                                        active: currentTab === key
                                    })}
                                    onClick={handleSelectedTab(key)}>
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <Component />
                </div>
            </div>
        </Layout>
    );
};

export default PredefinedSearch;
