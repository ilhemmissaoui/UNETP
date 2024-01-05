import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import useData from '../../../../../hooks/use-data';
import userSchema from '../../../../../schemas/users';
import LinkWithRef from '../../../Link';
import Histories from '../components/Histories';
import Users from '../components/Users';
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
const DelegationView = () => {
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
            <div className="d-flex justify-content-end"></div>
            <FormProvider {...updateForm}>
                <form>
                    <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                        <div className="flex-shrink-0">
                            <div className="d-flex justify-content-between">
                                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                                    Délégation régionale :{' '}
                                </span>

                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-edit">Imprimer</Tooltip>}>
                                    <LinkWithRef
                                        href={`/delegations-regionales/imprimer/${data?.id}`}
                                        passHref
                                        className="btn btn-primary btn-icon btn-sm"
                                        target="_blank">
                                        <i className="fa fa-print"></i>
                                    </LinkWithRef>
                                </OverlayTrigger>
                            </div>
                            <div className="d-flex">
                                <span className="text-dark fs-1 py-2 fw-bolder">
                                    {' '}
                                    {data?.organization?.name}
                                </span>
                                <span className="badge badge-primary ms-3 my-auto">
                                    {data?.reference}
                                </span>
                            </div>
                        </div>{' '}
                    </div>

                    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x fs-5 fw-bolder mt-5 mb-10">
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
                    <Component data={data} />
                </form>
            </FormProvider>
        </>
    );
};

export default DelegationView;
