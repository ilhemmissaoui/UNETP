import useFakePagination from '../../../../hooks/use-fake-pagination';
import Pagination from '../../Pagination';
import DTRow from './DTRow';

const headers = [
    () => <th className="min-w-50px">Diplôme</th>,
    () => (
        <th className="min-w-50px">
            <i className="fa fa-bolt"></i>
        </th>
    )
];
const List = ({ data, columnsCount = 2 }) => {
    const { page, handlePage, first, offset, currentPage, loading } = useFakePagination({
        data,
        first: 8
    });

    return (
        <>
            <div className="table-responsive">
                <table className="table align-middle fs-9 gy-2 no-footer">
                    <thead>
                        <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                            {headers.slice(0, columnsCount).map((Header, i) => (
                                <Header key={i} />
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-bold">
                        {page?.nodes?.map((e) => (
                            <DTRow data={e} key={e.id} />
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                totalSize={page?.pageInfo?.totalCount}
                sizePerPage={first}
                offset={offset}
                itemsCount={page?.nodes?.length}
                page={currentPage}
                onPageChange={handlePage}
                isLoading={loading}
            />
        </>
    );
};

export default List;
