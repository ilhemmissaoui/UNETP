import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import useCRUD, { useCRUDContext } from '../../../../hooks/use-crud';
import { archiveOptions, filtersSchema, relationships } from '../../../../schemas/users';

const Filters = () => {
    const { register, handleSubmit, reset, watch } = useForm({
        resolver: yupResolver(filtersSchema),
        defaultValues: {
            functionLabel: '1',
            isArchived: 'without',
            organizationType: '4',
            relationship: 'all'
        }
    });
    const { page: organizationTypesOption, loading } = useCRUD({
        singleName: 'organization-type',
        pluralName: 'organization-types',
        pageSize: null
    });

    const { page: functionLabels, loading: functionLabelsLoading } = useCRUD({
        singleName: 'function-label',
        pluralName: 'function-labels',
        pageSize: null
    });
    const { handleFilters } = useCRUDContext();
    const submit = async (data) => {
        await handleFilters(data);
    };
    const { organizationType } = watch();

    useEffect(() => {
        const subscription = watch(handleSubmit(submit));
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);
    const _reset = () => {
        reset();
    };
    const eligibleFunctionLabels =
        organizationType === 'all'
            ? functionLabels?.nodes
            : functionLabels?.nodes?.filter((e) => e.organizationTypeId == organizationType);
    return (
        <form className="p-4 w-300px" onSubmit={handleSubmit(submit)}>
            <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">
                    Nom :
                </label>
                <input type="text" className="form-control" id="name" {...register('firstName')} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="department" className="form-label">
                    Departement :
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="department"
                    {...register('department')}
                />
            </div>
            {!loading && (
                <div htmlFor="" className="form-group mb-3">
                    <label htmlFor="" className="form-label">
                        Exerce une fonction dans :
                    </label>
                    <select name="" id="" className="form-select" {...register('organizationType')}>
                        <option value="all">Tous</option>
                        {organizationTypesOption?.nodes?.map((e) => (
                            <option value={e.id} key={e.id}>
                                {e.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {!functionLabelsLoading && (
                <div htmlFor="" className="form-group mb-3">
                    <label htmlFor="" className="form-label">
                        Fonction :
                    </label>
                    <select name="" id="" className="form-select" {...register('functionLabel')}>
                        <option value="all">Tous</option>
                        {eligibleFunctionLabels?.map((e) => (
                            <option value={e.id} key={e.id}>
                                {e.singularMaleName}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div htmlFor="" className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Relation UNETP :
                </label>
                <select name="" id="" className="form-select" {...register('relationship')}>
                    <option value="all">Tous</option>
                    {Object.entries(relationships).map((e) => (
                        <option value={e[0]} key={e[0]}>
                            {e[1]}
                        </option>
                    ))}
                </select>
            </div>
            <div htmlFor="" className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Archives :
                </label>
                <select name="" id="" className="form-select" {...register('isArchived')}>
                    {Object.entries(archiveOptions)?.map((e) => (
                        <option value={e[0]} key={e[0]}>
                            {e[1]}
                        </option>
                    ))}
                </select>
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-secondary btn-sm" type="button" onClick={_reset}>
                    Réinitialiser
                </button>
            </div>
        </form>
    );
};

export default Filters;
