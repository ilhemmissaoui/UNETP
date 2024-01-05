import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../../../../../hooks/use-crud';
import { functionSchema } from '../../../../../../../../schemas/users';
import NestedDelete from '../../../../../../Modals/NestedDelete';
import NestedUpdate from '../../../../../../Modals/NestedUpdate';
import Period from '../../../../../../Utils/Period';
import Form from './Form';

const dataMapper = ({ startDate, endDate, ...e }) => ({
    ...e,
    startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : undefined,
    endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : undefined
});

const DTRow = ({ data }) => {
    const updateForm = useForm({
        resolver: yupResolver(functionSchema),
        defaultValues: dataMapper(data)
    });

    const {
        functionLabels: { page: functionLabels }
    } = useMultiCRUDContext();
    const { control } = useFormContext();
    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };

    return (
        <>
            <tr className="align-middle text-center">
                <td>
                    <span className="fw-bold fs-8 text-gray-800">
                        {data?.functionLabels?.singularMaleName
                            ? data?.functionLabels?.singularMaleName
                            : functionLabels?.nodes?.find((e) => e?.id == data?.labelId)
                                  ?.singularMaleName}
                    </span>
                </td>
                <td>
                    <span className="fw-bold fs-8 text-gray-800"> {data?.organization?.name}</span>{' '}
                    <span className="badge badge-red">
                        {data?.organization?.establishment?.establishmentKey}
                    </span>
                </td>
                <td>
                    <Period {...data} />
                </td>

                <td className="text-center">
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
            <NestedDelete
                name="functions"
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Fonction"
                singleName="Fonction"
            />
            <FormProvider {...updateForm}>
                <NestedUpdate
                    id={data?.id}
                    isShow={isUpdate}
                    toggleShow={toggleIsUpdate}
                    collectionLabel="Fonction"
                    formId="update-function"
                    size="lg"
                    label={
                        data?.functionLabels?.singularMaleName
                            ? data?.functionLabels?.singularMaleName
                            : functionLabels?.nodes?.find((e) => e?.id == data?.labelId)
                                  ?.singularMaleName
                    }
                    control={control}
                    name="functions">
                    <form id="update-function">
                        <Form />
                    </form>
                </NestedUpdate>
            </FormProvider>
        </>
    );
};

export default DTRow;
