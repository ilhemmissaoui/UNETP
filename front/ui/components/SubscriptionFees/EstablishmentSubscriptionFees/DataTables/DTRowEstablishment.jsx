import axios from 'axios';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Controller, useFormContext } from 'react-hook-form';

import useToast from '../../../../../hooks/use-toast';
import { status } from '../../../../../schemas/subscriptionFeeSchema';
import settings from '../../../../../settings';
import { FormatPrice } from '../../../../utils/currency';
import Form from '../Form';

const DTRow = ({ data }) => {
    const [isEdit, setIsEdit] = useState(false);
    const toggleEditAmount = () => setIsEdit((v) => !v);
    const editFrom = useFormContext();
    const { setToast } = useToast();
    const { endpointUrl } = settings;
    const { control, watch } = editFrom;

    const handelEdit = async (value) => {
        const data = watch();
        data.status = value;

        try {
            await axios.post(`${endpointUrl}/subscription-fees/${data?.id}`, data);
            setToast({
                message: 'Cotisation a été mis à jour avec succès',
                variant: 'success'
            });
        } catch (e) {
            setToast({
                message: "Erreur lors de mis à jour de L'établissement ",
                variant: 'danger'
            });
        }
    };

    return (
        <>
            <tr key={data?.id} className="align-middle text-center fs-6 fw-bolder text-gray-700">
                <td>
                    {' '}
                    {data?.organization?.name}
                    <span className="badge badge-primary mx-1">
                        {data?.organization?.establishment?.establishmentKey}
                    </span>
                </td>
                <td>-</td>
                <td>
                    <div className="">
                        <FormatPrice
                            value={data?.customAmount ? data?.customAmount : data?.calculatedAmount}
                        />{' '}
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                            <button
                                className="mx-1 btn btn-primary btn-icon btn-sm"
                                type="button"
                                onClick={toggleEditAmount}>
                                <i className="fa fa-edit"></i>
                            </button>
                        </OverlayTrigger>
                    </div>
                </td>
                <td>
                    <FormatPrice
                        value={
                            parseFloat(
                                data?.customAmount
                                    ? data?.customAmount || 0
                                    : data?.calculatedAmount || 0
                            ) -
                                data?.subscriptionPayments?.reduce(
                                    (pv, cv) => pv + parseFloat(cv?.amount || 0),
                                    0
                                ) || 0
                        }
                    />
                </td>
                <td>
                    <div className="form-group">
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    onChange={({ target: { value } }) => {
                                        if (value) handelEdit(value);
                                        field.onChange(value);
                                    }}
                                    className="form-select text-center">
                                    {Object.entries(status).map(([key, value]) => (
                                        <option className="text-gray-700" key={key} value={key}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </div>
                </td>
            </tr>

            <form id="editAmount">
                <Form
                    formId="editAmount"
                    isShow={isEdit}
                    customTitle="Modification du montant de la cotisation"
                    size="lg"
                    toggleShow={toggleEditAmount}
                />
            </form>
        </>
    );
};

export default DTRow;
