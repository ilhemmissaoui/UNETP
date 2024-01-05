import clsx from 'clsx';
import React, { useState } from 'react';

import Domains from '../../Diplomas/Domains';
import Functions from '../../Diplomas/Functions';
import Grades from '../../Diplomas/Grades';
import Groups from '../../Diplomas/Groups';
import Specialties from '../../Diplomas/Specialties';
import SubGroups from '../../Diplomas/SubGroups';
import Types from '../../Diplomas/Types';

const addTabs = [
    {
        label: 'Types',
        component: Types
    },
    {
        label: 'Fonctions',
        component: Functions
    },
    {
        label: 'Domaines',
        component: Domains
    },
    {
        label: 'Groupes',
        component: Groups
    },
    {
        label: 'Sous-Groupes',
        component: SubGroups
    },
    {
        label: 'Niveaux',
        component: Grades
    },
    {
        label: 'Spécialités',
        component: Specialties
    }
];
const Diploma = () => {
    const [currentTab, setCurrentTab] = useState(addTabs[0].label);

    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    const { component: Component } = addTabs.find((e) => e.label === currentTab) || {};
    return (
        <>
            <div className="card-header">
                <div className="d-flex align-items-end">
                    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fw-bolder">
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
                </div>
            </div>
            <Component />
        </>
    );
};

export default Diploma;
