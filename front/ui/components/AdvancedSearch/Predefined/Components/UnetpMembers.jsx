import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Collapse from 'react-bootstrap/Collapse';
import { useForm } from 'react-hook-form';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';
import useToast from '../../../../../hooks/use-toast';
import { memberSchema, organism } from '../../../../../schemas/advancedSearchSchema';
import SortableField from '../../../CRUD/SortableField';
import EmptyState from '../../../EmptyState';
import Pagination from '../../../Pagination';
import DTRow from '../../../Users/DTRow';

const UnetpMembers = () => {
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(memberSchema),
        defaultValues: {
            organizationTypeId: 1
        }
    });
    const {
        offset,
        first,
        loading,
        page,
        fetch,
        sort,
        handleSort,
        setFilters,
        refetch,
        currentPage,
        handlePage
    } = useCRUD({
        singleName: 'member',
        pluralName: 'members',
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
        const organizationTypeId = watch('organizationTypeId');
        setFilters({ organizationTypeId });
        await fetch();
    };
    const { setToast } = useToast();
    const submit = async ({ organizationTypeId }) => {
        try {
            setFilters({ organizationTypeId });
            await refetch(
                {
                    filters: {
                        organizationTypeId
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
                message: 'Erreur lors de la récupération de la liste des comptables',
                variant: 'danger'
            });
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(submit)} id="add-member">
                <div className="col-md-6 py-5">
                    <label htmlFor="organizationTypeId" className="form-label">
                        Organisme :
                    </label>
                    <select
                        name="organizationTypeId"
                        id="organizationTypeId"
                        className={clsx('form-select', {
                            'is-invalid': errors?.organism
                        })}
                        {...register('organizationTypeId')}>
                        {Object.entries(organism)?.map((e) => (
                            <option value={e[0]} key={e[0]}>
                                {e[1]}
                            </option>
                        ))}
                        <span className="invalid-feedback">
                            {errors?.organizationTypeId?.message}
                        </span>
                    </select>
                </div>
                <div className=" d-flex justify-content-end">
                    <button
                        className="btn btn-primary d-flex"
                        type="submit"
                        form="add-member"
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
                                            <DTRow data={e} key={e._id} />
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

export default UnetpMembers;
