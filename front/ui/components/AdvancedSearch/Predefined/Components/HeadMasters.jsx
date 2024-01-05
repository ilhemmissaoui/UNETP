import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Collapse from 'react-bootstrap/Collapse';
import { useForm } from 'react-hook-form';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';
import useToast from '../../../../../hooks/use-toast';
import { headMasterSchema, role } from '../../../../../schemas/advancedSearchSchema';
import SortableField from '../../../CRUD/SortableField';
import EmptyState from '../../../EmptyState';
import Pagination from '../../../Pagination';
import DTRow from '../../../Users/DTRow';

const HeadMasters = () => {
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(headMasterSchema)
    });
    const {
        offset,
        first,
        loading,
        page,
        search,
        fetch,
        setFilters,
        sort,
        handleSort,
        refetch,
        currentPage,
        handlePage
    } = useCRUD({
        singleName: 'head-master',
        pluralName: 'head-masters',
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
        const { role, startDate, endDate } = watch();
        setFilters({ role, startDate, endDate });

        await fetch();
    };
    const { setToast } = useToast();
    const submit = async ({ role, startDate, endDate }) => {
        try {
            await refetch(
                {
                    filters: { role, startDate, endDate },
                    first,
                    offset,
                    search,
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
            <form onSubmit={handleSubmit(submit)} id="add-headMaster">
                <div className="row mb-5 py-5">
                    <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                            De :
                        </label>
                        <input
                            type="date"
                            className={clsx('form-control', {
                                'is-invalid': errors?.startDate
                            })}
                            {...register('startDate')}
                        />
                        <span className="invalid-feedback">{errors?.startDate?.message}</span>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                            Jusqu&apos;à :
                        </label>

                        <input
                            type="date"
                            className={clsx('form-control', {
                                'is-invalid': errors?.endDate
                            })}
                            {...register('endDate')}
                        />
                        <span className="invalid-feedback">{errors?.endDate?.message}</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="" className="form-label">
                        A un profil :
                    </label>
                    <select
                        name=""
                        id=""
                        className={clsx('form-select', {
                            'is-invalid': errors?.role
                        })}
                        {...register('role')}>
                        {Object.entries(role)?.map((e) => (
                            <option value={e[0]} key={e[0]}>
                                {e[1]}
                            </option>
                        ))}
                        <span className="invalid-feedback">{errors?.role?.message}</span>
                    </select>
                </div>
                <div className=" d-flex justify-content-end">
                    <button
                        className="btn btn-primary d-flex"
                        type="submit"
                        form="add-headMaster"
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

export default HeadMasters;
