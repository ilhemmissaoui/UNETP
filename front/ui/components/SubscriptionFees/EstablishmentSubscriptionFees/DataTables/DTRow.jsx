import clsx from 'clsx';
import React from 'react';

import { FormatPrice } from '../../../../utils/currency';
const colorByStatus = {
    'Solde initial': 'bg-danger',
    'Solde partiel': 'bg-danger',
    'Solde négatif (trop perçu)': 'bg-primary',
    Soldé: 'bg-warning',
    Validé: 'bg-success'
};
const DTRow = ({ data }) => {
    return (
        <>
            <tr key={data?.id} className="align-middle text-center fs-6 fw-bolder text-gray-700">
                <td>
                    {`${data?.user?.civility?.abbreviation} ${data?.user?.firstName} ${data?.user?.lastName}`}
                </td>
                <td>{data?.user?.id ? data?.unionSubscriptionFee?.label || 'UNETP' : null}</td>
                <td>
                    <div className="">
                        <FormatPrice
                            value={data?.customAmount ? data?.customAmount : data?.calculatedAmount}
                        />{' '}
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
                    <span className={clsx(' badge fs-7 fw-bolder', colorByStatus[data?.status])}>
                        {data?.status}
                    </span>
                </td>
            </tr>
        </>
    );
};

export default DTRow;
