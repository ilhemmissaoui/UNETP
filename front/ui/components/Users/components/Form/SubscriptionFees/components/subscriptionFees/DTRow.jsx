import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';

import { FormatPrice } from '../../../../../../../utils/currency';
import NestedDelete from '../../../../../../Modals/NestedDelete';
const colorByStatus = {
    'Solde initial': 'bg-danger ',
    'Solde partiel': 'bg-danger',
    Validé: 'bg-success'
};
const DTRow = ({ data }) => {
    const [isDelete, setIsDelete] = useState();
    const toggleIsDelete = () => setIsDelete((v) => !v);
    console.log(data.customAmount);
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
                    <span className={clsx(' badge fs-7 fw-bolder', colorByStatus[data?.status])}>
                        {data?.status}
                    </span>
                </td>

                {data?.customAmount ? (
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
                <td className="text-center sm">
                    {data?.id && (
                        <div className="btn-group">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Visualiser</Tooltip>}>
                                <button className="btn btn-secondary btn-sm btn-icon">
                                    <Link href={`/personnes/cotisation/voir/${data.id}`} passHref>
                                        <a type="button">
                                            {' '}
                                            <i className="fa fa-eye"></i>
                                        </a>
                                    </Link>
                                </button>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-delete">Supprimer</Tooltip>}>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-icon btn-sm"
                                    onClick={toggleIsDelete}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </OverlayTrigger>
                        </div>
                    )}
                </td>
            </tr>
            <NestedDelete
                name="subscriptionFee"
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="SubscriptionFees"
                singleName="subscriptionFee">
                <div>
                    Vous pouvez supprimer les cotisations seulement s&apos;il n&apos;existe plus
                    aucune référence de paiement sur celles-ci. La suppression concerne
                    l&apos;ensemble des cotisations visibles au niveau du champ &apos;solde&apos;.
                    Notez que les cotisations personnelles concernant plusieurs établissements
                    seront préservées.
                </div>
            </NestedDelete>
        </>
    );
};

export default DTRow;
