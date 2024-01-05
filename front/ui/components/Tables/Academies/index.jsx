import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useCRUD, { CRUDProvider } from '../../../../hooks/use-crud';
import academySchema from '../../../../schemas/academySchema';
import Searchbar from '../../CRUD/Searchbar';
import SortableField from '../../CRUD/SortableField';
import EmptyState from '../../EmptyState';
import { Ability } from '../../GUARDS';
import Add from '../../Modals/Add';
import NoResultFoundRow from '../../NoResultFoundRow';
import Pagination from '../../Pagination';
import DTRow from './DTRow';
import Form from './Form';
import Loader from './Loader';

const Academies = ({ withHeader = true, withBody = true, withFooter = true }) => {
    const addForm = useForm({
        resolver: yupResolver(academySchema)
    });
    const crud = useCRUD({
        singleName: 'academy',
        pluralName: 'academies'
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
        handleSort
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
        <>
            <CRUDProvider {...crud}>
                {withHeader && (
                    <div className="card-header border-0 pt-6">
                        <div className="card-toolbar">
                            <Searchbar value={search} onChange={onSearch} />
                        </div>

                        <div className="card-toolbar">
                            <Ability I="create" an="academy">
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={toggleIsAdd}>
                                    {' '}
                                    <i className="fa fa-plus"></i>
                                    Création{' '}
                                </button>
                            </Ability>
                        </div>
                    </div>
                )}

                {withBody && (
                    <div className="card-body py-0">
                        <div className="table-responsive">
                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr className="ftext-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="name">
                                            Nom
                                        </SortableField>
                                        <th className="text-center">
                                            <i className="fa fa-bolt"></i>
                                        </th>
                                    </tr>
                                </thead>

                                {!loading && !page?.nodes?.length ? (
                                    <NoResultFoundRow colSpan={2} />
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
                <FormProvider {...addForm}>
                    <Add
                        isShow={isAdd}
                        toggleShow={toggleIsAdd}
                        label="Academie"
                        formId="add-academy"
                        collectionLabelPrefix="d'une"
                        collectionLabel="Académie"
                        size="lg"
                        doReset={false}>
                        <form id="add-academy">
                            <Form />
                        </form>
                    </Add>
                </FormProvider>
            </CRUDProvider>
        </>
    );
};

export default Academies;
