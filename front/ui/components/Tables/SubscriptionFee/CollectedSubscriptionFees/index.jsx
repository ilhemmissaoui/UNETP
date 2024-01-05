import React from 'react';

import useCRUD from '../../../../../hooks/use-crud';
import Searchbar from '../../../CRUD/Searchbar';
import SortableField from '../../../CRUD/SortableField';
import NoResultFoundRow from '../../../NoResultFoundRow/index';
import Pagination from '../../../Pagination';
import DTRow from './DTRow';
import Loader from './Loader';
const CollectedSubscriptionFees = ({ withHeader = true, withBody = true, withFooter = true }) => {
    const {
        page,
        first,
        offset,
        currentPage,
        handlePage,
        search,
        loading,
        sort,
        handleSort,
        handleSearch
    } = useCRUD({
        singleName: 'yearly-receipt',
        pluralName: 'yearly-receipts',
        prefix: 'subscription-fees',
        defaultSort: { field: 'year', direction: 'DESC' },
        filters: {}
    });
    const onSearch = ({ target: { value } }) => handleSearch(value);

    return (
        <>
            <div className="card">
                {withHeader && (
                    <div className="card-header">
                        <div className="card-title">
                            <Searchbar value={search} onChange={onSearch} />
                        </div>
                    </div>
                )}
                {withBody && (
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr className="ftext-start text-muted fw-bolder fs-7 text-uppercase gs-0 text-center">
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="year">
                                            Année
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="paimentEtabs">
                                            Paiements des établissements(validés)
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="fixedPart">
                                            Dont part fixe de
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="total">
                                            Total
                                        </SortableField>
                                    </tr>
                                </thead>
                                {!loading && !page?.nodes?.length ? (
                                    <NoResultFoundRow colSpan={4} />
                                ) : loading ? (
                                    <Loader />
                                ) : (
                                    <tbody className="text-gray-600 fw-bold">
                                        {page?.nodes?.map((e) => (
                                            <DTRow data={e} key={e.id} />
                                        ))}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                )}
                {withFooter && (
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
            </div>
        </>
    );
};

export default CollectedSubscriptionFees;
