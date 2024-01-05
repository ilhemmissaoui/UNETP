import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import useCRUD, { useCRUDContext } from '../../../../../hooks/use-crud';
import { filterSchema } from '../../../../../schemas/functionSchema';

const Filters = () => {
    const formRef = useRef(null);
    const { register, handleSubmit, reset, watch } = useForm({
        resolver: yupResolver(filterSchema)
    });

    const { handleFilters } = useCRUDContext();
    const submit = async (data) => {
        await handleFilters(data);
    };
    const _reset = () => {
        reset();
    };
    const { page: organizationTypes, loading } = useCRUD({
        singleName: 'organization-type',
        pluralName: 'organization-types',
        pageSize: null
    });
    useEffect(() => {
        const subscription = watch(handleSubmit(submit));
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);

    return (
        <form className="p-4 w-300px" ref={formRef} onSubmit={handleSubmit(submit)}>
            {!loading && (
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">
                        Type d&apos;organisme :
                    </label>

                    <select
                        name=""
                        id=""
                        className="form-select"
                        {...register('organizationTypeId')}>
                        <option value="">- Sélectionner -</option>
                        {organizationTypes?.nodes?.map((e) => (
                            <option value={e.id} key={e.id}>
                                {e.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="d-flex justify-content-between">
                <button className="btn btn-secondary btn-sm" type="button" onClick={_reset}>
                    Réinitialiser
                </button>
            </div>
        </form>
    );
};

export default Filters;
