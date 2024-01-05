import moment from 'moment';
import React from 'react';

import DTRow from './DTRow';

const headers = [
    () => <th className="min-w-50px">Email</th>,
    () => <th className="min-w-50px">Téléphone</th>,
    () => <th className="min-w-50px">Adresse</th>,
    () => <th className="min-w-50px">Fax</th>
];

const GlobalInfo = ({ data, rowComponent: Row = DTRow, columnsCount = 6 }) => {
    return (
        <>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="flex-shrink-0">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                        Réseau :
                    </span>
                    <span className="text-dark fs-1 fw-bolder">{data?.organization?.name}</span>{' '}
                    <div className="row mb-7">
                        <span className="text-gray-600 fs-5 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                            Date de création :{' '}
                            <span className="fw-bold fs-7 text-gray-600">
                                {moment(data?.createdAt).format('DD/MM/YYYY HH:mm')}
                            </span>{' '}
                        </span>
                    </div>
                </div>
            </div>
            <div className="separator my-5" />

            {data?.organization?.description.length ? (
                <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                    <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                        <div className="fw-bold">
                            <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                                Description :{' '}
                            </span>
                            <div className="fs-5 text-gray-900 py-3">
                                {' '}
                                {data?.organization?.description}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            <div className="separator my-9" />
            <div className="form-group  mb-3">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                    Réseau Biotechnologies :{' '}
                </span>
            </div>
            <div className="table-responsive">
                <table className="table align-middle fs-9 gy-2 no-footer">
                    <thead>
                        <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                            {headers.slice(0, columnsCount).map((Header, i) => (
                                <Header key={i} />
                            ))}
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 fw-bold text-center">
                        {data?.organization?.coordinates?.map((e) => (
                            <Row data={e} key={e._id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GlobalInfo;
