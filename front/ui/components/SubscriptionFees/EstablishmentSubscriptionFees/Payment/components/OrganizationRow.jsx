import React from 'react';

import { FormatPrice } from '../../../../../utils/currency';
const Row = ({ data }) => {
    return (
        <>
            <div className="row">
                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">établissement</div>
                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">
                    {data?.entity?.name}{' '}
                    <span className="fw-bolder fs-7 badge badge-primary">
                        {data?.entity?.establishment?.establishmentKey}
                    </span>
                </div>
                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">
                    <FormatPrice value={data?.amount || 0} />
                </div>
            </div>
        </>
    );
};
export default Row;
