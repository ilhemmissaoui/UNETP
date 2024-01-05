import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useData from '../../../../hooks/use-data';
import userSchema from '../../../../schemas/users';
import Histories from '../components/components/Histories';
import Users from '../components/components/Users';
const addTabs = [
    {
        label: 'Personnes',
        component: Users
    },
    {
        label: 'Historique',
        component: Histories
    }
];
const UnetpView = () => {
    const { data } = useData();
    const updateForm = useForm({
        resolver: yupResolver(userSchema)
    });
    const [currentTab, setCurrentTab] = useState(addTabs[0].label);

    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    const { component: Component } = addTabs.find((e) => e.label === currentTab) || {};

    return (
        <>
            <FormProvider {...updateForm}>
                <form>
                    <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                        <div className="flex-shrink-0">
                            <div className="d-flex">
                                <span className="text-dark fs-1 py-2 fw-bolder">
                                    {' '}
                                    {data?.organization?.name}
                                </span>
                            </div>
                        </div>{' '}
                    </div>

                    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x fs-5 fw-bolder mt-5 mb-10">
                        {addTabs.map((e, i) => (
                            <li className="nav-item" key={i}>
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
                    <Component data={data} />
                </form>
            </FormProvider>
        </>
    );
};

export default UnetpView;
