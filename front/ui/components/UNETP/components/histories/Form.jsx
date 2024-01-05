import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../../hooks/use-crud';

const Form = () => {
    const addForm = useFormContext();
    const {
        historyTypes: { page }
    } = useMultiCRUDContext();
    const {
        register,
        formState: { errors }
    } = addForm;
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Type :{' '}
                        </label>

                        <select
                            className={clsx('form-select', {
                                'is-invalid': errors?.historyIdType
                            })}
                            {...register('historyIdType')}>
                            {page?.nodes?.map((e) => (
                                <option value={e.id} key={e.id}>
                                    {e.label}
                                </option>
                            ))}
                        </select>
                        <span className="invalid-feedback">{errors?.historyIdType?.message}</span>
                    </div>{' '}
                </div>
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            libellé :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.label
                            })}
                            {...register('label')}
                        />
                        <span className="invalid-feedback">{errors?.label?.message}</span>
                    </div>{' '}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Date :
                        </label>
                        <input
                            type="date"
                            className={clsx('form-control', {
                                'is-invalid': errors?.createdAt
                            })}
                            {...register('date')}
                        />
                        <span className="invalid-feedback">{errors?.createdAt?.message}</span>
                    </div>{' '}
                </div>
                <div className="col-md-4">
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

                <div className="col-md-4">
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
            </div>{' '}
        </div>
    );
};

export default Form;
