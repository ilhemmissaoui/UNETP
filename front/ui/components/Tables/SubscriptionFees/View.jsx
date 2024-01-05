import clsx from 'clsx';
import React, { useState } from 'react';

import useData from '../../../../hooks/use-data';
import GeneralCalls from './components/view/GeneralCalls';
import settings from './components/view/Settings';

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
const ViewCalls = () => {
    const { data } = useData();
    console.log(data);
    const [currentTab, setCurrentTab] = useState(addTabs[0].label);
    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    const { component: Component } = addTabs.find((e) => e.label === currentTab) || {};

    return (
        <>
            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x fs-5 fw-bolder">
                {addTabs.map((e, i) => (
                    <li className="nav-item" key={i}>
                        <a
                            href="#"
                            className={clsx('nav-link  text-active-primary', {
                                active: currentTab === e.label
                            })}
                            onClick={handleSelectedTab(e.label)}>
                            {e.label}
                        </a>
                    </li>
                ))}
            </ul>
            <Component data={data} />
        </>
    );
};

export default ViewCalls;
