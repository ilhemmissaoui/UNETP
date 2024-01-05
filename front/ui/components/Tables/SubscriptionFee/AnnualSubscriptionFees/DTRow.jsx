import React from 'react';

import { FormatPrice } from '../../../../utils/currency';

function DTRow({ data }) {
    return (
        <tr>
            <td>
                <div className="badge badge-secondary fw-bolder">{data?.year} </div>
            </td>

            <td>
                <span className="fw-bold fs-8 text-gray-800">
                    <span className="text-danger">
                        <FormatPrice value={data?.fixedPart} />
                    </span>
                </span>
            </td>
            <td>
                <span className="fw-bold fs-8 text-gray-800">{data?.countLTP}</span>
            </td>
            <td>
                <span className="fw-bold fs-8 text-gray-800">
                    {' '}
                    <span className="text-danger">
                        {' '}
                        <FormatPrice value={data?.totalLTP} />
                    </span>
                </span>
            </td>
            <td>
                <span className="fw-bold fs-8 text-gray-800">{data?.countHC} </span>
            </td>

            <td>
                <span className="fw-bold fs-8 text-gray-800">
                    <span className="text-danger">
                        <FormatPrice value={data?.totalHC} />
                    </span>
                </span>
            </td>
            <td>
                <span className="fw-bold fs-8 text-gray-800">{data?.countApprentice}</span>
            </td>
            <td>
                <span className="fw-bold fs-8 text-gray-800">
                    <span className="text-danger">
                        <FormatPrice value={data?.totalApprentice} />
                    </span>
                </span>
            </td>
            <td>
                <div className="badge badge-success fw-bolder">{data?.countTraineeHours} </div>
            </td>
            <td>
                <span className="fw-bold fs-8 text-gray-800">
                    <span className="text-danger">
                        <FormatPrice value={data?.totalCFC} />
                    </span>
                </span>
            </td>
        </tr>
    );
}

export default DTRow;
