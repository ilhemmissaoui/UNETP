import React from 'react';

import Period from '../../../Utils/Period';

const ViewRow = ({ data }) => {
    return (
        <>
            <tr className="align-middle text-center">
                <td>
                    <span className="text-dark  text-hover mb-1 fs-7">
                        {data?.historyType?.label}
                    </span>
                </td>
                <td>
                    <span className="text-dark  text-hover mb-1 fs-7">{data?.label}</span>
                </td>
                <td>
                    <div className="badge badge-light fw-bolder">
                        <Period {...data} />
                    </div>
                </td>
                <td>
                    <span className="text-dark  text-hover mb-1 fs-7">
                        {data?.comment?.length ? data?.comment : null}
                    </span>
                </td>
            </tr>
        </>
    );
};

export default ViewRow;
