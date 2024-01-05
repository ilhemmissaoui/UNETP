import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../hooks/use-crud';
import { editdiplomaSchema } from '../../../../schemas/establishmentSchema';
import NestedDelete from '../../Modals/NestedDelete';
import NestedUpdate from '../../Modals/NestedUpdate';
import EditDiploma from './EditDiploma';

const DTRow = ({ data }) => {
    const { control } = useFormContext();
    const updateForm = useForm({
        resolver: yupResolver(editdiplomaSchema),
        defaultValues: { ...data }
    });
    const { diplomas } = useMultiCRUDContext();
    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };
    const diploma = diplomas?.page?.nodes?.find((v) => v.id == data?.diplomaId);
    return (
        <>
            {!diplomas?.loading && (
                <>
                    <tr key={data?.id} className="align-middle text-center fs-8 text-gray-800">
                        <td>{diploma?.name}</td>
                        <td className="text-center sm">
                            <div className="btn-group">
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
                            </div>
                        </td>
                    </tr>
                    <FormProvider {...updateForm}>
                        <NestedUpdate
                            id={data?.id}
                            isShow={isUpdate}
                            toggleShow={toggleIsUpdate}
                            collectionLabel="Diplôme"
                            formId="update-diploma"
                            size="lg"
                            label={diploma?.name}
                            control={control}
                            name="diplomas">
                            <form id="update-diploma">
                                <EditDiploma diplomaName={diploma?.name} />
                            </form>
                        </NestedUpdate>
                    </FormProvider>
                    <NestedDelete
                        name="diplomas"
                        id={data?.id}
                        isShow={isDelete}
                        toggleShow={toggleIsDelete}
                        collectionLabel="Diplôme"
                        singleName="diploma"
                        control={control}
                    />
                </>
            )}
        </>
    );
};

export default DTRow;
