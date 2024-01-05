import React from 'react';

import useCRUD, { CRUDProvider } from '../../../hooks/use-crud';
import Searchbar from '../CRUD/Searchbar';
import SortableField from '../CRUD/SortableField';
import EmptyState from '../EmptyState';
import NoResultFoundRow from '../NoResultFoundRow/index';
import Pagination from '../Pagination';
import DTRow from './DTRow';
import Loader from './Loader';

const Requests = ({
    withHeader = true,
    withBody = true,
    withFooter = true,
    rowComponent: Row = DTRow
}) => {
    const crud = useCRUD({
        singleName: 'request',
        pluralName: 'requests',
        prefix: 'request-change'
    });

    const {
        page,
        first,
        offset,
        currentPage,
        handlePage,
        handleSearch,
        search,
        sort,
        handleSort,
        isTouched,

        loading
    } = crud;
    const onSearch = ({ target: { value } }) => handleSearch(value);

    return !loading && !isTouched && !page?.nodes?.length ? (
        <EmptyState />
    ) : (
        <div className="card">
            <CRUDProvider {...crud}>
                {withHeader && (
                    <div className="card-header border-0 pt-6">
                        <div className="card-toolbar">
                            <Searchbar value={search} onChange={onSearch} />
                        </div>
                    </div>
                )}
                {withBody && (
                    <div className="card-body py-0">
                        <div className="table-responsive">
                            <table className="table align-middle table-row-dashed fs-6  no-footer">
                                <thead>
                                    <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0 text-center">
                                        <th>Auteur</th>
                                        <th>Ètablissement</th>
                                        <th>Commentaire</th>

                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="createdAt">
                                            Date
                                        </SortableField>
                                        <th className="text-center">
                                            <i className="fa fa-bolt"></i>
                                        </th>
                                    </tr>
                                </thead>

                                {!loading && !page?.nodes?.length ? (
                                    <NoResultFoundRow colSpan={5} />
                                ) : loading ? (
                                    <Loader />
                                ) : (
                                    <tbody className="text-gray-600 fw-bold">
                                        {page?.nodes?.map((e) => (
                                            <Row data={e} key={e._id} />
                                        ))}
                                    </tbody>
                                )}
                            </table>
                        </div>
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
            </CRUDProvider>
        </div>
    );
};

export default Requests;
