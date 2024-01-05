import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import Bloc from '../../../Establishments/SubscriptionFees/components/Bloc';
const colorByStatus = {
    'Solde initial': 'bg-danger ',
    'Solde partiel': 'bg-danger',
    'Solde négatif (trop perçu)': 'bg-danger',
    Validé: 'bg-success',
    Soldé: 'bg-success'
};
const DTRow = ({ data, establishmentKey, capacityHistories }) => {
    console.log(data);
    return (
        <>
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
                            className={clsx(' badge fs-7 fw-bolder', colorByStatus[data?.status])}>
                            {data?.status}
                        </span>
                    </td>
                    <td className="text-start">
                        {data && (
                            <Bloc
                                capacityHistory={capacityHistories?.find(
                                    (a) => a.year === data.subscriptionParam?.year
                                )}
                                data={data}
                                type={parseInt(`${establishmentKey}`.split('').pop())}
                            />
                        )}
                    </td>
                    <td className="text-center sm">
                        {data?.id && (
                            <div className="btn-group">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-edit">Gérer</Tooltip>}>
                                    <Link
                                        data={data}
                                        href={`/structures-etablissement/modifier/cotisation/${data.id}`}
                                        passHref>
                                        <a
                                            type="button"
                                            className="btn btn-primary btn-icon btn-sm">
                                            <i className="fa fa-edit"></i>
                                        </a>
                                    </Link>
                                </OverlayTrigger>
                            </div>
                        )}
                    </td>
                </tr>
            </>
        </>
    );
};

export default DTRow;
