import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Head from 'next/head';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { MultiCRUDProvider } from '../../hooks/use-crud';
import { FormParamsProvider } from '../../hooks/use-form-params';
import { unetpSchemas } from '../../schemas/unetpSchema';
import Empty from '../../ui/components/Archive/empty';
import Search from '../../ui/components/Archive/search';
import Layout from '../../ui/layouts';
import FormProviderSafety from '../../ui/utils/FormProviderSafety';

const tabs = {
    globalInfo: {
        component: Empty,
        label: 'Vider'
    },
    function: {
        component: Search,
        label: 'Recherche'
    }
};
const Archives = () => {
    const addForm = useForm({
        resolver: yupResolver(unetpSchemas)
    });
    const [currentTab, setCurrentTab] = useState(Object.keys(tabs)[0]);
    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    const { component: Component } = tabs[currentTab];

    return (
        <Layout>
            <Head>
                <title>Corbeille | {process.env.platformName} </title>
            </Head>
            <MultiCRUDProvider>
                <FormProvider {...addForm}>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-body">
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
                                <FormProviderSafety>
                                    <FormParamsProvider>
                                        <Component />
                                    </FormParamsProvider>
                                </FormProviderSafety>
                            </div>
                        </div>
                    </div>
                </FormProvider>
            </MultiCRUDProvider>
        </Layout>
    );
};

export default Archives;
