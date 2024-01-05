import Link from 'next/link';
import React from 'react';

import useCRUD, { CRUDProvider } from '../../../../hooks/use-crud';
import Searchbar from '../../CRUD/Searchbar';
import SortableField from '../../CRUD/SortableField';
import EmptyState from '../../EmptyState';
import { Ability } from '../../GUARDS';
import NoResultFoundRow from '../../NoResultFoundRow';
import Pagination from '../../Pagination';
import DTRow from './DTRow';
import Loader from './Loader';

const Delegations = ({
    withHeader = true,
    withBody = true,
    withFooter = true,
    rowComponent: Row = DTRow
}) => {
    const crud = useCRUD({
        singleName: 'delegation',
        pluralName: 'delegations'
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
        refetch,
        handleSort,
        isTouched,
        loading
    } = crud;
    const onSearch = ({ target: { value } }) => handleSearch(value);

    const _delete = async (id) => {
        crud._delete(id);
        await refetch(
            {
                first,
                search,
                offset: 0,
                sortBy: sort.field,
                sortOrder: sort.direction
            },
            true
        );
    };

    return !loading && !isTouched && !page?.nodes?.length ? (
        <EmptyState action="/delegations-regionales/nouveau" />
    ) : (
        <div className="card">
            <CRUDProvider {...crud}>
                {withHeader && (
                    <div className="card-header border-0 pt-6">
                        <div className="card-toolbar">
                            <Searchbar value={search} onChange={onSearch} />
                        </div>
                        <div className="card-toolbar">
                            <Ability I="create" an="delegation">
                                <Link href="/delegations-regionales/nouveau" passHref>
                                    <a className="btn btn-primary btn-sm me-2">
                                        {' '}
                                        <i className="fa fa-plus"></i>
                                        Création{' '}
                                    </a>
                                </Link>
                            </Ability>
                        </div>
                    </div>
                )}
                {withBody && (
                    <div className="card-body py-0">
                        <div className="table-responsive">
                            <table className="table align-middle table-row-dashed fs-6  no-footer">
                                <thead>
                                    <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="organization.name">
                                            Nom
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="reference">
                                            Référence
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="organization.updatedAt">
                                            Derniére modification
                                        </SortableField>

                                        <th className="text-center">
                                            <i className="fa fa-bolt"></i>
                                        </th>
                                    </tr>
                                </thead>

                                {!loading && !page?.nodes?.length ? (
                                    <NoResultFoundRow colSpan={4} />
                                ) : loading ? (
                                    <Loader />
                                ) : (
                                    <CRUDProvider _delete={_delete}>
                                        <tbody className="text-gray-600 fw-bold">
                                            {page?.nodes?.map((e) => (
                                                <Row data={e} key={e.id} />
                                            ))}
                                        </tbody>
                                    </CRUDProvider>
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

export default Delegations;
