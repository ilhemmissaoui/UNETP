import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { subscriptionFeeSchema } from '../../../../schemas/establishmentSchema';
import NestedAdd from '../../Modals/NestedAdd';
import Form from './Form';
import List from './List';
const SubscriptionFees = () => {
    const [isAdd, setIsAdd] = useState();
    const toggleIsAdd = () => setIsAdd((v) => !v);
    const { watch, control } = useFormContext();
    const updateForm = useForm({
        resolver: yupResolver(subscriptionFeeSchema)
    });
    const subscriptionFees = watch('subscriptionFees');
    const capacityHistories = watch('capacityHistories');
    return (
        <>
            {' '}
            <div className="d-flex justify-content-between mb-4">
                <div className="h6 align-items-center d-flex">Tableau des coatisations :</div>

                <button className="btn btn-sm btn-primary" type="button" onClick={toggleIsAdd}>
                    <i className="fa fa-plus"></i> Création
                </button>
            </div>
            <List
                columnsCount={4}
                data={subscriptionFees?.map((e) => ({ ...e, id: e.id }))}
                capacityHistories={capacityHistories}
            />
            <FormProvider {...updateForm}>
                <NestedAdd
                    isShow={isAdd}
                    toggleShow={toggleIsAdd}
                    formId="add-coatization"
                    collectionLabelPrefix="d'une"
                    collectionLabel="Cotisation"
                    size="lg"
                    name="subscriptionFee"
                    control={control}>
                    <form id="add-coatization">
                        <Form subscriptionFees={subscriptionFees} />
                    </form>
                </NestedAdd>
            </FormProvider>
        </>
    );
};

export default SubscriptionFees;
