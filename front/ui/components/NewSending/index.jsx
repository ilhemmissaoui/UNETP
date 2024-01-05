import clsx from 'clsx';
import React from 'react';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';

import RichTextEditor from '../RichTextEditor';

const Sending = ({ envoi }) => {
    const addForm = useFormContext();

    const {
        register,
        control,
        formState: { errors }
    } = addForm;

    return (
        <div>
            <FormProvider {...addForm}>
                <span className="card-title  fw-bold fs-6 text-gray-700">
                    <i className="fa fa-paper-plane  fs-4 me-2 text-gray-700" />
                    CONSULTATION D&apos;UN PRÉCÉDENT ENVOI : {envoi?.name}
                </span>
                <br /> <br />
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                            Description :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.description
                            })}
                            {...register('description')}
                        />
                        <span className="invalid-feedback">{errors?.description?.message}</span>
                    </div>{' '}
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="" className="form-label required">
                            E-mail de l&apos;expéditeur :
                        </label>

                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.senderEmail
                            })}
                            {...register('senderEmail')}
                        />
                        <span className="invalid-feedback">{errors?.senderEmail?.message}</span>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                            Nom de l&apos;expéditeur :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.senderName
                            })}
                            {...register('senderName')}
                        />
                        <span className="invalid-feedback">{errors?.senderName?.message}</span>
                    </div>
                </div>
                <div className="separator my-3" />
                <div className="col-md-6 mb-3">
                    <label htmlFor="" className="form-label required">
                        Sujet :
                    </label>
                    <input
                        type="text"
                        className={clsx('form-control', {
                            'is-invalid': errors?.subject
                        })}
                        {...register('subject')}
                    />
                    <span className="invalid-feedback">{errors?.subject?.message}</span>
                </div>
                <div className="separator my-3" />
                <div className="row">
                    <label htmlFor="" className="form-label">
                        Pièces jointes :
                    </label>{' '}
                    <div className="row">
                        <div className="col d-flex">
                            <span className="form-label pt-2"> Fichier joint 1 : </span>
                            <span className="px-6 pb-8">
                                <input
                                    type="file"
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.attachment1
                                    })}
                                    {...register('attachment1')}
                                />
                                <span className="invalid-feedback">
                                    {errors?.attachment1?.message}
                                </span>{' '}
                            </span>
                        </div>
                    </div>{' '}
                    <div className="row">
                        <div className="col d-flex">
                            <span className="form-label pt-2"> Fichier joint 2 : </span>
                            <span className="px-6 pb-8">
                                <input
                                    type="file"
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.attachment2
                                    })}
                                    {...register('attachment2')}
                                />
                                <span className="invalid-feedback">
                                    {errors?.attachment2?.message}
                                </span>{' '}
                            </span>
                        </div>
                    </div>{' '}
                    <div className="row">
                        <div className="col d-flex">
                            <span className="form-label pt-2"> Fichier joint 3 : </span>
                            <span className="px-6 pb-8">
                                <input
                                    type="file"
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.attachment3
                                    })}
                                    {...register('attachment3')}
                                />
                                <span className="invalid-feedback">
                                    {errors?.attachment3?.message}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="separator my-5" />
                <div className="row">
                    <div className="col-md-12 mt-4">
                        <div className="form-group">
                            <label htmlFor="Content" className="form-label required">
                                Message :
                            </label>
                            <Controller
                                className={clsx('form-control', {
                                    'is-invalid': errors?.message
                                })}
                                {...register('message')}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <RichTextEditor {...field} error={fieldState.error} />
                                )}
                            />
                            <span className="invalid-feedback">{errors?.message?.message}</span>
                        </div>
                    </div>
                </div>
                <div className="separator my-5" />
                <div className="h5"> Destinataires</div>
                <div className="separator my-5" />
                <div className="row">
                    <div className="col-md-6">
                        {' '}
                        <label htmlFor="" className="form-label">
                            Type de coordonnée :
                        </label>
                        <input
                            type="text"
                            disabled
                            className={clsx('form-control', {
                                'is-invalid': errors?.type
                            })}
                            {...register('type')}
                        />
                        <span className="invalid-feedback">{errors?.type?.message}</span>{' '}
                    </div>
                </div>
                <div className="separator my-3" />
                <div className="row mb-3">
                    <div className="col-md-6">
                        {' '}
                        <label htmlFor="" className="form-label">
                            Requête utilisée :
                        </label>
                        <textarea
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.request
                            })}
                            {...register('request')}
                        />
                        <span className="invalid-feedback">{errors?.request?.message}</span>
                    </div>
                </div>{' '}
                <br />
                <div className="d-flex">
                    <div className="p-2">
                        <button className="btn btn-primary" form="add-envoi">
                            <i className="fa fa-search"></i> Vérifier les destinataires
                        </button>
                    </div>
                    <div className="p-2">
                        <button className="btn btn-primary" form="add-envoi">
                            <i className="fa fa-save"></i> Envoi test
                        </button>
                    </div>
                    <div className="p-2">
                        <button className="btn btn-primary" form="add-envoi">
                            <i className="fa fa-save"></i> Envoi REEL
                        </button>
                    </div>
                </div>
            </FormProvider>
        </div>
    );
};

export default Sending;
