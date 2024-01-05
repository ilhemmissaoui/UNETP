import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Collapse from 'react-bootstrap/Collapse';
import { useForm } from 'react-hook-form';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';
import useToast from '../../../../../hooks/use-toast';
import { accountantSchema, archiveOptions } from '../../../../../schemas/advancedSearchSchema';
import SortableField from '../../../CRUD/SortableField';
import EmptyState from '../../../EmptyState/index';
import Pagination from '../../../Pagination';
import DTRow from '../../../Users/DTRow';

const Accountants = () => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(accountantSchema),
        defaultValues: {
            isArchived: 'without'
        }
    });
    const crud = useCRUD({
        singleName: 'user',
        pluralName: 'users',
        lazy: true,
        filters: { functionLabel: 152 }
    });

    const { page, first, offset, currentPage, handlePage, sort, handleSort, loading, refetch } =
        crud;

    const { setToast } = useToast();
    const submit = async ({ name, isArchived }) => {
        try {
            await refetch(
                {
                    offset,
                    first,
                    sortBy: 'id',
                    sortOrder: 'Desc',
                    filters: { isArchived, functionLabel: 152 },
                    search: name
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
            <CRUDProvider {...crud}>
                <form onSubmit={handleSubmit(submit)} id="search">
                    <div className="row mb-5 py-5">
                        <div className="col-md-6 form-group">
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
                        <div className="col-md-6 form-group">
                            <label htmlFor="isArchived" className="form-label">
                                Archives :
                            </label>
                            <select
                                name="isArchived"
                                {...register('isArchived')}
                                className="form-select">
                                {Object.entries(archiveOptions)?.map((e) => (
                                    <option value={e[0]} key={e[0]}>
                                        {e[1]}
                                    </option>
                                ))}
                            </select>
                        </div>
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

                                    <tbody className="text-gray-600 fw-bold">
                                        {page?.nodes?.map((e) => (
                                            <DTRow data={e} key={e._id} />
                                        ))}
                                    </tbody>
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
            </CRUDProvider>
        </>
    );
};

export default Accountants;
