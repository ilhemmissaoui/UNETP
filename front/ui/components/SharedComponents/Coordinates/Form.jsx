import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import { useMultiCRUDContext } from '../../../../hooks/use-crud';

const Form = () => {
    const updateForm = useFormContext();
    const {
        register,
        formState: { errors }
    } = updateForm;
    const { countries } = useMultiCRUDContext();

    return (
        <div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label required">
                    Libellé :
                </label>
                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.label
                    })}
                    {...register('label')}
                />
                <span className="invalid-feedback">{errors?.label?.message}</span>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Téléphone :
                        </label>

                        <Controller
                            name="phoneNumber"
                            control={updateForm.control}
                            render={({ field }) => (
                                <NumberFormat
                                    allowEmptyFormatting={false}
                                    format="## ## ## ## ##"
                                    mask="x"
                                    type="text"
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.phoneNumber
                                    })}
                                    onChange={({ target: { value } }) => {
                                        field.onChange(value);
                                    }}
                                    value={field.value}
                                    ref={field.ref}
                                    onBlur={field.onBlur}
                                    {...field}
                                />
                            )}
                        />
                        <span className="invalid-feedback">{errors?.phoneNumber?.message}</span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Fax :
                        </label>
                        <input
                            type="tel"
                            className={clsx('form-control', {
                                'is-invalid': errors?.fax
                            })}
                            {...register('fax')}
                        />
                        <span className="invalid-feedback">{errors?.fax?.message}</span>
                    </div>{' '}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Mobile :
                        </label>
                        <Controller
                            name="mobileNumber"
                            control={updateForm.control}
                            render={({ field }) => (
                                <NumberFormat
                                    allowEmptyFormatting={false}
                                    format="## ## ## ## ##"
                                    mask="x"
                                    type="tel"
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.mobileNumber
                                    })}
                                    onChange={({ target: { value } }) => {
                                        field.onChange(value);
                                    }}
                                    value={field.value}
                                    ref={field.ref}
                                    onBlur={field.onBlur}
                                    {...field}
                                />
                            )}
                        />
                        <span className="invalid-feedback">{errors?.mobileNumber?.message}</span>
                    </div>{' '}
                </div>

                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            E-mail :
                        </label>
                        <input
                            type="mail"
                            className={clsx('form-control', {
                                'is-invalid': errors?.email
                            })}
                            {...register('email')}
                        />
                        <span className="invalid-feedback">{errors?.email?.message}</span>
                    </div>{' '}
                </div>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Site Web :
                </label>
                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.website
                    })}
                    {...register('website')}
                />
                <span className="invalid-feedback">{errors?.website?.message}</span>
            </div>{' '}
            <div className="separator my-5" />
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Format d&apos;adresse pour :
                </label>
                <div className="d-flex fw-bold h-100">
                    <div className="form-check form-check-custom form-check-solid me-9">
                        <input
                            className="form-check-input me-3"
                            name="radio_input"
                            type="radio"
                            value="particulier"
                            id="Particulier"
                            {...register('addressType')}
                        />
                        <label className="form-check-label" htmlFor="Particulier">
                            <div className="fw-bolder text-gray-800">Particulier</div>
                        </label>
                    </div>
                    <div className="form-check form-check-custom form-check-solid me-9">
                        <input
                            className="form-check-input me-3"
                            name="radio_input"
                            type="radio"
                            value="professionnel"
                            {...register('addressType')}
                            id="Professionnel"
                        />
                        <label className="form-check-label" htmlFor="Professionnel">
                            <div className="fw-bolder text-gray-800">Professionnel</div>
                        </label>
                    </div>{' '}
                </div>{' '}
            </div>
            <div className="separator my-5" />
            <div className="row mb-3">
                <div className="form-group col-md-4">
                    <label htmlFor="" className="form-label">
                        Destinataire :
                        <span className="fw-bold fs-7 text-gray-600 d-block">
                            (Civilité, Nom et Prénom)
                        </span>
                    </label>
                    <input
                        type="text"
                        className={clsx('form-control', {
                            'is-invalid': errors?.recipient
                        })}
                        {...register('recipient')}
                    />
                    <span className="invalid-feedback">{errors?.recipient?.message}</span>
                </div>
                <div className="col-md-4">
                    <label htmlFor="" className="form-label">
                        Étage :{' '}
                        <span className="fw-bold fs-7 text-gray-600 d-block">
                            (Escalier - Appartement)
                        </span>
                    </label>
                    <input
                        type="text"
                        className={clsx('form-control', {
                            'is-invalid': errors?.addressLine1
                        })}
                        {...register('addressLine1')}
                    />
                    <span className="invalid-feedback">{errors?.addressLine1?.message}</span>
                </div>
                <div className="col-md-4">
                    <label htmlFor="" className="form-label">
                        Complément d&apos;adresse :
                        <span className="fw-bold fs-7 text-gray-600 d-block">
                            (Zone industrielle, zone d&apos;activité, etc.)
                        </span>
                    </label>
                    <input
                        type="text"
                        className={clsx('form-control', {
                            'is-invalid': errors?.additionalRecipient
                        })}
                        {...register('additionalRecipient')}
                    />
                    <span className="invalid-feedback">{errors?.additionalRecipient?.message}</span>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-3">
                    <label htmlFor="" className="form-label">
                        N° de voie :
                    </label>

                    <input
                        type="text"
                        className={clsx('form-control', {
                            'is-invalid': errors?.voiceNumber
                        })}
                        {...register('voiceNumber')}
                    />
                    <span className="invalid-feedback">{errors?.voiceNumber?.message}</span>
                </div>
                <div className="col-md-9">
                    <label htmlFor="" className="form-label">
                        Libellé de voie :
                    </label>
                    <input
                        type="text"
                        className={clsx('form-control', {
                            'is-invalid': errors?.voiceLabel
                        })}
                        {...register('voiceLabel')}
                    />
                    <span className="invalid-feedback">{errors?.voiceLabel?.message}</span>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">
                    Lieu-dit ou Boite postale :
                </label>
                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.addressLine3
                    })}
                    {...register('addressLine3')}
                />
                <span className="invalid-feedback">{errors?.addressLine3?.message}</span>
            </div>
            <div className="separator my-5" />
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Code postal :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.zipCode
                            })}
                            {...register('zipCode')}
                        />
                        <span className="invalid-feedback">{errors?.zipCode?.message}</span>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group mb-3">
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
                </div>
                <div className="col-md-4">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Cedex :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.cedex
                            })}
                            {...register('cedex')}
                        />
                        <span className="invalid-feedback">{errors?.cedex?.message}</span>
                    </div>
                </div>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Pays :
                </label>
                {!countries?.loading && (
                    <>
                        <select
                            className={clsx('form-select', {
                                'is-invalid': errors?.countryId
                            })}
                            {...register('countryId')}>
                            {countries?.page?.nodes?.map((e) => (
                                <option value={e?.id} key={e?.id}>
                                    {e?.label}
                                </option>
                            ))}
                        </select>
                        <span className="invalid-feedback">{errors?.countryId?.message}</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default Form;
