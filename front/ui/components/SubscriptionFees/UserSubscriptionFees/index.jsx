import React from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';

import List from './List';
import Paymnets from './Payment';

const SubscriptionFees = ({ data }) => {
    const updateFrom = useFormContext();
    console.log(data);
    return (
        <>
            <div className="separator my-5" />
            <div className="notice d-flex bg-light rounded border p-3 mb-3">
                <div className="flex-shrink-0 mb-3">
                    <span className="text-dark fs-5 fw-bolder me-2 d-block lh-1 pb-1 p-3">
                        Solde{' '}
                    </span>
                </div>{' '}
            </div>
            <List
                columnsCount={6}
                data={data?.establishmentSubscriptionFees}
                status={data?.status}
            />
            <div className="separator my-5" />
            <FormProvider {...updateFrom}>
                <Paymnets data={data?.payments} />
            </FormProvider>
        </>
    );
};
export default SubscriptionFees;
