import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import useData from '../../../../../hooks/use-data';
import userSchema from '../../../../../schemas/users';
import LinkWithRef from '../../../Link';
import GlobalInfo from '../components/GlobalInfo';
import Histories from '../components/Histories';
import Users from '../components/Users';
const addTabs = [
    {
        label: 'Informations Générales',
        component: GlobalInfo
    },
    {
        label: 'Personnes',
        component: Users
    },
    {
        label: 'Historique',
        component: Histories
    }
];
const NetworkView = () => {
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
                    <div className="d-flex justify-content-between mt-5 mb-10">
                        <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x fs-5 fw-bolder">
                            <>
                                {addTabs.map((e) => (
                                    <li className="nav-item" key={e}>
                                        <a
                                            href="#"
                                            className={clsx(
                                                'nav-link nav-link text-active-primary',
                                                {
                                                    active: currentTab === e.label
                                                }
                                            )}
                                            onClick={handleSelectedTab(e.label)}>
                                            {e.label}
                                        </a>
                                    </li>
                                ))}
                            </>
                        </ul>

                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-edit">Imprimer</Tooltip>}>
                            <LinkWithRef
                                href={`/reseaux/imprimer/${data?.id}`}
                                passHref
                                className="btn btn-light btn-icon btn-sm"
                                target="_blank">
                                <i className="fa fa-print"></i>
                            </LinkWithRef>
                        </OverlayTrigger>
                    </div>
                    <Component data={data} />
                </form>
            </FormProvider>
        </>
    );
};

export default NetworkView;
