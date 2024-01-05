import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Collapse from 'react-bootstrap/Collapse';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';
import useToast from '../../../../../hooks/use-toast';
import { coordianteLabelOption, groupSchema } from '../../../../../schemas/advancedSearchSchema';
import SortableField from '../../../CRUD/SortableField';
import EmptyState from '../../../EmptyState';
import Pagination from '../../../Pagination';
import DTRow from './DTRows/MultiOrganizationDTRow';

const Groups = () => {
    const {
        handleSubmit,
        watch,
        register,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(groupSchema)
    });
    const {
        offset,
        first,
        loading,
        page,
        sort,
        search,
        handleSort,
        fetch,
        refetch,
        setFilters,
        currentPage,
        handlePage
    } = useCRUD({
        singleName: 'group',
        pluralName: 'groups',
        prefix: 'search',
        lazy: true,
        defaultSort: {
            direction: 'Desc',
            field: 'id'
        }
    });
    const { setToast } = useToast();
    const submit = async ({ labels, name }) => {
        try {
            await refetch(
                {
                    first,
                    offset,
                    search,
                    sortBy: sort.field,
                    sortOrder: sort.direction,
                    filters: {
                        labels: labels?.length
                            ? encodeURIComponent(JSON.stringify(labels))
                            : undefined,
                        name: name.length ? encodeURIComponent(name) : undefined
                    }
                },
                true
            );
        } catch (e) {
            setToast({
                message: 'Erreur lors de la récupération de la liste des organizations',
                variant: 'danger'
            });
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(submit)} id="add-group">
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
                        <span className={clsx('invalid-feedback', { 'd-flex': errors.labels })}>
                            {errors?.labels?.message}
                        </span>
                    </div>
                </div>
                <div className=" d-flex justify-content-end">
                    <button
                        className="btn btn-primary d-flex"
                        type="submit"
                        form="add-group"
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
                                    <tr className="text-muted fw-bolder fs-7 text-uppercase gs-0 text-center">
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="name">
                                            Nom
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="updatedAt">
                                            Derniére modification
                                        </SortableField>
                                        <th className="text-center">
                                            <i className="fa fa-bolt"></i>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-600 fw-bold">
                                    <CRUDProvider
                                        watch={watch}
                                        setFilters={setFilters}
                                        fetch={fetch}>
                                        {page?.nodes?.map((e) => (
                                            <DTRow data={e} key={e._id} withoutType={true} />
                                        ))}
                                    </CRUDProvider>
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
        </>
    );
};

export default Groups;
