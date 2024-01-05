import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Ability } from '../../GUARDS';
import Delete from '../../Modals/Delete';
import View from '../../Modals/View';
import Update from './Update';
import ViewFunction from './ViewFunction';

function DTRow({ data }) {
    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };
    console.log(data);
    return (
        <tr>
            <td className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                <button className="btn btn-link text-dark  mb-1 fs-6" onClick={toggleIsView}>
                    {data?.singularMaleName}
                </button>
            </td>
            <td>{data?.organizationType?.label}</td>
            <td>{data?.singularFemaleName}</td>
            <td>{data?.pluralMaleName}</td>
            <td>{data?.pluralFemaleName}</td>
            <td>
                {data?.isHeadMaster ? (
                    <span className="badge badge-light-success fs-8 fw-bolder">Oui</span>
                ) : (
                    <span className="badge badge-light-danger fs-8 fw-bolder">Non</span>
                )}
            </td>
            <td className="text-center">
                <div className="btn-group">
                    <Ability I="write" an="function-label">
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
                                onClick={toggleIsView}>
                                <i className="fa fa-eye"></i>
                            </button>
                        </OverlayTrigger>
                    </Ability>
                    <Ability I="delete" an="function-label">
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
                collectionLabel="Fonction"
                singleName="fonction"
            />
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                pluralName="function-labels"
                id={data?.id}
                label={data?.singularMaleName}>
                <ViewFunction />
            </View>
        </tr>
    );
}

export default DTRow;
