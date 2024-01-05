import React, { useState } from 'react';

import View from '../../../../../../Modals/View';
import DelegationView from '../../../../../../Tables/Delegations/View';
import EstablishmentView from '../../../../../../Tables/Establishments/View';
import NetworkView from '../../../../../../Tables/Networks/View';
import UnetpView from '../../../../../../UNETP/View';
import Period from '../../../../../../Utils/Period';
import EstablishmentHeader from './EstablishmentHeader';
import OrganizationHeader from './OrganizationHeader';

const ViewRow = ({ data }) => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);

    const searchType = {
        Etablissement: {
            label: 'Etablissement',
            component: EstablishmentView,
            header: EstablishmentHeader,
            pluralName: 'establishments',
            accessor: (data) => data?.organization?.establishment?.id
        },
        Délégation: {
            label: 'Délégation',
            component: DelegationView,
            header: OrganizationHeader,
            pluralName: 'delegations',
            accessor: () => data?.organization?.delegation?.id
        },
        Réseau: {
            label: 'Réseau',
            component: NetworkView,
            header: OrganizationHeader,
            pluralName: 'networks',
            accessor: () => data?.organization?.network?.id
        },
        UNETP: {
            label: 'UNETP',
            component: UnetpView,
            header: OrganizationHeader,
            pluralName: 'unetp',
            accessor: () => data?.organization?.id
        },
        "Conseil d'administration": {
            label: "Conseil d'administration",
            component: UnetpView,
            header: OrganizationHeader,
            pluralName: 'directors-board',
            accessor: () => data?.organization?.id
        },
        'Bureau du CA': {
            label: 'Bureau du CA',
            component: UnetpView,
            header: OrganizationHeader,
            pluralName: 'office-board-directors',
            accessor: () => data?.organization?.id
        }
    };
    console.log(data?.organization?.organizationType?.label);
    const {
        component: Component,
        header: Header,
        pluralName,
        accessor
    } = searchType[data?.organization?.organizationType?.label] || {};
    const viewId = typeof accessor === 'function' ? accessor(data) : '';
    return (
        <>
            <tr className="align-middle text-center">
                <td>
                    <span className="fw-bold fs-8 text-gray-800">
                        {data?.functionLabel?.singularMaleName}
                    </span>
                </td>
                <td>
                    {Component && (
                        <>
                            {' '}
                            <span className="fw-bold fs-8 text-gray-800">
                                <a onClick={toggleIsView} className="pe-auto" href="#">
                                    {data?.organization?.name}
                                </a>
                            </span>{' '}
                            <span className="badge badge-red">
                                {data?.organization?.establishment?.establishmentKey}
                            </span>
                        </>
                    )}
                </td>
                <td>
                    <Period {...data} />
                </td>
            </tr>
            {Component && (
                <View
                    isShow={isView}
                    toggleIsShow={toggleIsView}
                    size="xl"
                    bsPrefix="modal-header py-3"
                    pluralName={pluralName}
                    id={viewId}
                    customTitle={<Header data={data} />}>
                    <Component />
                </View>
            )}
        </>
    );
};
ViewRow.columnsCount = 3;

export default ViewRow;
