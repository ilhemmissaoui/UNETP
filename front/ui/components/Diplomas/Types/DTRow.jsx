import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Ability } from '../../GUARDS';
import Delete from '../../Modals/Delete';
import Update from './Update';

const DTRow = ({ data }) => {
    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };

    return (
        <>
            <tr>
                <td className="text-dark fw-bolder text-hover-primary mb-1 fs-6">{data?.label}</td>
                <td>{data?.code}</td>
                <td className="text-center">
                    <div className="btn-group">
                        <Ability I="write" an="diploma.type">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-icon btn-sm"
                                    onClick={toggleIsUpdate}>
                                    <i className="fa fa-edit"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>

                        <Ability I="delete" an="diploma.type">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-archive">Supprimer</Tooltip>}>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-icon btn-sm"
                                    onClick={toggleIsDelete}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>
                    </div>
                </td>
                <Update
                    id={data?.id}
                    defaultValues={data}
                    isShow={isUpdate}
                    toggleShow={toggleIsUpdate}
                />
                <Delete
                    id={data?.id}
                    isShow={isDelete}
                    toggleShow={toggleIsDelete}
                    collectionLabel="Label"
                    singleName="label"
                />
            </tr>
        </>
    );
};

export default DTRow;
