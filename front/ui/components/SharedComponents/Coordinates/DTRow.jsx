import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import useFormParams from '../../../../hooks/use-form-params';
import { coordinateSchema } from '../../../../schemas/coordinatesSchema';
import { Ability } from '../../GUARDS';
import NestedDelete from '../../Modals/NestedDelete';
import NestedUpdate from '../../Modals/NestedUpdate';
import Form from './Form';

const DTRow = ({ data }) => {
    const updateForm = useForm({
        resolver: yupResolver(coordinateSchema),
        defaultValues: data
    });
    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();
    const { control } = useFormContext();
    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };
    const params = useFormParams();
    return (
        <>
            <tr className="text-center">
                <td>
                    <span className="text-dark  text-hover mb-1 fs-7">{data?.label} </span>
                </td>
                <td>
                    <span className="text-dark  text-hover mb-1 fs-7">
                        <NumberFormat
                            displayType="text"
                            format="## ## ## ## ##"
                            value={data?.phoneNumber}
                        />
                    </span>
                </td>
                <td>
                    <span className="text-dark  text-hover mb-1 fs-7">
                        <a
                            href={`mailTo:${data?.email}`}
                            target="_blank"
                            hrel="noreferrer"
                            rel="noreferrer">
                            {data?.email}
                        </a>
                    </span>
                </td>
                <td>
                    <div>
                        {data?.voiceLabel} <br />
                        {data?.zipCode} {data.city}
                    </div>
                </td>
                <td>
                    <span className="text-dark  text-hover mb-1 fs-7">{data?.fax} </span>
                </td>
                <td>
                    <a target="_blank" href={data?.website} rel="noreferrer">
                        {data?.website}
                    </a>
                </td>
                <td>
                    <div className="badge badge-light fw-bolder">
                        {data?.createdAt ? moment(data?.createdAt).format('DD/MM/YYYY') : null}
                    </div>
                </td>

                <td className="text-center sm">
                    <div className="btn-group">
                        <Ability I="write" an="user">
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

                        <Ability I="write" an="user">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-delete">Supprimer</Tooltip>}>
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
            </tr>
            <FormProvider {...updateForm}>
                <NestedUpdate
                    id={data?.id}
                    isShow={isUpdate}
                    toggleShow={toggleIsUpdate}
                    collectionLabel="Coordonnée"
                    formId="update-coordinate"
                    size="lg"
                    label={data?.label}
                    control={control}
                    name={params.coordinates.arrayName}>
                    <form id="update-coordinate">
                        <Form />
                    </form>
                </NestedUpdate>
            </FormProvider>
            <NestedDelete
                name={params.coordinates.arrayName}
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Coordonnée"
                singleName="Coordonnée"
                control={control}
            />
        </>
    );
};
DTRow.columnsCount = 5;

export default DTRow;
