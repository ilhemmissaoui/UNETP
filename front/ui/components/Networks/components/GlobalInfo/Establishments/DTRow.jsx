import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../../../hooks/use-crud';
import { establishmentSchema } from '../../../../../../schemas/networkSchema';
import NestedDelete from '../../../../Modals/NestedDelete';
import NestedUpdate from '../../../../Modals/NestedUpdate';
import Form from './Form';

const DTRow = ({ data: { index, ...data } }) => {
    const updateForm = useForm({
        resolver: yupResolver(establishmentSchema),
        defaultValues: { ...data }
    });
    const { control } = useFormContext();
    const { establishments } = useMultiCRUDContext();

    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };
    const info =
        data.mode === 'search'
            ? establishments?.page?.nodes?.find((e) => {
                  return e.organization?.id === data?.id;
              })
            : data;
    return (
        <>
            <tr className="align-middle text-center fs-8 text-gray-800">
                <td>{info?.organization?.name}</td>
                <td>{info?.establishmentNumber}</td>
                <td>{info?.establishmentKey}</td>
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
                            overlay={<Tooltip id="tooltip-archive">Archiver</Tooltip>}>
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

            <NestedDelete
                name="establishments"
                id={index}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Etablissement"
                singleName="Etablissement"
                control={control}
            />
            <FormProvider {...updateForm}>
                <NestedUpdate
                    id={index}
                    isShow={isUpdate}
                    toggleShow={toggleIsUpdate}
                    collectionLabel="Etablissement"
                    formId="update-establishment"
                    size="lg"
                    label={info?.organization?.name}
                    control={control}
                    name="establishments">
                    <form id="update-establishment">
                        <Form />
                    </form>
                </NestedUpdate>
            </FormProvider>
        </>
    );
};

export default DTRow;
