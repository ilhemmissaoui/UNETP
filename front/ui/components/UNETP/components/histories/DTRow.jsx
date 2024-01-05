import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import { historiesSchema } from '../../../../../schemas/unetpSchema';
import NestedDelete from '../../../Modals/NestedDelete';
import NestedUpdate from '../../../Modals/NestedUpdate';
import Period from '../../../Utils/Period';
import Form from './Form';

const dataMapper = ({ date, startDate, endDate, ...e }) => ({
    date: date ? moment(date).format('YYYY-MM-DD') : undefined,
    startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : undefined,
    endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : undefined,
    ...e
});
const DTRow = ({ data }) => {
    const updateForm = useForm({
        resolver: yupResolver(historiesSchema),
        defaultValues: dataMapper(data)
    });

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
                    <span className="fw-bold fs-8 text-gray-800">{data?.historyType?.label}</span>
                </td>
                <td>
                    <span className="fw-bold fs-8 text-gray-800">{data?.label}</span>
                </td>
                <td>
                    <Period {...data} />
                </td>
                <td>{data?.comment}</td>
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
                name="histories"
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Historique"
                singleName="Historique"
            />
            <FormProvider {...updateForm}>
                <NestedUpdate
                    id={data?.id}
                    isShow={isUpdate}
                    toggleShow={toggleIsUpdate}
                    collectionLabel="Historique"
                    formId="update-history"
                    size="lg">
                    <form id="update-history">
                        <Form />
                    </form>
                </NestedUpdate>
            </FormProvider>
        </>
    );
};

export default DTRow;
