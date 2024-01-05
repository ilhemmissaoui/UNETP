import React from 'react';

import DTRow from './DTRow';
const headers = [
    () => <th className="min-w-50px">Cotisation</th>,
    () => <th className="min-w-50px">Statut</th>,
    () => <th className="min-w-50px">Montant</th>,
    () => <th className="min-w-50px">syndicat</th>
];
const SubscriptionFees = ({ data, columnsCount = 5 }) => {
    return (
        <>
            <div className="notice bg-light-success rounded border-success border border-dashed p-4 mb-3">
                <div className="flex-shrink-0 mb-3">
                    <span className="text-dark fs-5 fw-bolder">
                        Gestion des cotisations personnelles uniquement pour les années antérieures
                        à <span className="text-gray-600 fs-5  me-2">2012-2013.</span>
                    </span>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table align-middle fs-9 gy-2 no-footer">
                    <thead>
                        <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                            {headers.slice(0, columnsCount).map((Header, i) => (
                                <Header key={i} />
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-bold">
                        {data?.subscriptionFees?.map((e) => (
                            <DTRow data={e} key={e.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SubscriptionFees;
