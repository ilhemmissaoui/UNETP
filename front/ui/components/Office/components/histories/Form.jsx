import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';

import personSchema from '../../../../../schemas/personSchema';
const Form = () => {
    const addForm = useForm({
        resolver: yupResolver(personSchema)
        // defaultValues: data
    });
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
                            Type :
                        </label>

                        <select
                            className={clsx('form-select', {
                                'is-invalid': errors?.type
                            })}
                            {...register('type')}>
                            <span className="invalid-feedback">{errors?.type?.message}</span>

                            <option> Fonction </option>
                            <option> E-mailing </option>
                            <option> Demande de modification </option>
                        </select>
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
                                'is-invalid': errors?.wording
                            })}
                            {...register('wording')}
                        />
                        <span className="invalid-feedback">{errors?.wording?.message}</span>
                    </div>{' '}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Date de début :
                        </label>
                        <input
                            type="date"
                            className={clsx('form-control', {
                                'is-invalid': errors?.createdAt
                            })}
                            {...register('createdAt')}
                        />
                        <span className="invalid-feedback">{errors?.createdAt?.message}</span>
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
                                'is-invalid': errors?.updatedAt
                            })}
                            {...register('updatedAt')}
                        />
                        <span className="invalid-feedback">{errors?.updatedAt?.message}</span>
                    </div>{' '}
                </div>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Commentaires UNETP :
                </label>
                <textarea
                    className={clsx('form-control', {
                        'is-invalid': errors?.description
                    })}
                    {...register('description')}
                />
                <span className="invalid-feedback">{errors?.description?.message}</span>
            </div>{' '}
        </div>
    );
};

export default Form;
