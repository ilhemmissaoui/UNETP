import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FormProvider, useForm } from 'react-hook-form';

import useCRUD, { CRUDProvider } from '../../../../hooks/use-crud';
import functionSchema from '../../../../schemas/functionSchema';
import Searchbar from '../../CRUD/Searchbar';
import SortableField from '../../CRUD/SortableField';
import EmptyState from '../../EmptyState';
import { Ability } from '../../GUARDS';
import Add from '../../Modals/Add';
import NoResultFoundRow from '../../NoResultFoundRow';
import Pagination from '../../Pagination';
import { FilterDropdownButton } from '../../Utils/RBButtons';
import Filters from './components/Filters';
import DTRow from './DTRow';
import Form from './Form';
import Loader from './Loader';

const Functions = ({ withHeader = true, withBody = true, withFooter = true }) => {
    const addForm = useForm({
        resolver: yupResolver(functionSchema)
    });
    const crud = useCRUD({
        singleName: 'function-label',
        pluralName: 'function-labels'
    });
    const {
        page,
        first,
        offset,
        currentPage,
        handlePage,
        search,
        handleSearch,
        sort,
        loading,
        isTouched,
        handleSort,
        isFiltersTouched
    } = crud;

    const [isAdd, setIsAdd] = useState();
    const toggleIsAdd = () => {
        setIsAdd((v) => {
            if (v) addForm.reset();
            return !v;
        });
    };
    const onSearch = ({ target: { value } }) => handleSearch(value);

    return !loading && !isTouched && !page?.nodes?.length ? (
        <EmptyState action={toggleIsAdd} />
    ) : (
        <div className="card">
            <CRUDProvider {...crud}>
                {withHeader && (
                    <div className="card-header border-0 pt-6">
                        <div className="card-toolbar">
                            <Searchbar value={search} onChange={onSearch} />
                        </div>
                        <div className="card-toolbar">
                            <Ability I="create" an="function-label">
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={toggleIsAdd}>
                                    <i className="fa fa-plus"></i>
                                    Création
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
                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="singularMaleName">
                                            Fonction
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="organizationType.label">
                                            Type
                                        </SortableField>

                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="singularFemaleName">
                                            Intitulé féminin
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="pluralMaleName">
                                            Intitulé masculin pluriel
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="pluralFemaleName">
                                            Intitulé féminin pluriel
                                        </SortableField>

                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="isHeadMaster">
                                            Assimilé chef d&apos;établissement
                                        </SortableField>

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
                                            <DTRow data={e} key={e.id} />
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

                <FormProvider {...addForm}>
                    <Add
                        size="xl"
                        isShow={isAdd}
                        toggleShow={toggleIsAdd}
                        label="Fonction"
                        formId="add-function"
                        singleName="function"
                        collectionLabelPrefix="d'une"
                        collectionLabel="Fonction"
                        doReset={false}>
                        <form id="add-function">
                            <Form />
                        </form>
                    </Add>
                </FormProvider>
            </CRUDProvider>
        </div>
    );
};

export default Functions;
