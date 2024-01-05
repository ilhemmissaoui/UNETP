import React from 'react';

import List from './List';
const Payment = ({ data }) => {
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <div className="h6 align-items-center d-flex">Tableau des Paiements :</div>
            </div>
            <List columnsCount={6} data={data} />
        </>
    );
};

export default Payment;
