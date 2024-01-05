import React from 'react';

import { FormatPrice } from '../../../../utils/currency';

function DTRow({ data }) {
    return (
        <tr className="text-center">
            <td>
                <div className="badge badge-secondary fw-bolder">{data?.year} </div>
            </td>
            <td>
                <span className="fw-bold fs-8 text-gray-800">
                    <FormatPrice value={data?.paimentEtabs} />
                </span>
            </td>
            <td>
                <span className="fw-bold fs-8 text-gray-800">
                    <FormatPrice value={data?.fixedPart} />
                </span>
            </td>
            <td>
                <span className="fw-bold fs-8 text-gray-800">
                    <FormatPrice value={data?.total} />
                </span>
            </td>
        </tr>
    );
}

export default DTRow;
