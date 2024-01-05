import useFakePagination from '../../../../hooks/use-fake-pagination';
import NoResultFoundRow from '../../NoResultFoundRow/index';
import Pagination from '../../Pagination';
import DTRow from './DTRow';
import Loader from './Loader';

const defaultHeaders = [
    () => <th className="min-w-50px">Type</th>,
    () => <th className="min-w-50px">Libellé</th>,
    () => <th className="min-w-50px">Période</th>,
    () => (
        <th className="min-w-50px">
            <i className="fa fa-bolt"></i>
        </th>
    )
];
const List = ({
    withBody = true,
    withFooter = true,
    data,
    columnsCount = 5,
    Row = DTRow,
    headers = defaultHeaders
}) => {
    const { page, handlePage, first, offset, currentPage, loading, isTouched } = useFakePagination({
        data,
        first: 8
    });
    return (
        <>
            {withBody && (
                <div className="table-responsive">
                    <table className="table align-middle fs-9 gy-2 no-footer">
                        <thead>
                            <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                                {headers.slice(0, columnsCount).map((Header, i) => (
                                    <Header key={i} />
                                ))}
                            </tr>
                        </thead>
                        {!loading && !page?.nodes?.length ? (
                            <NoResultFoundRow colSpan={4} />
                        ) : loading ? (
                            <Loader />
                        ) : (
                            <tbody className="text-gray-600 fw-bold">
                                {page?.nodes?.map((e) => (
                                    <Row data={e} key={e.id} />
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            )}
            {isTouched && !page?.nodes?.length
                ? null
                : withFooter && (
                      <div className="card-footer py-3">
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

export default List;
