import moment from 'moment';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Ability } from '../../GUARDS';
import LinkWithRef from '../../Link';
import Delete from '../../Modals/Delete';
import View from '../../Modals/View';
import DelegationView from './View';

const DTRow = ({ data }) => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);

    const [isDelete, setIsDelete] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);

    return (
        <>
            <tr className="align-middle">
                <td className="text-dark fw-bolder text-hover-primary mb-1 fs-5">
                    <button className="btn btn-link p-0 fw-bolder" onClick={toggleIsView}>
                        {data?.organization?.name}
                    </button>
                </td>
                <td>
                    <div className="badge badge-primary fw-bolder">{data?.reference}</div>
                </td>
                <td>
                    <div className="badge badge-light fw-bolder">
                        {data?.organization?.updatedAt
                            ? moment(data?.organization?.updatedAt).format('DD/MM/YYYY HH:mm')
                            : null}
                    </div>
                </td>

                <td className="text-center">
                    <div className="btn-group">
                        <Ability I="write" an="delegation">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                                <LinkWithRef
                                    href={`/delegations-regionales/modifier/${data.id}`}
                                    passHref
                                    className="btn btn-primary btn-icon btn-sm">
                                    <i className="fa fa-edit"></i>
                                </LinkWithRef>
                            </OverlayTrigger>
                        </Ability>
                        <Ability I="view" an="delegation">
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

                        <Ability I="delete" an="delegation">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-archive">Archiver</Tooltip>}>
                                <button
                                    className="btn btn-danger btn-icon btn-sm"
                                    onClick={toggleIsDelete}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>
                    </div>
                </td>
            </tr>

            <Delete
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Délégation"
                singleName="Delegation"
            />

            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                pluralName="delegations"
                id={data?.id}
                label={data?.organization?.name}>
                <DelegationView />
            </View>
            {/* <View isShow={isShow} data={data} toggleIsShow={toggleIsShow} /> */}
        </>
    );
};

export default DTRow;
