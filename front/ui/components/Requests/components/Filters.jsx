import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { useCRUDContext } from '../../../../hooks/use-crud';
import { status } from '../../../../schemas/users';

const Filters = () => {
    const formRef = useRef(null);
    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            status: 'pending'
        }
    });

    const { handleFilters } = useCRUDContext();
    const submit = async (data) => {
        await handleFilters(data);
    };
    const _reset = () => {
        reset();
    };

    useEffect(() => {
        const subscription = watch(handleSubmit(submit));
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);

    return (
        <form className="p-4 w-300px" ref={formRef} onSubmit={handleSubmit(submit)}>
            <div htmlFor="" className="form-group mb-3">
                <>
                    <label htmlFor="" className="form-label required">
                        Statut :
                    </label>

                    <select name="" id="" className="form-select" {...register('relationship')}>
                        <option value="all">Tous</option>
                        {Object.entries(status).map((e) => (
                            <option value={e[0]} key={e[0]}>
                                {e[1]}
                            </option>
                        ))}
                    </select>
                </>
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
