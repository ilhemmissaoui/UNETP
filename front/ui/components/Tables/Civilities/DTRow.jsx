import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Ability } from '../../GUARDS';
import Delete from '../../Modals/Delete';
import Update from './Update';

function DTRow({ data }) {
    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };

    return (
        <tr>
            <td>{data?.name}</td>
            <td>{data?.abbreviation}</td>
            <td>{data?.gender}</td>
            <td>{data?.rank}</td>
            <td className="text-center">
                <div className="btn-group">
                    <Ability I="write" an="civility">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                            <button
                                className="btn btn-primary btn-icon btn-sm"
                                onClick={toggleIsUpdate}>
                                <i className="fa fa-edit"></i>
                            </button>
                        </OverlayTrigger>
                    </Ability>

                    <Ability I="delete" an="civility">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-archive">Supprimer</Tooltip>}>
                            <button
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
                collectionLabel="Civility"
                singleName="civility"
            />
        </tr>
    );
}

export default DTRow;
