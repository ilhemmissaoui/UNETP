import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { CRUDProvider, useMultiCRUDContext } from '../../../../../hooks/use-crud';
import useToast from '../../../../../hooks/use-toast';
import { paymentSchema } from '../../../../../schemas/subscriptionFeeSchema';
import settings from '../../../../../settings';
import Delete from '../../../Modals/DeleteCore';
import NestedAdd from '../../../Modals/NestedAdd';
import Form from './Form';
import List from './List';

const Payment = () => {
    const { watch, control } = useFormContext();
    const { setToast } = useToast();
    const [isRemove, setIsRemove] = useState();

    const toggleIsRemove = () => setIsRemove((v) => !v);
    const [isAdd, setIsAdd] = useState(false);
    const toggleIsAdd = () => setIsAdd((v) => !v);
    const { entities } = useMultiCRUDContext();
    const organization = entities?.find((e) => e?.type == 'organization');
    const data = watch();

    const addForm = useForm({
        resolver: yupResolver(paymentSchema)
        // defaultValues: {
        //     enitiesPayments: [
        //         {
        //             entityId: organization?.id,
        //             type: 'organization',
        //             ...organization
        //         }
        //     ]
        // }
    });

    useEffect(() => {
        if (organization)
            addForm.reset({
                enitiesPayments: [
                    {
                        entityId: organization?.id,
                        type: 'organization',
                        ...organization
                    }
                ],
                amount: data?.subscriptionPayments?.map((e) => e?.amount)
            });
    }, [organization]);
    const totalToPay =
        (!isNaN(parseFloat(data?.customAmount))
            ? parseFloat(data?.customAmount || 0)
            : parseFloat(data?.calculatedAmount || 0)) +
        data?.userSubscriptionFees?.reduce(
            (pv, cv) =>
                pv +
                (!isNaN(parseFloat(cv?.customAmount))
                    ? parseFloat(cv?.customAmount || 0)
                    : parseFloat(cv?.calculatedAmount || 0)),
            0
        );
    const totalPaid = data?.payments?.reduce(
        (pv, cv) =>
            pv + cv?.enitiesPayments?.reduce((ppv, ccv) => ppv + parseFloat(ccv.amount || 0), 0),
        0
    );
    const totalUnpaid = totalToPay - totalPaid;

    const payments = data?.payments;
    const { endpointUrl } = settings;
    const { push } = useRouter();

    const DeleteSub = async () => {
        try {
            await axios.get(`${endpointUrl}/subscription-fees/destroy/${data?.id}`);
            setToast({
                message: 'cotisation a été supprimé avec succès.',
                variant: 'success'
            });
            push('/structures-etablissement');
        } catch (e) {
            setToast({
                message:
                    'Échec de la suppression des données , il existe une référence de paiement sur cette cotisation  ',
                variant: 'danger'
            });
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <div className="h6 align-items-center d-flex">Tableau des Paiements :</div>

                <button className="btn btn-sm btn-primary" type="button" onClick={toggleIsAdd}>
                    <i className="fa fa-plus"></i> Ajouter un paiement
                </button>
            </div>
            <List
                columnsCount={6}
                totalUnpaid={totalUnpaid}
                data={payments?.map((e, i) => ({ ...e, id: i }))}
            />

            <div className="notice  bg-light-danger border-dashed  border-danger rounded border p-3 mb-3">
                <div className="flex-shrink-0 mb-3">
                    <span className="text-gray-600 fs-5 fw-bolder me-2 d-flex lh-1 pb-5 p-3">
                        Vous pouvez supprimer la cotisation seulement s&apos;il n&apos;existe plus
                        aucune référence de paiement sur celle-ci. La suppression concerne la
                        cotisation visible au niveau du champ &apos;solde&apos;.
                    </span>

                    <button
                        className="btn btn-sm btn-danger ms-3"
                        type="button"
                        onClick={toggleIsRemove}>
                        <i className="fa fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>

            <FormProvider {...addForm}>
                <NestedAdd
                    isShow={isAdd}
                    toggleShow={toggleIsAdd}
                    formId="add-payment"
                    collectionLabelPrefix="d'un"
                    collectionLabel="Paiement"
                    size="lg"
                    name="payments"
                    control={control}>
                    <form id="add-payment">
                        <Form totalUnpaid={totalUnpaid} />
                    </form>
                </NestedAdd>
            </FormProvider>

            <CRUDProvider _delete={DeleteSub}>
                <Delete
                    name="Cotisation"
                    isShow={isRemove}
                    toggleShow={toggleIsRemove}
                    collectionLabel="Cotisation"
                    singleName="Cotisation"
                />
            </CRUDProvider>
        </>
    );
};

export default Payment;
