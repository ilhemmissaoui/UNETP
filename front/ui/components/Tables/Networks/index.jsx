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

const NetworksList = ({
    withHeader = true,
    withBody = true,
    withFooter = true,
    rowComponent: Row = DTRow
}) => {
    const crud = useCRUD({
        singleName: 'network',
        pluralName: 'networks'
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
        refetch,
        loading
    } = crud;

    const _delete = async (id) => {
        console.log({ id });
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

    const onSearch = ({ target: { value } }) => handleSearch(value);
    return !loading && !isTouched && !page?.nodes?.length ? (
        <EmptyState action="/reseaux/nouveau" />
    ) : (
        <div className="card">
            <CRUDProvider {...crud}>
                {withHeader && (
                    <div className="card-header border-0 pt-6">
                        <div className="card-toolbar">
                            <Searchbar value={search} onChange={onSearch} />
                        </div>
                        <div className="card-toolbar">
                            <Ability I="create" an="network">
                                <Link href="/reseaux/nouveau">
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
                            <table className="table align-middle table-row-dashed fs-6 no-footer">
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
                                            name="organization.createdAt">
                                            Date de création
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
                                    <NoResultFoundRow colSpan={3} />
                                ) : loading ? (
                                    <Loader />
                                ) : (
                                    <CRUDProvider _delete={_delete}>
                                        <tbody className="text-gray-600 fw-bold">
                                            {page?.nodes?.map((e) => (
                                                <Row data={e} key={e._id} />
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

export default NetworksList;
