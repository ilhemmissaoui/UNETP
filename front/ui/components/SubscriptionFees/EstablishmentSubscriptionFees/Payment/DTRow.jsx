import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { paymentSchema } from '../../../../../schemas/subscriptionFeeSchema';
import { FormatPrice } from '../../../../utils/currency';
import { Ability } from '../../../GUARDS';
import NestedDelete from '../../../Modals/NestedDelete';
import NestedUpdate from '../../../Modals/NestedUpdate';
import View from '../../../Modals/ViewCore';
import Form from './Form';
import ViewRow from './ViewRow';
const DTRow = ({ data, totalUnpaid }) => {
    const updateFrom = useFormContext();
    const { control } = updateFrom;
    const editFrom = useForm({
        resolver: yupResolver(paymentSchema),
        defaultValues: {
            ...data,
            amount: data?.enitiesPayments?.find((e) => e?.type == 'organization')?.amount
        }
    });
    const [isView, setIsView] = useState(false);
    const toggleIsView = () => setIsView((v) => !v);

    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit((v) => !v);

    const [isDelete, setIsDelete] = useState(false);
    const toggleIsDelete = () => setIsDelete((v) => !v);

    const totalPaid = data?.enitiesPayments?.reduce(
        (pv, cv) => pv + parseFloat(cv?.amount || 0),
        0
    );

    return (
        <>
            <tr key={data?.id} className="align-middle text-center fs-8 text-gray-800">
                <td>
                    <span className="text-gray-700 badge badge-light">
                        {moment(data?.depositDate).format('DD-MM-YYYY')}
                    </span>
                </td>
                <td>
                    <span className="text-gray-700  badge badge-light">
                        {moment(data?.cashedDate).format('DD-MM-YYYY')}
                    </span>
                </td>
                <td>
                    <span className="text-gray-700 ">{data?.paimentType}</span>
                </td>
                <td>
                    <span className="text-gray-700 ">{data?.reference}</span>
                </td>
                <td>
                    <span className="text-gray-700 ">
                        {' '}
                        <FormatPrice value={totalPaid} />
                    </span>
                </td>
                <td>
                    <div className="btn-group">
                        <Ability I="view" an="establishment">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                                <button
                                    className="btn btn-primary btn-sm btn-icon"
                                    onClick={toggleIsEdit}
                                    type="button">
                                    <i className="fa fa-edit"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>
                        <Ability I="view" an="establishment">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Visualiser</Tooltip>}>
                                <button
                                    className="btn btn-secondary btn-sm btn-icon"
                                    onClick={toggleIsView}
                                    type="button">
                                    <i className="fa fa-eye"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>
                        <Ability I="view" an="establishment">
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
                        </Ability>
                    </div>
                </td>
            </tr>
            <FormProvider {...editFrom}>
                <NestedUpdate
                    id={data?.id}
                    isShow={isEdit}
                    toggleShow={toggleIsEdit}
                    formId="edit-payment"
                    collectionLabel="Paiement"
                    size="lg"
                    name="payments"
                    label="Paiement"
                    control={control}>
                    <form id="edit-payment">
                        <Form totalUnpaid={totalUnpaid} />
                    </form>
                </NestedUpdate>
            </FormProvider>
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                customTitle="Détail du paiement"
                size={'lg'}
                loading={false}
                data={data}>
                <ViewRow data={data} />
            </View>{' '}
            <NestedDelete
                name="payments"
                id={data.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Paiement"
                singleName="Paiement"
            />
        </>
    );
};

export default DTRow;
