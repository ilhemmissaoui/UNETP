import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Ability } from '../../GUARDS';
import Delete from '../../Modals/Delete';
import View from '../../Modals/View';
import UpdateDiploma from './Update';
import DiplomaView from './View';

const DTRow = ({ data }) => {
    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();
    const [isView, setIsView] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsView = () => setIsView((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };

    const mapDefaultValues = ({
        diplomaDomain,
        diplomaFunction,
        diplomaGrade,
        diplomaGroup,
        diplomaSpecialty,
        diplomaSubGroup,
        diplomaType,
        name,
        id
    }) => {
        return {
            id,
            name,
            reference: {
                domainId: diplomaDomain?.code,
                functionId: diplomaFunction?.code,
                gradeId: diplomaGrade?.code,
                groupId: diplomaGroup?.code,
                specialtyId: diplomaSpecialty?.code,
                subGroupId: diplomaSubGroup?.code,
                typeId: diplomaType?.code
            }
        };
    };
    return (
        <>
            <tr className="align-middle">
                <td className="text-gray-900 fw-bold">
                    <a href="#" onClick={toggleIsView}>
                        {data?.name}
                    </a>
                </td>
                <td>
                    <span className="badge badge-primary fw-bolder fs-9">{data?.reference}</span>
                </td>

                <td>{data?.diplomaGrade?.label}</td>
                <td>{data?.diplomaSpecialty?.label}</td>
                <td>{data?.diplomaDomain?.label}</td>

                <td>{data?.diplomaGroup?.label}</td>

                <td>{data?.diplomaSubGroup?.label}</td>

                <td>{data?.diplomaType?.label}</td>
                <td className="text-center">
                    <div className="btn-group">
                        <Ability I="write" an="diploma">
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

                        <Ability I="view" an="diploma">
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

                        <Ability I="delete" an="diploma">
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
            <Delete
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="diplome"
                singleName="diplome"
            />

            <UpdateDiploma
                id={data?.id}
                defaultValues={mapDefaultValues(data)}
                isShow={isUpdate}
                toggleShow={toggleIsUpdate}
            />
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                pluralName="diplomas"
                id={data?.id}
                label={data?.name}>
                <DiplomaView />
            </View>
        </>
    );
};

export default DTRow;
