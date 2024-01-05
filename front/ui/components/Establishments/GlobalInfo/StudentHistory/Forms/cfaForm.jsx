import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';
const FormCFA = () => {
    const {
        register,
        formState: { errors }
    } = useFormContext();
    return (
        <>
            <div className="h6 mb-3">Nombre d&apos;heures stagiaires :</div>
            <div className="form-group col-md-12 mb-3">
                <label htmlFor="" className="form-label">
                    CFA/UFA :
                </label>{' '}
                <input
                    type="number"
                    className={clsx('form-control', {
                        'is-invalid': errors?.cfaUfaApprenticesCount
                    })}
                    name="cfaUfaApprenticesCount"
                    {...register('cfaUfaApprenticesCount')}
                />
                <span className="invalid-feedback">{errors?.cfaUfaApprenticesCount?.message}</span>
            </div>
        </>
    );
};
export default FormCFA;
