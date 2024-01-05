import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';

import useCRUD, { CRUDProvider } from '../../../../hooks/use-crud';
import Searchbar from '../../CRUD/Searchbar';
import SortableField from '../../CRUD/SortableField';
import EmptyState from '../../EmptyState';
import { Ability } from '../../GUARDS';
import NoResultFoundRow from '../../NoResultFoundRow';
import Pagination from '../../Pagination';
import { FilterDropdownButton } from '../../Utils/RBButtons';
import Filters from './components/Filters';
import DTRow from './DTRow';
import Loader from './Loader';

const EstablishmentsList = ({
    withHeader = true,
    withBody = true,
    withFooter = true,
    rowComponent: Row = DTRow
}) => {
    const [bulkSelected, setBulkSelected] = useState([]);

    const toggleCheck = (_id) => () =>
        setBulkSelected((v) => (v?.includes(_id) ? v.filter((e) => e !== _id) : [...v, _id]));

    const crud = useCRUD({
        singleName: 'establishment',
        pluralName: 'establishments',
        filters: {
            isArchived: 0,
            organizationType: '4',
            departmentNumber: ''
        }
    });
    const {
        page,
        first,
        currentPage,
        handlePage,
        handleSearch,
        search,
        loading,
        isTouched,
        sort,
        offset,
        refetch,
        setFilters,
        handleSort,
        _export,
        isFiltersTouched,
        isExporting
    } = crud;
    const handleExport = () => {
        _export({
            title: `Liste des établissements - ${moment().format('DD/MM/YYYY - HH:mm')}.xlsx`
        });
    };
    const _delete = async (id) => {
        crud._delete(id);
        setFilters({ isArchived: 0, organizationType: '4', departmentNumber: '' });
        await refetch(
            {
                filters: {
                    isArchived: 0,
                    organizationType: '4',
                    departmentNumber: ''
                },
                first,
                search,
                offset,
                sortBy: sort.field,
                sortOrder: sort.direction
            },
            true
        );
    };

    const onSearch = ({ target: { value } }) => handleSearch(value);
    return !loading && !isTouched && !page?.nodes?.length ? (
        <EmptyState action="/structures-etablissement/nouveau" />
    ) : (
        <div className="card">
            <CRUDProvider {...crud} _delete={_delete}>
                {withHeader && (
                    <div className="card-header border-0 pt-6">
                        <div className="card-toolbar">
                            <Searchbar value={search} onChange={onSearch} />
                        </div>
                        <div className="card-toolbar">
                            <Ability I="create" an="establishment">
                                <Link href="/structures-etablissement/nouveau" passHref>
                                    <a className="btn btn-primary btn-sm me-2">
                                        {' '}
                                        <i className="fa fa-plus"></i>
                                        Création{' '}
                                    </a>
                                </Link>
                            </Ability>
                            <Ability I="export" an="establishment">
                                <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={handleExport}
                                    disabled={isExporting}>
                                    {isExporting ? (
                                        <Spinner size="sm" animation="border" className="me-1" />
                                    ) : (
                                        <i className="fa fa-file-excel"></i>
                                    )}
                                    Export .xlsx
                                </button>
                            </Ability>
                            <Dropdown>
                                <Dropdown.Toggle
                                    as={FilterDropdownButton}
                                    isTouched={isFiltersTouched}>
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
                            <table className="table align-middle table-row-dashed fs-6  no-footer">
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
                                            name="organization.name">
                                            Nom
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="coordinate.zipCode">
                                            Ville
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="organization.headmaster">
                                            Chef établissement
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="organization.updatedAt">
                                            Derniére modification
                                        </SortableField>
                                        <th className="text-center">Statut</th>

                                        <th className="text-center">
                                            <i className="fa fa-bolt"></i>
                                        </th>
                                    </tr>
                                </thead>
                                {!loading && !page?.nodes?.length ? (
                                    <NoResultFoundRow colSpan={7} />
                                ) : loading ? (
                                    <Loader />
                                ) : (
                                    <tbody className="text-gray-600 fw-bold">
                                        {page?.nodes?.map((e) => (
                                            <Row
                                                data={e}
                                                key={e._id}
                                                checked={bulkSelected?.includes(e._id)}
                                                toggleCheck={toggleCheck(e._id)}
                                            />
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

export default EstablishmentsList;
