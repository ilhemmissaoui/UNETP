import clsx from 'clsx';
import React, { useState } from 'react';

import GeneralCalls from './components/GeneralCalls';
import settings from './components/Settings';

const addTabs = [
    {
        label: 'Paramètres',
        component: settings
    },
    {
        label: 'Appel général à cotisation',
        component: GeneralCalls
    }
];
const Form = () => {
    const [currentTab, setCurrentTab] = useState(addTabs[0]?.label);
    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    const { component: Component } = addTabs.find((e) => e.label === currentTab) || {};

    return (
        <>
            <div className="card">
                <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x fs-5 fw-bolder mb-5">
                    {addTabs.map((e) => (
                        <li className="nav-item" key={e}>
                            <a
                                href="#"
                                className={clsx('nav-link nav-link text-active-primary', {
                                    active: currentTab === e.label
                                })}
                                onClick={handleSelectedTab(e.label)}>
                                {e.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <Component />
            </div>
        </>
    );
};

export default Form;
