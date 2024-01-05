import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Collapse from 'react-bootstrap/Collapse';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';
import useToast from '../../../../../hooks/use-toast';
import {
    establishmentSchema,
    optionsEstablishmentType,
    statusOptions
} from '../../../../../schemas/advancedSearchSchema';
import SortableField from '../../../CRUD/SortableField';
import EmptyState from '../../../EmptyState';
import Pagination from '../../../Pagination';
import DTRow from '../../../Tables/Establishments/DTRow';

const Establishments = () => {
    const {
        handleSubmit,
        register,
        watch,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(establishmentSchema)
    });
    const {
        offset,
        first,
        loading,
        page,
        fetch,
        setFilters,
        sort,
        handleSort,
        refetch,
        currentPage,
        handlePage
    } = useCRUD({
        singleName: 'establishment',
        pluralName: 'establishments',
        prefix: 'search',
        lazy: true,
        defaultSort: {
            field: 'id',
            direction: 'Desc'
        }
    });
    const crud = useCRUD({
        singleName: 'establishment',
        pluralName: 'establishments'
    });

    const yearsOptions = useCRUD({
        singleName: 'subscription-param',
        pluralName: 'subscription-params',
        pageSize: null,
        defaultSort: {
            field: 'year',
            direction: 'desc'
        }
    });

    const types = watch('types');
    const status = watch('status');
    const year = watch('year');

    const _delete = async (id) => {
        crud._delete(id);
        setFilters({ types, status, year });
        await fetch();
    };

    const { setToast } = useToast();
    const submit = async ({ types, year, status }) => {
        try {
            setFilters({
                types: types?.length ? encodeURIComponent(JSON.stringify(types)) : undefined,
                status: status?.length ? encodeURIComponent(JSON.stringify(status)) : undefined,
                year
            });
            await refetch(
                {
                    filters: {
                        types: types?.length
                            ? encodeURIComponent(JSON.stringify(types))
                            : undefined,
                        status: status?.length
                            ? encodeURIComponent(JSON.stringify(status))
                            : undefined,

                        year
                    },
                    first,
                    offset,

                    sortBy: sort.field,
                    sortOrder: sort.direction
                },
                true
            );
        } catch (e) {
            setToast({
                message: 'Erreur lors de la récupération de la liste des establishments',
                variant: 'danger'
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(submit)} id="search">
                <div className="row">
                    <div className="col-md-6 form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Type :
                        </label>
                        <Controller
                            name="types"
                            control={control}
                            render={({ field }) => (
                                <Select isMulti {...field} options={optionsEstablishmentType} />
                            )}
                        />
                        <span className={clsx('invalid-feedback', { 'd-flex': errors.types })}>
                            {errors?.types?.message}
                        </span>
                    </div>
                    <div className="col-md-6 form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Statut :
                        </label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    isMulti
                                    {...field}
                                    options={statusOptions.map((e) => ({ value: e, label: e }))}
                                />
                            )}
                        />
                        <span className={clsx('invalid-feedback', { 'd-flex': errors.status })}>
                            {errors?.status?.message}
                        </span>
                    </div>
                </div>
                <div className="row mb-5">
                    {!yearsOptions.loading && (
                        <div className="col-md-6 form-group">
                            <label htmlFor="" className="form-label">
                                Année :
                            </label>
                            <select
                                name="year"
                                className={clsx('form-select', {
                                    'is-invalid': errors?.year
                                })}
                                {...register('year')}>
                                {yearsOptions?.page?.nodes.map((e) => {
                                    return (
                                        <option key={e.year} value={e.year}>
                                            {e.year}
                                        </option>
                                    );
                                })}
                            </select>
                            <span className={clsx('invalid-feedback', { 'd-flex': errors.year })}>
                                {errors?.year?.message}
                            </span>
                        </div>
                    )}
                </div>

                <div className=" d-flex justify-content-end">
                    <button
                        className="btn btn-primary d-flex"
                        type="submit"
                        form="search"
                        disabled={loading}>
                        <span>
                            {!loading ? (
                                <span />
                            ) : (
                                <span className="spinner-border spinner-border-sm align-middle me-2 " />
                            )}
                        </span>

                        <span> Rechercher </span>
                    </button>
                </div>
            </form>

            <Collapse mountOnEnter unmountOnExit in={!!page}>
                {!loading && !page?.nodes?.length ? (
                    <EmptyState />
                ) : (
                    <div>
                        <div className="table-responsive">
                            <table className="table align-middle table-row-dashed fs-6  no-footer">
                                <thead>
                                    <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0 text-center">
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

                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="coordinate.city">
                                            statut
                                        </SortableField>

                                        <th className="text-center">
                                            <i className="fa fa-bolt"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <CRUDProvider _delete={_delete}>
                                    <tbody className="text-gray-600 fw-bold">
                                        {page?.nodes?.map((e) => (
                                            <DTRow data={e} key={e.id} />
                                        ))}
                                    </tbody>
                                </CRUDProvider>
                            </table>
                        </div>
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
            </Collapse>
        </>
    );
};

export default Establishments;
