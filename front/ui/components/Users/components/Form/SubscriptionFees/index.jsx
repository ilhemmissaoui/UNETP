import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { subscriptionFeeSchema } from '../../../../../../schemas/users';
import NestedAdd from '../../../../Modals/NestedAdd';
import List from './components/subscriptionFees/List';
import Form from './Form';
const SubscriptionFees = () => {
    const [isAdd, setIsAdd] = useState();
    const toggleIsAdd = () => setIsAdd((v) => !v);
    const { watch, control } = useFormContext();
    const subscriptionFees = watch('subscriptionFees');
    const addForm = useForm({
        resolver: yupResolver(subscriptionFeeSchema),
        defaultValues: {
            calculatedAmount: 'noChoice'
        }
    });
    const {
        formState: { errors }
    } = addForm;
    console.log(errors);
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <div className="h6 align-items-center d-flex">Tableau des coatisations :</div>

                <button className="btn btn-sm btn-primary" type="button" onClick={toggleIsAdd}>
                    <i className="fa fa-plus"></i> Création
                </button>
            </div>
            <List data={subscriptionFees?.map((e) => ({ ...e, id: e.id }))} />
            <FormProvider {...addForm}>
                <NestedAdd
                    isShow={isAdd}
                    toggleShow={toggleIsAdd}
                    formId="add-cotisation"
                    collectionLabelPrefix="d'une"
                    collectionLabel="Cotisation"
                    size="lg"
                    name="subscriptionFee"
                    control={control}>
                    <form id="add-cotisation">
                        <Form subscriptionFees={subscriptionFees} />
                    </form>
                </NestedAdd>
            </FormProvider>
        </>
    );
};

export default SubscriptionFees;
