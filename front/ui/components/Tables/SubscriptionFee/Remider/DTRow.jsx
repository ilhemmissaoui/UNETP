import React from 'react';

const DTRow = ({ data }) => {
    const coordinates = data?.organization?.coordinates.find((e) => e.isDefault);

    return (
        <>
            <tr className="align-middle text-center">
                <td>
                    <span className="text-dark  text-hover mb-1 fs-7">
                        {data?.organization?.name}
                    </span>
                </td>
                <td>
                    {!!coordinates?.email?.length && (
                        <div className="row mb-7">
                            <div className="col-lg-8 fv-row">
                                <span className="fw-bold text-gray-800 fs-6">
                                    {coordinates?.email}
                                </span>
                            </div>
                        </div>
                    )}
                </td>
            </tr>
        </>
    );
};

export default DTRow;
