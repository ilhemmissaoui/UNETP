import moment from 'moment';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Ability } from '../GUARDS';
import LinkWithRef from '../Link';
import Archive from '../Modals/Archive';
import Restore from '../Modals/Restore';
import View from '../Modals/View';
import UserView from './components/View';

const DTRow = ({ data }) => {
    const [isRestore, setIsRestore] = useState();
    const toggleIsRestore = () => setIsRestore((v) => !v);
    const [isView, setIsView] = useState();
    const [isDelete, setIsDelete] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    const toggleIsDelete = () => setIsDelete((v) => !v);
    const currentFunction = data?.functions[data?.functions?.length - 1];
    const currentOrganization = currentFunction?.organization;
    const currentEstablishment = currentOrganization?.establishment;
    const currentDepartment = currentEstablishment?.department;
    const defaultCoordinates = data?.coordinates?.find((e) => e.isDefault);

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
                                    {data?.firstName[0]?.toUpperCase()}
                                    {data?.lastName[0]?.toUpperCase()}
                                </div>
                            ) : (
                                <div className="symbol-label fs-3 bg-light-danger text-danger">
                                    {data?.firstName[0]?.toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="text-gray-800 text-hover-primary mb-1">
                            <span className="fw-bolder">
                                {' '}
                                {data?.civility?.abbreviation} {data?.firstName}{' '}
                            </span>{' '}
                            {data?.lastName}
                        </div>
                    </button>
                </td>
                <td>{currentDepartment?.departmentCode}</td>
                <td>
                    {defaultCoordinates?.zipCode} {defaultCoordinates?.city}
                </td>
                <td>
                    {data?.updatedAt && (
                        <div className="badge badge-light fw-bolder">
                            {data?.updatedAt
                                ? moment(data?.updatedAt).format('DD/MM/YYYY HH:mm')
                                : null}
                        </div>
                    )}
                </td>

                <td className="text-center">
                    <div className="btn-group">
                        <Ability I="write" an="user">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                                <LinkWithRef
                                    href={`/personnes/modifier/${data.id}`}
                                    passHref
                                    className="btn btn-primary btn-icon btn-sm">
                                    <i className="fa fa-edit"></i>
                                </LinkWithRef>
                            </OverlayTrigger>
                        </Ability>

                        <Ability I="view" an="user">
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

                        {data?.isArchived ? (
                            <Ability I="delete" an="establishment">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-edit">Restaurer</Tooltip>}>
                                    <button
                                        className="btn btn-success btn-icon btn-sm"
                                        onClick={toggleIsRestore}>
                                        <i className="fa fa-recycle"></i>
                                    </button>
                                </OverlayTrigger>
                            </Ability>
                        ) : (
                            <Ability I="delete" an="establishment">
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
            <Archive
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Personne"
                singleName="Personne"
            />
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                customTitle="Fiche personne"
                pluralName="users"
                id={data?.id}
                label={`${data?.civility?.abbreviation} ${data?.firstName} ${data?.lastName}`}>
                <UserView isMultipleTables={true} />
            </View>

            <Restore
                _id={data?.id}
                isShow={isRestore}
                toggleShow={toggleIsRestore}
                collectionLabel="personne"
                singleName="users"
                prefix="users"
            />
        </>
    );
};

export default DTRow;
