import React from 'react';

import useCRUD from '../../../../../hooks/use-crud';
import Searchbar from '../../../CRUD/Searchbar';
import SortableField from '../../../CRUD/SortableField';
import NoResultFoundRow from '../../../NoResultFoundRow/index';
import Pagination from '../../../Pagination';
import DTRow from './DTRow';
import Loader from './Loader';
const AnnualSubscriptionFees = ({ withHeader = true, withBody = true, withFooter = true }) => {
    const {
        page,
        first,
        offset,
        currentPage,
        handlePage,
        loading,
        sort,
        search,
        handleSearch,
        handleSort
    } = useCRUD({
        singleName: 'yearly-previsioned',
        pluralName: 'yearly-previsioneds',
        prefix: 'subscription-fees',
        filters: {},
        defaultSort: {
            field: 'year',
            direction: 'DESC'
        }
    });
    const onSearch = ({ target: { value } }) => handleSearch(value);

    return (
        <>
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
                                        <tr className="ftext-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                            <SortableField
                                                sortState={sort}
                                                onChange={handleSort}
                                                name="year">
                                                Année
                                            </SortableField>
                                            <SortableField
                                                sortState={sort}
                                                onChange={handleSort}
                                                name="fixedPart">
                                                Part fixe
                                            </SortableField>
                                            <SortableField
                                                sortState={sort}
                                                onChange={handleSort}
                                                name="countLTP">
                                                Somme LTP
                                            </SortableField>
                                            <SortableField
                                                sortState={sort}
                                                onChange={handleSort}
                                                name="totalLTP">
                                                Calcul LTP
                                            </SortableField>
                                            <SortableField
                                                sortState={sort}
                                                onChange={handleSort}
                                                name="countHC">
                                                Somme HC
                                            </SortableField>
                                            <SortableField
                                                sortState={sort}
                                                onChange={handleSort}
                                                name="totalHC">
                                                Calcul HC
                                            </SortableField>
                                            <SortableField
                                                sortState={sort}
                                                onChange={handleSort}
                                                name="countApprentice">
                                                Somme apprentis
                                            </SortableField>
                                            <SortableField
                                                sortState={sort}
                                                onChange={handleSort}
                                                name="totalApprentice">
                                                Calcul apprentis
                                            </SortableField>
                                            <SortableField
                                                sortState={sort}
                                                onChange={handleSort}
                                                name="countTraineeHours">
                                                Nb. Heures Stagiaires
                                            </SortableField>
                                            <SortableField
                                                sortState={sort}
                                                onChange={handleSort}
                                                name="totalCFC">
                                                Calcul CFC
                                            </SortableField>
                                        </tr>
                                    </thead>
                                    {!loading && !page?.nodes?.length ? (
                                        <NoResultFoundRow colSpan={10} />
                                    ) : loading ? (
                                        <Loader />
                                    ) : (
                                        <tbody className="text-gray-600 fw-bold">
                                            {page?.nodes?.map((e) => (
                                                <DTRow data={e} key={e._id} />
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
        </>
    );
};

export default AnnualSubscriptionFees;
