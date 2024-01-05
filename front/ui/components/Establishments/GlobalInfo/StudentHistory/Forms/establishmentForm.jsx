import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';
const Form = () => {
    const {
        register,
        formState: { errors }
    } = useFormContext();
    return (
        <>
            <div className="h6 mb-3">Nombre d&apos;élèves :</div>
            <div className="row">
                <div className="form-group col-md-6 mb-3">
                    <label htmlFor="" className="form-label">
                        Collège :
                    </label>{' '}
                    <input
                        type="number"
                        className={clsx('form-control', {
                            'is-invalid': errors?.collegeContractStudentsCount
                        })}
                        name="college"
                        {...register('collegeContractStudentsCount')}
                    />
                    <span className="invalid-feedback">
                        {errors?.collegeContractStudentsCount?.message}
                    </span>
                </div>
                <div className="form-group col-md-6 mb-3">
                    <label htmlFor="" className="form-label">
                        LP :
                    </label>{' '}
                    <input
                        type="number"
                        className={clsx('form-control', {
                            'is-invalid': errors?.lpContractStudentsCount
                        })}
                        name="lp"
                        {...register('lpContractStudentsCount')}
                    />
                    <span className="invalid-feedback">
                        {errors?.lpContractStudentsCount?.message}
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-6 mb-3">
                    <label htmlFor="" className="form-label">
                        LGT :
                    </label>{' '}
                    <input
                        type="number"
                        className={clsx('form-control', {
                            'is-invalid': errors?.lgtContractStudentsCount
                        })}
                        name="lgt"
                        {...register('lgtContractStudentsCount')}
                    />
                    <span className="invalid-feedback">
                        {errors?.lgtContractStudentsCount?.message}
                    </span>
                </div>
                <div className="form-group col-md-6 mb-3">
                    <label htmlFor="" className="form-label">
                        BTS :
                    </label>{' '}
                    <input
                        type="number"
                        className={clsx('form-control', {
                            'is-invalid': errors?.btsContractStudentsCount
                        })}
                        name="bts"
                        {...register('btsContractStudentsCount')}
                    />
                    <span className="invalid-feedback">
                        {errors?.btsContractStudentsCount?.message}
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-6 mb-3">
                    <label htmlFor="" className="form-label">
                        Sup + CPGE :
                    </label>{' '}
                    <input
                        type="number"
                        className={clsx('form-control', {
                            'is-invalid': errors?.supContractStudentsCount
                        })}
                        name="sup"
                        {...register('supContractStudentsCount')}
                    />
                    <span className="invalid-feedback">
                        {errors?.supContractStudentsCount?.message}
                    </span>
                </div>
            </div>
        </>
    );
};
export default Form;
