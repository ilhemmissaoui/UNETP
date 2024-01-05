import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { FormProvider, useForm } from 'react-hook-form';

import useCRUD, { CRUDProvider } from '../../../../hooks/use-crud';
import useToast from '../../../../hooks/use-toast';
import diplomasSchema from '../../../../schemas/diplomasSchema';
import Searchbar from '../../CRUD/Searchbar';
import SortableField from '../../CRUD/SortableField';
import EmptyState from '../../EmptyState';
import { Ability } from '../../GUARDS';
import NoResultFoundRow from '../../NoResultFoundRow';
import Pagination from '../../Pagination';
import { FilterDropdownButton } from '../../Utils/RBButtons';
import Filters from './components/Filters';
import DTRow from './DTRow';
import Form from './Form';
import Loader from './Loader';

const Diploma = ({
    withHeader = true,
    withBody = true,
    withFooter = true,
    rowComponent: Row = DTRow
}) => {
    const [isAdd, setIsAdd] = useState(false);

    const toggleIsAdd = () => {
        reset();
        setIsAdd((v) => !v);
    };
    const addForm = useForm({
        resolver: yupResolver(diplomasSchema)
    });

    const { handleSubmit, reset } = addForm;
    const crud = useCRUD({
        singleName: 'diploma',
        pluralName: 'diplomas'
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
        loading,
        isFiltersTouched
    } = crud;
    const [bulkSelected, setBulkSelected] = useState([]);
    const { setToast } = useToast();
    const toggleCheck = (_id) => () =>
        setBulkSelected((v) => (v?.includes(_id) ? v.filter((e) => e !== _id) : [...v, _id]));

    const onSearch = ({ target: { value } }) => handleSearch(value);

    const { add } = useCRUD({
        singleName: 'diloma',
        pluralName: 'diplomas'
    });

    const submitAdd = async (data) => {
        try {
            await add(data);
            setToast({
                message: 'Diplôme ajouté avec succès',
                variant: 'success'
            });
            toggleIsAdd();
            reset();
        } catch (e) {
            setToast({ message: `Erreur lors de l'ajout du diplôme`, variant: 'danger' });
        }
    };
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
                            <Ability I="create" an="diploma">
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

                            <Modal show={isAdd} onHide={toggleIsAdd} size="xl">
                                <Modal.Header>
                                    <Modal.Title as="h2">Création d&apos;un diplôme</Modal.Title>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={toggleIsAdd}
                                    />
                                </Modal.Header>
                                <Modal.Body scrollable={true}>
                                    <form id="add-diploma" onSubmit={handleSubmit(submitAdd)}>
                                        <FormProvider {...addForm}>
                                            <Form />
                                        </FormProvider>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="d-flex w-100 justify-content-between">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={toggleIsAdd}
                                            type="button">
                                            <i className="far fa-times-circle fs-4 me-2" />
                                            Annuler
                                        </button>
                                        <button
                                            className="btn btn-success"
                                            type="submit"
                                            form="add-diploma">
                                            <span
                                                className={clsx('indicator-label', {
                                                    'd-none': false
                                                })}>
                                                <i className="far fa-check-circle fs-4 me-2" />
                                                Confirmer
                                            </span>

                                            <span
                                                className={clsx('indicator-progress', {
                                                    'd-block': false
                                                })}>
                                                Please wait...
                                                <span className="spinner-border spinner-border-sm align-middle ms-2" />
                                            </span>
                                        </button>
                                    </div>
                                </Modal.Footer>
                            </Modal>
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
                                            name="name">
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
                                            name="diplomaGradeId">
                                            Niveau
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="diplomaSpecialtyId">
                                            Spécialité
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="diplomaDomainId">
                                            Domaine
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="diplomaGroupId">
                                            Groupe
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="diplomaSubGroupId">
                                            Sous Groupe
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="diplomaTypeId">
                                            Type
                                        </SortableField>

                                        <th className="text-center">
                                            <i className="fa fa-bolt"></i>
                                        </th>
                                    </tr>
                                </thead>

                                {!loading && !page?.nodes?.length ? (
                                    <NoResultFoundRow colSpan={9} />
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

export default Diploma;
