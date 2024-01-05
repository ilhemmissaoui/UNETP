import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import { functionsSchema } from '../../../../../schemas/unetpSchema';
import NestedDelete from '../../../Modals/NestedDelete';
import NestedUpdate from '../../../Modals/NestedUpdate';
import Period from '../../../Utils/Period';
import Form from './Form';

const dataMapper = ({ startDate, endDate, ...e }) => ({
    ...e,
    startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : undefined,
    endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : undefined
});
const DTRow = ({ data }) => {
    const [isUpdate, setIsUpdate] = useState();
    const [isDelete, setIsDelete] = useState();
    const toggleIsDelete = () => setIsDelete((v) => !v);

    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };
    const updateForm = useForm({
        resolver: yupResolver(functionsSchema),
        defaultValues: dataMapper(data)
    });
    console.log(data);
    return (
        <>
            <tr className="align-middle text-center fs-8 text-gray-800">
                <td className=" align-items-center">
                    <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                        <button className="btn btn-link p-0">
                            <div className="symbol-label fs-3 bg-light-danger text-danger">
                                {data?.user?.firstName[0]?.toUpperCase()}

                                {data?.user?.lastName[0]?.toUpperCase()}
                            </div>
                        </button>
                    </div>
                    <div className="d-flex flex-column">
                        <a href="#" className="text-gray-800 text-hover-primary mb-1">
                            <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                                {data?.user?.firstName}{' '}
                            </span>{' '}
                            <span className="text-dark  text-hover mb-1 fs-7">
                                {data?.user?.lastName}
                            </span>
                        </a>
                    </div>
                </td>

                <td>
                    <span className="text-dark  text-hover mb-1 fs-7">
                        {data?.functionLabel?.singularMaleName}
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
            <FormProvider {...updateForm}>
                <NestedUpdate
                    id={data?.id}
                    isShow={isUpdate}
                    toggleShow={toggleIsUpdate}
                    collectionLabel="Fonction"
                    formId="update-function"
                    size="lg">
                    <form id="update-function">
                        <Form />
                    </form>
                </NestedUpdate>
            </FormProvider>
            <NestedDelete
                name="functions"
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Fonction"
                singleName="Fonction"
            />
        </>
    );
};

export default DTRow;
