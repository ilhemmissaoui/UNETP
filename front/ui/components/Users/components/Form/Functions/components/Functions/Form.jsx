import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../../../../../hooks/use-crud';
import SearchEstablishment from './Search';

const Form = () => {
    const [functionLabelsOptions, setFucntionLabelsOptions] = useState([]);
    const {
        organizationTypes: { page: organizationTypes, loading: isOrganizationTypesLoading },
        functionLabels: { page: functionLabels, loading: isFunctionLabelsLoading }
    } = useMultiCRUDContext();
    const form = useFormContext();
    const {
        register,
        formState: { errors },
        watch,
        setValue
    } = form;
    const type = watch('type');
    useEffect(() => {
        if (type !== null) {
            const options = functionLabels?.nodes?.filter((e) => e.organizationTypeId == type);
            setFucntionLabelsOptions(options);
            setValue('labelId', options[0]?.id);
        }
    }, [type]);
    console.log(errors);
    return (
        <div>
            {!isOrganizationTypesLoading && (
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">
                        Type :
                    </label>
                    <select
                        name=""
                        id=""
                        className={clsx('form-select', { 'is-invalid': errors?.type })}
                        {...register('type')}>
                        <option value="">-- Type --</option>
                        {organizationTypes?.nodes?.map((e) => (
                            <option value={e.id} key={e.id}>
                                {e.label}
                            </option>
                        ))}
                    </select>
                    <div className=" d-flex invalid-feedback">{errors?.type?.message}</div>{' '}
                </div>
            )}
            <SearchEstablishment />
            {!isFunctionLabelsLoading && type !== null && (
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">
                        Fonction :
                    </label>

                    <select name="" id="" className="form-select" {...register('labelId')}>
                        {functionLabelsOptions?.map((e) => (
                            <option value={e.id} key={e.id}>
                                {e.singularMaleName}
                            </option>
                        ))}
                    </select>
                    <span className="invalid-feedback">{errors?.comment?.message}</span>
                </div>
            )}
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Date de début :
                        </label>
                        <input
                            type="date"
                            className={clsx('form-control', {
                                'is-invalid': errors?.startDate
                            })}
                            {...register('startDate')}
                        />
                        <span className="invalid-feedback">{errors?.startDate?.message}</span>
                    </div>{' '}
                </div>

                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Date de fin :
                        </label>
                        <input
                            type="date"
                            className={clsx('form-control', {
                                'is-invalid': errors?.endDate
                            })}
                            {...register('endDate')}
                        />
                        <span className="invalid-feedback">{errors?.endDate?.message}</span>
                    </div>{' '}
                </div>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Commentaires UNETP :
                </label>
                <textarea
                    className={clsx('form-control', {
                        'is-invalid': errors?.comment
                    })}
                    {...register('comment')}
                />
                <span className="invalid-feedback">{errors?.comment?.message}</span>
            </div>
        </div>
    );
};

export default Form;
