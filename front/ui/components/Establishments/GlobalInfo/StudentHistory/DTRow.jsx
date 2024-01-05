import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../../hooks/use-crud';
import { capacityEntrySchema } from '../../../../../schemas/capacityEntrySchema';
import NestedDelete from '../../../Modals/NestedDelete';
import NestedUpdate from '../../../Modals/NestedUpdate';
import Form from './Form';

const DTRow = ({ data }) => {
    const updateForm = useForm({
        resolver: yupResolver(capacityEntrySchema),
        defaultValues: data
    });
    const { establishmentKey, subscriptionFees } = useMultiCRUDContext();
    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();
    const { control } = useFormContext();
    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };

    const {
        collegeContractStudentsCount,
        lpContractStudentsCount,
        lgtContractStudentsCount,
        btsContractStudentsCount,
        supContractStudentsCount,
        cfpCfcInternsHoursCount,
        cfaUfaApprenticesCount
    } = data;
    let sum =
        (Number.isNaN(parseInt(collegeContractStudentsCount))
            ? 0
            : parseInt(collegeContractStudentsCount)) +
        (Number.isNaN(parseInt(lpContractStudentsCount)) ? 0 : parseInt(lpContractStudentsCount)) +
        (Number.isNaN(parseInt(lgtContractStudentsCount))
            ? 0
            : parseInt(lgtContractStudentsCount)) +
        (Number.isNaN(parseInt(btsContractStudentsCount))
            ? 0
            : parseInt(btsContractStudentsCount)) +
        (Number.isNaN(parseInt(supContractStudentsCount)) ? 0 : parseInt(supContractStudentsCount));

    const studentNumber = {
        0: ` Nombre d'élèves : ${sum}  = Collège(${
            Number.isNaN(collegeContractStudentsCount) ? 0 : collegeContractStudentsCount || 0
        }) + LP(${
            Number.isNaN(lpContractStudentsCount) ? 0 : lpContractStudentsCount || 0
        }) + LGT(${
            Number.isNaN(lgtContractStudentsCount) ? 0 : lgtContractStudentsCount || 0
        }) + BTS(${
            Number.isNaN(btsContractStudentsCount) ? 0 : btsContractStudentsCount || 0
        }) + Sup & CPGE(${
            Number.isNaN(supContractStudentsCount) ? 0 : supContractStudentsCount || 0
        })`,
        1: `Nombre d'apprentis : ${
            Number.isNaN(cfaUfaApprenticesCount) ? 0 : cfaUfaApprenticesCount || 0
        }`,
        2: `Nombre d'heures stagiaire : ${
            Number.isNaN(cfpCfcInternsHoursCount) ? 0 : cfpCfcInternsHoursCount || 0
        }`,
        3: `Nombre d'apprentis : ${
            Number.isNaN(cfaUfaApprenticesCount) ? 0 : cfaUfaApprenticesCount || 0
        }`,
        4: `Nombre d'heures stagiaire : ${
            Number.isNaN(cfpCfcInternsHoursCount) ? 0 : cfpCfcInternsHoursCount || 0
        }`
    };
    console.log(subscriptionFees);
    const showEdit = subscriptionFees?.find((e) => e.year === data.year && e.status === 'Validé');
    return (
        <>
            <tr key={data?.id} className="align-middle text-center fs-8 text-gray-800">
                <td>{data?.year}</td>
                {establishmentKey && (
                    <td>{studentNumber[establishmentKey.charAt(establishmentKey.length - 1)]}</td>
                )}
                <td className="text-center sm">
                    <div className="btn-group">
                        {!showEdit && (
                            <>
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
                            </>
                        )}
                    </div>
                </td>
            </tr>

            <NestedDelete
                name="capacityHistories"
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Ligne d'historique"
                control={control}
            />
            <FormProvider {...updateForm}>
                <NestedUpdate
                    id={data?.id}
                    isShow={isUpdate}
                    toggleShow={toggleIsUpdate}
                    collectionLabel="Ligne d'historique"
                    formId="update-entry"
                    size="lg"
                    label={data?.year}
                    control={control}
                    name="capacityHistories">
                    <form id="update-entry">
                        <Form />
                    </form>
                </NestedUpdate>
            </FormProvider>
        </>
    );
};
DTRow.columnsCount = 3;

export default DTRow;
