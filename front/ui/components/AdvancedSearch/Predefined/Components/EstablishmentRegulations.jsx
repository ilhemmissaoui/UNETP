import { yupResolver } from '@hookform/resolvers/yup';
import Collapse from 'react-bootstrap/Collapse';
import { useForm } from 'react-hook-form';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';
import useToast from '../../../../../hooks/use-toast';
import {
    establishmentRegulationSchema,
    regulationType
} from '../../../../../schemas/advancedSearchSchema';
import SortableField from '../../../CRUD/SortableField';
import EmptyState from '../../../EmptyState';
import Pagination from '../../../Pagination';
import DTRow from '../../../Tables/Establishments/DTRow';

const EstablishmentRegulations = () => {
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(establishmentRegulationSchema)
    });
    const {
        offset,
        first,
        loading,
        page,
        sort,
        fetch,
        refetch,
        setFilters,
        currentPage,
        handlePage,
        handleSort
    } = useCRUD({
        singleName: 'settlement',
        pluralName: 'settlements',
        prefix: 'search',
        lazy: true,
        defaultSort: {
            direction: 'Desc',
            field: 'id'
        }
    });

    const crud = useCRUD({
        singleName: 'establishment',
        pluralName: 'establishments',
        prefix: 'crud',
        lazy: true
    });
    const _delete = async (id) => {
        crud._delete(id);
        const regulationType = watch('regulationType');
        setFilters({ regulationType });
        await fetch();
    };
    const { setToast } = useToast();
    const submit = async ({ regulationType }) => {
        try {
            await refetch(
                {
                    filters: {
                        regulationType
                    },
                    first,
                    offset,

                    sortOrder: sort?.direction,
                    sortBy: sort.field
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
                <div className="col-md-6 py-5 form-group">
                    <label className="form-label">Type de Règlement :</label>
                    <select name="" id="" className="form-select" {...register('regulationType')}>
                        {Object.keys(regulationType)?.map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                    <span className="invalid-feedback">{errors?.regulationType?.message}</span>
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
                                    <tr className="text-muted fw-bolder fs-7 text-uppercase gs-0 text-center">
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
                                        <th className="text-center">Statut</th>
                                        <th className="text-center">
                                            <i className="fa fa-bolt"></i>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-600 fw-bold">
                                    <CRUDProvider _delete={_delete}>
                                        {page?.nodes?.map((e) => (
                                            <DTRow data={e} key={e._id} />
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

export default EstablishmentRegulations;
