import { useRouter } from 'next/router';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';
import Searchbar from '../../../CRUD/Searchbar';
import SortableField from '../../../CRUD/SortableField';
import NoResultFoundRow from '../../../NoResultFoundRow/index';
import Pagination from '../../../Pagination';
import { FilterDropdownButton } from '../../../Utils/RBButtons';
import DTRow from './DTRow';
import Filters from './Filters';
import Loader from './Loader';

const EstablishmentSearch = ({ withHeader = true, withBody = true, withFooter = true }) => {
    const { query } = useRouter();
    const crud = useCRUD({
        singleName: 'establishments-yearly',
        pluralName: 'establishments-yearly',
        prefix: 'subscription-fees',
        defaultSort: { field: 'year', direction: 'desc' },
        filters: { year: query?.annee, status: query?.statut, archived: query?.archive }
    });
    const {
        search,
        page,
        first,
        offset,
        currentPage,
        handlePage,
        handleSearch,
        loading,
        isTouched,
        sort,
        handleSort
    } = crud;

    const onSearch = ({ target: { value } }) => handleSearch(value);

    return (
        <>
            <>
                <div className="card">
                    <CRUDProvider {...crud}>
                        {withHeader && (
                            <div className="card-header border-0 pt-6">
                                <div className="card-toolbar">
                                    <Searchbar value={search} onChange={onSearch} />
                                </div>
                                <div className="card-toolbar">
                                    <Dropdown>
                                        <Dropdown.Toggle as={FilterDropdownButton}>
                                            <span className="svg-icon svg-icon-6 svg-icon-muted me-1">
                                                <svg
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>
                                            Filtres
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Filters />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        )}
                        {withBody && (
                            <div className="card-body py-0">
                                <div className="table-responsive">
                                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                        <thead>
                                            <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                                <SortableField
                                                    sortState={sort}
                                                    onChange={handleSort}
                                                    name="establishmentKey">
                                                    Clé
                                                </SortableField>
                                                <SortableField
                                                    sortState={sort}
                                                    onChange={handleSort}
                                                    name="name">
                                                    Structure d&apos;établissement
                                                </SortableField>
                                                <SortableField
                                                    sortState={sort}
                                                    onChange={handleSort}
                                                    name="year">
                                                    Année
                                                </SortableField>

                                                <SortableField
                                                    sortState={sort}
                                                    onChange={handleSort}
                                                    name="lpContractStudentsCount">
                                                    LTP
                                                </SortableField>
                                                <SortableField
                                                    sortState={sort}
                                                    onChange={handleSort}
                                                    name="collegeContractStudentsCount">
                                                    Collège
                                                </SortableField>
                                                <SortableField
                                                    sortState={sort}
                                                    onChange={handleSort}
                                                    name="apprenticesCount">
                                                    Apprentis
                                                </SortableField>
                                                <SortableField
                                                    sortState={sort}
                                                    onChange={handleSort}
                                                    name="hoursCount">
                                                    Heure stage
                                                </SortableField>
                                            </tr>
                                        </thead>
                                        {!loading && !page?.nodes?.length ? (
                                            <NoResultFoundRow colSpan={7} />
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
            </>
        </>
    );
};

export default EstablishmentSearch;
