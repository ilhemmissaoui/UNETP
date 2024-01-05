import moment from 'moment';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import useCRUD, { CRUDProvider, useCRUDContext } from '../../../../../../hooks/use-crud';
import { Ability } from '../../../../GUARDS';
import LinkWithRef from '../../../../Link';
import Delete from '../../../../Modals/Delete';
import View from '../../../../Modals/View';
import DelegationsView from '../../../../Tables/Delegations/View';
import EstablishmentView from '../../../../Tables/Establishments/View';
import NetworksView from '../../../../Tables/Networks/View';
import UnetpView from '../../../../UNETP/View';

const Header = ({ data }) => {
    const city = data?.coordinates.find((e) => e?.isDefault)?.city || data?.coordinates[0]?.city;

    return (
        <div className="d-flex flex-column w-100">
            <div>
                <div className="d-flex align-items-center">
                    <span>{data?.name}</span>
                    {data?.establishment?.department?.departmentCode && (
                        <span className="ms-2 badge badge-info badge-outline">
                            {data?.establishment?.department?.departmentCode}
                        </span>
                    )}
                    {city && (
                        <span className="ms-2 badge badge-secondary badge-outline">{city}</span>
                    )}
                </div>
                <span className="badge badge-primary badge-lg">
                    {data?.establishment?.establishmentKey}
                </span>
            </div>
        </div>
    );
};

const ViewByType = {
    UNETP: {
        idMapper: (data) => data?.id,
        component: UnetpView,
        pluralName: 'unetp',
        editLink: () => `/unetp/unetp`,
        ability: {
            entity: 'unetp.unetp'
        }
    },
    "Conseil d'administration": {
        idMapper: (data) => data?.id,
        component: UnetpView,
        pluralName: 'directors-board',
        editLink: () => `/unetp/ca`,
        ability: {
            entity: 'unetp.ca'
        }
    },
    'Bureau du CA': {
        idMapper: (data) => data?.id,
        component: UnetpView,
        pluralName: 'office-board-directors',
        editLink: () => `/unetp/bureau`,
        ability: {
            entity: 'unetp.office'
        }
    },
    Etablissement: {
        idMapper: (data) => data?.establishment?.id,
        component: EstablishmentView,
        pluralName: 'establishments',
        singleName: 'establishment',
        collectionLabel: 'Etablissment',
        ability: {
            entity: 'establishment'
        },
        editLink: (id) => `/structures-etablissement/modifier/${id}`
    },
    Délégation: {
        idMapper: (data) => data?.delegation?.id,
        component: DelegationsView,
        pluralName: 'delegations',
        singleName: 'delegation',
        collectionLabel: 'Délégation',
        editLink: (id) => `/delegations-regionales/modifier/${id}`,
        ability: {
            entity: 'delegation'
        }
    },
    Réseau: {
        idMapper: (data) => data?.network?.id,
        component: NetworksView,
        pluralName: 'networks',
        singleName: 'network',
        collectionLabel: 'Réseau',
        editLink: (id) => `/reseaux/modifier/${id}`,
        ability: {
            entity: 'network'
        }
    },
    'Non communiqué': {
        component: <></>
    }
};

const DTRow = ({ data, withoutType }) => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    const [isDelete, setIsDelete] = useState();
    const toggleIsDelete = () => setIsDelete((v) => !v);
    console.log(data);

    const {
        component: ViewCompoment,
        idMapper,
        pluralName,
        collectionLabel,
        singleName,
        editLink,
        ability
    } = ViewByType[data?.organizationType?.label];
    const id = idMapper(data);
    const { watch, setFilters, fetch } = useCRUDContext();
    const crud = useCRUD({
        singleName,
        pluralName,
        lazy: true
    });
    const _delete = async (id) => {
        crud._delete(id);
        const { labels, name } = watch();
        setFilters({
            labels: encodeURIComponent(JSON.stringify(labels)),
            name: encodeURIComponent(name)
        });
        await fetch();
    };
    return (
        <>
            <tr className="text-center">
                <td className=" align-items-center">
                    <button
                        className="btn btn-link d-flex align-items-center p-0"
                        onClick={toggleIsView}>
                        <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                            {data?.lastName !== '' ? (
                                <div className="symbol-label fs-3 bg-light-danger text-danger">
                                    {data?.name && data?.name[0]?.toUpperCase()}
                                </div>
                            ) : (
                                <div className="symbol-label fs-3 bg-light-danger text-danger">
                                    {data?.name && data?.name[0]?.toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="text-gray-800 text-hover-primary mb-1">
                            <span className="fw-bolder"> {data?.name}</span>{' '}
                        </div>
                    </button>
                </td>
                {!withoutType ? (
                    <td>
                        <span className="text-gray-800 text-hover-primary mb-1">
                            {data?.organizationType?.label}
                        </span>
                    </td>
                ) : (
                    ''
                )}

                <td className="text-center">
                    {data?.updatedAt && moment(data?.updatedAt).format('DD/MM/YYYY HH:mm')}
                </td>
                <td className="text-center">
                    <div className="btn-group">
                        <Ability I="write" an={ability?.entity}>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                                <LinkWithRef
                                    href={editLink(id)}
                                    passHref
                                    className="btn btn-primary btn-icon btn-sm">
                                    <i className="fa fa-edit"></i>
                                </LinkWithRef>
                            </OverlayTrigger>
                        </Ability>
                        <Ability I="view" an={ability?.entity}>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Visualiser</Tooltip>}>
                                <button
                                    className="btn btn-secondary btn-sm btn-icon"
                                    onClick={toggleIsView}>
                                    <i className="fa fa-eye"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>
                        {singleName && (
                            <Ability I="delete" an={ability?.entity}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-edit">Archiver</Tooltip>}>
                                    <button
                                        className="btn btn-danger btn-icon btn-sm"
                                        onClick={toggleIsDelete}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </OverlayTrigger>
                            </Ability>
                        )}
                    </div>
                </td>
            </tr>
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                bsPrefix="modal-header py-3"
                pluralName={pluralName}
                id={id}
                customTitle={<Header data={data} />}>
                <ViewCompoment />
            </View>
            {singleName && (
                <CRUDProvider _delete={_delete}>
                    <Delete
                        id={id}
                        isShow={isDelete}
                        toggleShow={toggleIsDelete}
                        collectionLabel={collectionLabel}
                        singleName={singleName}
                    />
                </CRUDProvider>
            )}
        </>
    );
};

export default DTRow;
