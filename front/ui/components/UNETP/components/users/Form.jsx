import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../../hooks/use-crud';
import personSchema from '../../../../../schemas/personSchema';
const Form = () => {
    const addForm = useForm({
        resolver: yupResolver(personSchema)
    });
    const { functionLabel } = useMultiCRUDContext();
    const {
        register,
        formState: { errors }
    } = addForm;
    console.log(functionLabel);
    return (
        <div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    <h5>Choisir une fonction : </h5>
                </label>{' '}
                <br />
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="form-group mb-6">
                        <label htmlFor="" className="form-label">
                            Fonction :
                        </label>
                        <select name="" id="" className="form-select" {...register('labelId')}>
                            {functionLabel?.page?.nodes?.map((e) => (
                                <option value={e.id} key={e.id}>
                                    {e.singularMaleName}
                                </option>
                            ))}
                        </select>
                    </div>{' '}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Date de début (jj/mm/aaaa):
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
                            Date de fin (jj/mm/aaaa):
                        </label>
                        <input
                            type="date"
                            className={clsx('form-control', {
                                'is-invalid': errors?.updatedAt
                            })}
                            {...register('updatedAt')}
                        />
                        <span className="invalid-feedback">{errors?.updatedAt?.message}</span>
                    </div>
                </div>
            </div>
            <div className="form-group mb-6">
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
