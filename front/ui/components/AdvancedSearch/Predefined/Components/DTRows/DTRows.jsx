import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import View from '../../../../Modals/View';
import UserView from '../../../../Users/components/View';
import Period from '../../../../Utils/Period';

const DTRow = ({ data }) => {
    const [isView, setIsView] = useState();
    const [setIsDelete] = useState();
    const toggleIsDelete = () => setIsDelete((v) => !v);

    const toggleIsView = () => setIsView((v) => !v);
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
                                    {data?.firstName && data?.firstName[0]?.toUpperCase()}
                                    {data?.lastName && data?.lastName[0]?.toUpperCase()}
                                </div>
                            ) : (
                                <div className="symbol-label fs-3 bg-light-danger text-danger">
                                    {data?.firstName && data?.firstName[0]?.toUpperCase()}
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
                <td>
                    {data?.functions &&
                        data?.functions[0]?.organization?.establishment?.department
                            ?.departmentCode && (
                            <span className="badge badge-primary fw-bolder ms-2">
                                {' '}
                                {data?.functions &&
                                    data?.functions[0]?.organization?.establishment?.department
                                        ?.departmentCode}
                            </span>
                        )}
                </td>
                <td>
                    <Period {...data} />
                </td>
                <td className="text-center">
                    <div className="btn-group">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                            <button className="btn btn-primary btn-icon btn-sm">
                                <i className="fa fa-edit"></i>
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-archive">Archiver</Tooltip>}>
                            <button
                                className="btn btn-danger btn-icon btn-sm"
                                onClick={toggleIsDelete}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-edit">Visualiser</Tooltip>}>
                            <button
                                className="btn btn-secondary btn-sm btn-icon"
                                onClick={toggleIsView}>
                                <i className="fa fa-eye"></i>
                            </button>
                        </OverlayTrigger>
                    </div>
                </td>
            </tr>
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                customTitle="Fiche personne"
                pluralName="users"
                id={data?.id}
                label={`${data?.firstName} ${data?.lastName}`}>
                <UserView isMultipleTables={true} />
            </View>
            {/* <NestedDelete
                id={data?.id}
                name="users"
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Search"
                singleName="search"
            /> */}
        </>
    );
};

export default DTRow;
