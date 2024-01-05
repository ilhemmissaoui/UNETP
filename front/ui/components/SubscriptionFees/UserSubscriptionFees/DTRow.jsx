import clsx from 'clsx';
import React from 'react';

import { useMultiCRUDContext } from '../../../../hooks/use-crud';
import { FormatPrice } from '../../../utils/currency';
const colorByStatus = {
    'Solde initial': 'bg-danger ',
    'Solde partiel': 'bg-warning',
    'Solde négatif (trop perçu)': 'bg-primary',
    Soldé: 'Soldé bg-success',
    Validé: 'bg-success'
};
const DTRow = ({ data, i }) => {
    const { establishmentSubscriptionFees } = useMultiCRUDContext();
    return (
        <>
            <tr key={data?.id} className="align-middle text-center fs-6 fw-bolder text-gray-700">
                <td>
                    {data?.user ? (
                        `${data?.user?.civility?.abbreviation} ${data?.user?.firstName} ${data?.user?.lastName} `
                    ) : (
                        <>
                            {' '}
                            {data?.organization?.name}
                            <span className="badge badge-primary mx-1">
                                {data?.organization?.establishment?.establishmentKey}
                            </span>{' '}
                        </>
                    )}
                </td>
                <td>
                    {data?.user?.id
                        ? establishmentSubscriptionFees[i]?.unionSubscriptionFee?.label || 'UNETP'
                        : null}
                </td>
                <td>
                    <FormatPrice
                        value={data?.customAmount ? data?.customAmount : data?.calculatedAmount}
                    />
                </td>
                <td>
                    <FormatPrice
                        value={
                            parseFloat(
                                data?.customAmount
                                    ? data?.customAmount
                                    : data?.calculatedAmount || 0
                            ) -
                            data?.subscriptionPayments?.reduce(
                                (pv, cv) => pv + parseFloat(cv?.amount || 0),
                                0
                            )
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
