import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useCRUDContext } from '../../../../../hooks/use-crud';
import { archiveOptions, filtersSchema } from '../../../../../schemas/establishmentSchema';

const Filters = () => {
    const form = useForm({
        resolver: yupResolver(filtersSchema),
        defaultValues: {
            isArchived: 'without',
            organizationType: '4'
        }
    });
    const {
        watch,
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = form;
    const { handleFilters } = useCRUDContext();

    const _reset = () => {
        reset();
    };

    const submit = async (data) => {
        handleFilters(data);
    };
    useEffect(() => {
        const subscription = watch(handleSubmit(submit));
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);
    return (
        <form className="p-4 w-300px">
            <div htmlFor="" className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Nom de la structure d&apos;établissement :
                </label>
                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.structure
                    })}
                    {...register('name')}
                />
                <span className="invalid-feedback">{errors?.structure?.message}</span>
            </div>

            <div htmlFor="" className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Clé de la structure d&apos;établissement :
                </label>
                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.key
                    })}
                    {...register('establishmentKey')}
                />
                <span className="invalid-feedback">{errors?.key?.message}</span>
            </div>

            <div htmlFor="" className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    N° de la structure d&apos;établissement :
                </label>
                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.structureNumber
                    })}
                    {...register('establishmentNumber')}
                />
                <span className="invalid-feedback">{errors?.structureNumber?.message}</span>
            </div>
            <div htmlFor="" className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Numéro du département :
                </label>
                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.departmentNumber
                    })}
                    {...register('departmentNumber')}
                />
                <span className="invalid-feedback">{errors?.departmentNumber?.message}</span>
            </div>

            <div htmlFor="" className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Ville :
                </label>
                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.city
                    })}
                    {...register('city')}
                />
                <span className="invalid-feedback">{errors?.city?.message}</span>
            </div>

            <div htmlFor="" className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Archives :
                </label>
                <select name="" id="" className="form-select" {...register('isArchived')}>
                    {Object.entries(archiveOptions)?.map((e) => (
                        <option key={e[0]} value={e[0]}>
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
