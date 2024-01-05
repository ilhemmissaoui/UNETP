import React from 'react';

import List from './List';

const SubscriptionFees = ({ data }) => {
    console.log(data);
    return (
        <>
            <List
                data={data}
                capacityHistories={data?.organization?.capacityHistories}
                establishmentKey={data?.establishmentKey}
            />
        </>
    );
};

export default SubscriptionFees;
