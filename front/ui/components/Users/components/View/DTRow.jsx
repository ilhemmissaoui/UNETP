import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../hooks/use-crud';
import useFormParams from '../../../../hooks/use-form-params';
import { historySchema } from '../../../../schemas/historySchema';
import NestedDelete from '../../Modals/NestedDelete';
import NestedUpdate from '../../Modals/NestedUpdate';
import Period from '../../Utils/Period';
import Form from './Form';

const dataMapper = ({ date, startDate, endDate, ...e }) => ({
    date: date ? moment(date).format('YYYY-MM-DD') : undefined,
    startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : undefined,
    endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : undefined,
    ...e
});

const DTRow = ({ data: { index, ...data } }) => {
    const { histories } = useFormParams();
    const updateForm = useForm({
        resolver: yupResolver(historySchema),
        defaultValues: dataMapper(data)
    });
    const { control } = useFormContext();

    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };

    const {
        historyTypes: { page, loading }
    } = useMultiCRUDContext();
    return (
        <>
            <tr className="align-middle text-center fs-8 text-gray-800">
                <td>
                    <span className="fw-bold fs-8 text-gray-800">
                        {data?.historyType?.label ? (
                            <>{data?.historyType?.label}</>
                        ) : (
                            !data.id &&
                            !loading && (
                                <>{page?.nodes?.find((e) => data?.historyIdType == e.id)?.label}</>
                            )
                        )}
                    </span>
                </td>
                <td>
                    <span className="fw-bold fs-8 text-gray-800">{data?.label}</span>
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
                name={histories?.arrayName}
                id={index}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Historique"
                singleName="Historique"
            />
            <FormProvider {...updateForm}>
                <NestedUpdate
                    id={index}
                    isShow={isUpdate}
                    toggleShow={toggleIsUpdate}
                    collectionLabel="Historique"
                    formId="update-history"
                    size="lg"
                    label={data?.label}
                    control={control}
                    name={histories?.arrayName}>
                    <form id="update-history">
                        <Form />
                    </form>
                </NestedUpdate>
            </FormProvider>
        </>
    );
};

export default DTRow;
