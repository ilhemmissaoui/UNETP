import moment from 'moment';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import Remove from '../../../Modals/Remove';

function DTRow({ data }) {
    const currentFunction = data?.functions[data?.functions?.length - 1];
    const currentOrganization = currentFunction?.organization;
    const currentEstablishment = currentOrganization?.establishment;
    const currentDepartment = currentEstablishment?.department;
    const toggleIsDelete = () => setIsDelete((v) => !v);
    const [isDelete, setIsDelete] = useState();

    return (
        <>
            <tr className="text-center">
                <td className=" align-items-center">
                    <button className="btn btn-link d-flex align-items-center p-0">
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
                            <span className="fw-bolder"> {data?.firstName} </span> {data?.lastName}
                        </div>
                    </button>
                </td>
                <td className="text-center">
                    <span className="badge badge-primary fw-bolder ms-2">
                        {currentDepartment ? currentDepartment?.departmentCode : null}
                    </span>
                </td>
                <td className="text-center">
                    {data?.updatedAt && (
                        <div className="badge badge-light fw-bolder">
                            {moment(data?.updatedAt).format('DD/MM/YYYY HH:mm')}
                        </div>
                    )}
                </td>
                <td className="text-center">
                    <div className="btn-group">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-archive">Supprimer</Tooltip>}>
                            <button
                                className="btn btn-danger btn-icon btn-sm"
                                onClick={toggleIsDelete}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </OverlayTrigger>
                    </div>
                </td>
            </tr>
            <Remove
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Personne"
                singleName="Personne"
                prefix="trash/users/delete"
            />
        </>
    );
}

export default DTRow;
