import { yupResolver } from '@hookform/resolvers/yup';
import Collapse from 'react-bootstrap/Collapse';
import { useForm } from 'react-hook-form';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';
import useToast from '../../../../../hooks/use-toast';
import { delegateSchema } from '../../../../../schemas/advancedSearchSchema';
import SortableField from '../../../CRUD/SortableField';
import EmptyState from '../../../EmptyState';
import Pagination from '../../../Pagination';
import DTRow from '../../../Users/DTRow';

const Delegates = () => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(delegateSchema),
        defaultValues: {
            excludeDeputy: false
        }
    });
    const {
        offset,
        first,
        loading,
        page,
        fetch,
        sort,
        search,
        refetch,
        handleSort,
        currentPage,
        setFilters,
        handlePage,
        watch
    } = useCRUD({
        singleName: 'delegate',
        pluralName: 'delegates',
        prefix: 'search',
        lazy: true,
        defaultSort: {
            direction: 'Desc',
            field: 'id'
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
    const submit = async ({ excludeDeputy }) => {
        try {
            setFilters({ excludeDeputy });
            await refetch(
                {
                    filters: {
                        excludeDeputy
                    },
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
                message: 'Erreur lors de la récupération de la liste des Délégués',
                variant: 'danger'
            });
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(submit)} id="add-delegation">
                <div className="form-group mb-3 d-flex">
                    <div className="form-check form-check-custom form-check-solid">
                        <input
                            className="form-check-input"
                            id="excludeDeputy"
                            type="checkbox"
                            {...register('excludeDeputy')}
                        />
                    </div>
                    <div className="me-5">
                        <label
                            htmlFor="excludeDeputy"
                            className="fs-6 mx-1 fw-bold form-check-label mb-0">
                            Sans Délégué académique adjoint{' '}
                        </label>
                    </div>
                    <span className="invalid-feedback">{errors?.excludeDeputy?.message}</span>
                </div>
                <div className=" d-flex justify-content-end">
                    <button
                        className="btn btn-primary d-flex"
                        type="submit"
                        form="add-delegation"
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

export default Delegates;
