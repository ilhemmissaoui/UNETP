import React from 'react';

import Period from '../../Utils/Period';

const DTRow = ({ data }) => {
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
                    {data?.user && (
                        <span className="text-gray-600 mb-1 fs-8">
                            {` (${data?.user?.civility?.abbreviation} ${data?.user?.firstName} ${data?.user?.lastName})`}
                        </span>
                    )}
                </td>

                <td>
                    <Period {...data} />
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

export default DTRow;
