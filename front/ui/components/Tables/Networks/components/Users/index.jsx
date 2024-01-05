import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import useFakePagination from '../../../../../../hooks/use-fake-pagination';
import Pagination from '../../../../Pagination';
import DTRow from './DTRow';

const headers = [
    () => <th className="min-w-50px">Personne</th>,
    () => <th className="min-w-50px">Libellé</th>
];
const Users = ({ data, columnsCount = 2, Row = DTRow }) => {
    const [isLoading, setIsLoading] = useState(true);

    let users = data?.organization?.functions;

    const { page, handlePage, first, offset, currentPage, loading } = useFakePagination({
        data: users,
        first: 8
    });

    useEffect(() => {
        setIsLoading(false);
    }, [data]);

    return (
        <>
            <div className="table-responsive">
                {isLoading ? (
                    <div className="d-flex w-100 justify-content-center my-20">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <table className="table align-middle fs-9 gy-2 no-footer">
                        <thead>
                            <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                                {headers.slice(0, columnsCount).map((Header, i) => (
                                    <Header key={i} />
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 fw-bold">
                            {page?.nodes.map((e) => (
                                <Row data={e} key={e.id} />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {!page?.nodes?.length ? (
                <div />
            ) : (
                <div className="card-footer">
                    <Pagination
                        totalSize={page?.pageInfo?.totalCount}
                        sizePerPage={first}
                        offset={offset}
                        itemsCount={page?.nodes?.length}
                        page={currentPage}
                        onPageChange={handlePage}
                        isLoading={loading}
                    />
                </div>
            )}
        </>
    );
};

export default Users;
