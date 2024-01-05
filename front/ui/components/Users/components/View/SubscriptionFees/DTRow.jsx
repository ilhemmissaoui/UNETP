import clsx from 'clsx';
import React from 'react';

import { FormatPrice } from '../../../../../utils/currency';
const colorByStatus = {
    'Solde initial': 'bg-danger ',
    'Solde partiel': 'bg-danger',
    'Solde négatif (trop perçu)': 'bg-danger',
    Validé: 'bg-success',
    Soldé: 'bg-success'
};
const DTRow = ({ data }) => {
    return (
        <>
            <tr key={data?.id} className="align-middle text-center fs-8 text-gray-800">
                <td>
                    <div className="position-relative  pe-3 py-2">
                        <div
                            className={clsx(
                                'position-absolute start-0 top-0 w-4px h-100 rounded-2 ',
                                colorByStatus[data?.status]
                            )}
                        />
                        <div className="text-hover-primary fw-bolder text-center fs-6 ">
                            {data?.subscriptionParam?.year}
                        </div>
                    </div>
                </td>
                <td>
                    <span
                        className={clsx(
                            ' badge fs-7 fw-bolder',
                            { 'badge-light-success': data?.status === 'Validé' },
                            { 'badge-light-danger': data?.status === 'Solde partiel' },
                            { 'badge-light-danger': data?.status === 'Solde initial' }
                        )}>
                        {data?.status}
                    </span>
                </td>

                {data?.customAmount != 0 && data?.customAmount !== null ? (
                    <td>
                        <FormatPrice value={data?.customAmount} />
                    </td>
                ) : (
                    <td>
                        <FormatPrice value={data?.calculatedAmount} />
                    </td>
                )}

                <td>
                    <span className="fw-bold fs-6 text-gray-800">
                        {data?.unionSubscriptionFee?.label}
                    </span>
                </td>
            </tr>
        </>
    );
};

export default DTRow;
