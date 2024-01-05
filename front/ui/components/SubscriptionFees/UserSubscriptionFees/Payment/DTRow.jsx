import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FormatPrice } from '../../../../utils/currency';
import { Ability } from '../../../GUARDS';
import View from '../../../Modals/ViewCore';
import ViewRow from './ViewRow';
const DTRow = ({ data }) => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    const totalPaid = data?.reduce((pv, cv) => pv + parseFloat(cv?.amount || 0), 0);
    return (
        <>
            <tr key={data?.id} className="align-middle text-center fs-8 text-gray-800">
                <td>
                    <span className="text-gray-700  badge badge-light">
                        {data[0]?.subscriptionFeesPaymentRef?.depositDate}
                    </span>
                </td>
                <td>
                    <span className="text-gray-700  badge badge-light">
                        {data[0]?.subscriptionFeesPaymentRef?.cashedDate}
                    </span>
                </td>
                <td>
                    <span className="text-gray-700 ">
                        {data[0]?.subscriptionFeesPaymentRef?.paimentType}
                    </span>
                </td>
                <td>
                    <span className="text-gray-700">
                        {data[0]?.subscriptionFeesPaymentRef?.reference}
                    </span>
                </td>
                <td>
                    <span className="text-gray-700">
                        {' '}
                        <FormatPrice value={totalPaid} />
                    </span>
                </td>
                <td>
                    <div className="btn-group">
                        <Ability I="view" an="establishment">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Visualiser</Tooltip>}>
                                <button
                                    className="btn btn-secondary btn-sm btn-icon"
                                    onClick={toggleIsView}
                                    type="button">
                                    <i className="fa fa-eye"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>
                    </div>
                </td>
            </tr>
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                label="Paiment"
                size={'lg'}
                loading={false}
                data={data}>
                <ViewRow data={data} />
            </View>{' '}
        </>
    );
};

export default DTRow;
