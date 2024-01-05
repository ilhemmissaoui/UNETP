import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import useFakePagination from '../../../../../../hooks/use-fake-pagination';
import Pagination from '../../../../Pagination';
import DTRow from './DTRow';

const headers = [
    () => <th className="min-w-50px">Sujet</th>,
    () => <th className="min-w-50px">Statut</th>,
    () => <th className="min-w-50px">Date d&apos;envoi </th>,
    () => (
        <th className="text-center">
            <i className="fa fa-bolt"></i>
        </th>
    )
];
const List = ({ data, columnsCount = 4 }) => {
    const [isLoading, setIsLoading] = useState(true);

    let history = data?.RelaunchHistories;
    const { page, handlePage, first, offset, currentPage, loading } = useFakePagination({
        data: history,
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
                            <tr className="fw-bolder fs-7 text-gray-800  bg-light text-center">
                                {headers.slice(0, columnsCount).map((Header, i) => (
                                    <Header key={i} />
                                ))}
                            </tr>
                        </thead>

                        <tbody className="text-gray-600 fw-bold text-center">
                            {page?.nodes.map((e) => (
                                <DTRow data={e} key={e._id} />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {!!page?.nodes?.length && (
                <Pagination
                    totalSize={page?.pageInfo?.totalCount}
                    sizePerPage={first}
                    offset={offset}
                    itemsCount={page?.nodes?.length}
                    page={currentPage}
                    onPageChange={handlePage}
                    isLoading={loading}
                />
            )}
        </>
    );
};

export default List;
