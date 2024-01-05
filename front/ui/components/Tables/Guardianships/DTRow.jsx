import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Ability } from '../../GUARDS';
import Delete from '../../Modals/Delete';
import View from '../../Modals/View';
import Update from './Update';
import ViewGuardianship from './View';
function DTRow({ data }) {
    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };
    const [isShow, setIsShow] = useState();
    const toggleIsShow = () => {
        setIsShow((v) => !v);
    };

    return (
        <tr>
            <td>{data?.label}</td>
            <td className="text-center">
                <div className="btn-group">
                    <Ability I="write" an="guardianship">
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

                    <Ability I="view" an="guardianship">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-edit">Visualiser</Tooltip>}>
                            <button
                                className="btn btn-secondary btn-sm btn-icon"
                                onClick={toggleIsShow}>
                                <i className="fa fa-eye"></i>
                            </button>
                        </OverlayTrigger>
                    </Ability>
                    <Ability I="delete" an="guardianship">
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

            <View
                isShow={isShow}
                toggleIsShow={toggleIsShow}
                size="xl"
                pluralName="guardianships"
                id={data?.id}
                label={data?.label}>
                <ViewGuardianship data={data} />
            </View>

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
                collectionLabel="Tutelle"
                singleName="Tutelle"
            />
        </tr>
    );
}

export default DTRow;
