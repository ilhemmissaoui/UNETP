import clsx from 'clsx';
import { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import useData from '../../../../../hooks/use-data';
import { Ability } from '../../../GUARDS';
import LinkWithRef from '../../../Link';
import Link from '../../../Link';
import Diplomas from '../components/Diploma';
import GlobalInfo from '../components/GlobalInfo';
import Histories from '../components/Histories';
import RelaunchHistory from '../components/RelaunchHistory';
import Users from '../components/Users';
import SubscriptionFees from '../SubscriptionFees';
const addTabs = [
    {
        label: 'Informations Générales',
        component: GlobalInfo
    },
    {
        label: 'Diplômes',
        component: Diplomas
    },

    {
        label: 'Personnes',
        component: Users
    },
    {
        label: 'Historique',
        component: Histories
    },
    {
        label: 'Historique Relance',
        component: RelaunchHistory
    },
    {
        label: 'Cotisations',
        component: SubscriptionFees
    }
];
const EstablishmentView = () => {
    const { data } = useData();
    const [currentTab, setCurrentTab] = useState(addTabs[0].label);

    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    const { component: Component } = addTabs.find((e) => e.label === currentTab) || {};

    return (
        <>
            <div className="d-flex justify-content-end my-4">
                <Ability I="write" an="establishment">
                    <Link href={`/structures-etablissement/modifier/${data?.id}`}>
                        <a
                            href="#"
                            className="btn btn-sm btn-primary me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#kt_modal_offer_a_deal">
                            <i className="fa fa-edit"></i>
                            Modifier
                        </a>
                    </Link>
                </Ability>

                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-edit">Imprimer</Tooltip>}>
                    <LinkWithRef
                        href={`/structures-etablissement/imprimer/${data?.id}`}
                        passHref
                        className="btn btn-light btn-icon btn-sm"
                        target="_blank">
                        <i className="fa fa-print"></i>
                    </LinkWithRef>
                </OverlayTrigger>
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
        </>
    );
};

export default EstablishmentView;
