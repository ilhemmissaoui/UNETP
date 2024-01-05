import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const EditDiploma = () => {
    const {
        formState: { errors, dirtyFields },
        register
    } = useFormContext();
    console.log(dirtyFields);
    return (
        <div>
            <div className="form-group mb-3 col-md-12">
                <label htmlFor="" className="form-label">
                    Complément :
                </label>
                <textarea
                    name="complement"
                    className={clsx('form-control', {
                        'is-invalid': errors?.complement
                    })}
                    {...register('complement')}
                />
                <span className="invalid-feedback d-flex">{errors?.complement?.message}</span>
            </div>
        </div>
    );
};

export default EditDiploma;
