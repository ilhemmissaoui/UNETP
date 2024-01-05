import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Collapse from 'react-bootstrap/Collapse';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';
import useToast from '../../../../../hooks/use-toast';
import { coordianteLabelOption, userSchema } from '../../../../../schemas/advancedSearchSchema';
import SortableField from '../../../CRUD/SortableField';
import EmptyState from '../../../EmptyState';
import Pagination from '../../../Pagination';
import DTRow from '../../../Users/DTRow';

const Users = () => {
    const {
        handleSubmit,
        register,
        control,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(userSchema)
    });
    const {
        offset,
        first,
        loading,
        page,
        sort,
        search,
        currentPage,
        fetch,
        refetch,
        setFilters,
        handleSort,
        handlePage
    } = useCRUD({
        singleName: 'user',
        pluralName: 'users',
        prefix: 'search',
        lazy: true,
        defaultSort: {
            field: 'id',
            direction: 'Desc'
        }
    });
    const crud = useCRUD({
        singleName: 'user',
        pluralName: 'users',
        lazy: true
    });
    const _delete = async (id) => {
        crud._delete(id);
        const excludeDeputy = watch('excludeDeputy');
        setFilters({ excludeDeputy });
        await fetch();
    };
    const { setToast } = useToast();
    const submit = async ({ labels, name }) => {
        try {
            await refetch(
                {
                    filters: {
                        labels: labels?.length
                            ? encodeURIComponent(JSON.stringify(labels))
                            : undefined,
                        name
                    },
                    first,
                    search,
                    offset,
                    sortBy: sort.field,
                    sortOrder: sort.direction
                },
                true
            );
        } catch (e) {
            setToast({
                message: 'Erreur lors de la récupération de la liste des Personnes',
                variant: 'danger'
            });
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(submit)} id="add-user">
                <div className="row mb-5 py-5">
                    <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                            Nom :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.name
                            })}
                            {...register('name')}
                        />
                        <span className="invalid-feedback">{errors?.name?.message}</span>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                            Statut Email :
                        </label>
                        <Controller
                            name="labels"
                            control={control}
                            render={({ field }) => (
                                <Select isMulti {...field} options={coordianteLabelOption} />
                            )}
                        />
                        <span className="invalid-feedback">{errors?.labels?.message}</span>
                    </div>
                </div>
                <div className=" d-flex justify-content-end py-5">
                    <button
                        className="btn btn-primary d-flex"
                        type="submit"
                        form="add-user"
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
                        <table className="table align-middle table-row-dashed fs-6  no-footer">
                            <thead>
                                <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0 text-center">
                                    <SortableField
                                        sortState={sort}
                                        onChange={handleSort}
                                        name="lastName">
                                        Nom
                                    </SortableField>
                                    <SortableField
                                        sortState={sort}
                                        onChange={handleSort}
                                        name="department.departmentCode">
                                        N° de Département
                                    </SortableField>
                                    <SortableField
                                        sortState={sort}
                                        onChange={handleSort}
                                        name="coordinate.city">
                                        ville
                                    </SortableField>

                                    <SortableField
                                        sortState={sort}
                                        onChange={handleSort}
                                        name="updatedAt">
                                        Dernière modification
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

export default Users;
