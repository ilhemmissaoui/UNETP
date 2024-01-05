import React from 'react';

import { FormatPrice } from '../../../../../utils/currency';
const Row = ({ data }) => {
    return (
        <>
            <div className="row">
                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">personnelle</div>
                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">
                    {`${data?.entity?.civility?.abbreviation} ${data?.entity?.firstName} ${data?.entity?.lastName} `}
                </div>
                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">
                    <FormatPrice value={data?.amount || 0} />
                </div>
            </div>
        </>
    );
};
export default Row;
