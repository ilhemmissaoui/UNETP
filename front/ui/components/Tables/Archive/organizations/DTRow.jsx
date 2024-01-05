import moment from 'moment';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Ability } from '../../../GUARDS';
import Remove from '../../../Modals/Remove';

function DTRow({ data }) {
    const toggleIsDelete = () => setIsDelete((v) => !v);
    const [isDelete, setIsDelete] = useState();

    return (
        <>
            <tr>
                <td>
                    <span className="fw-bolder">{data?.name ? data?.name : null}</span>
                </td>
                <td>
                    {data?.updatedAt && (
                        <div className="badge badge-light fw-bolder">
                            {moment(data?.updatedAt).format('DD/MM/YYYY HH:mm')}
                        </div>
                    )}
                </td>
                <td className="text-center">
                    <div className="btn-group">
                        <Ability I="delete" an="archives">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Supprimer</Tooltip>}>
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

            <Remove
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Organisation"
                singleName="Organisation"
                prefix="trash/organizations/delete"
            />
        </>
    );
}

export default DTRow;
