import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import useAuth from '../../../../hooks/use-auth';
import ojecSchema from '../../../../schemas/ogecSchema';

const cleanFormData = ({
    establishmentId,
    ogecAddress,
    ogecName,
    ogecPhoneNumber,
    ogecCity,
    ogecEmail
}) => ({
    establishmentId,
    ogecAddress,
    ogecName,
    ogecPhoneNumber,
    ogecCity,
    ogecEmail
});
const EstablishmentItem = ({ data, addEstablishment, index }) => {
    const { user } = useAuth();
    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(ojecSchema),
        defaultValues: cleanFormData(data)
    });
    const submit = async (data) => {
        addEstablishment(data);
    };

    return (
        <form
            className="current"
            data-kt-stepper-element="content"
            onSubmit={handleSubmit(submit)}
            id={`establishment-${index}`}>
            <div className="row">
                {!data?.ogecName && (
                    <div className="col-md-6 mb-3">
                        <label
                            htmlFor=""
                            className={clsx('form-label', {
                                required: user?.role != 100
                            })}>
                            Nom :
                        </label>

                        <input
                            type="text"
                            name="ogecName"
                            className={clsx('form-control', {
                                'is-invalid': errors?.ogecName
                            })}
                            {...register('ogecName')}
                        />
                        <span className="invalid-feedback">{errors?.ogecName?.message}</span>
                    </div>
                )}

                {!data?.ogecPhoneNumber && (
                    <div className="col-md-6 mb-3">
                        <label
                            htmlFor=""
                            className={clsx('form-label', {
                                required: user?.role != 100
                            })}>
                            Numéro de téléphone :
                        </label>
                        <Controller
                            name="ogecPhoneNumber"
                            control={control}
                            render={({ field }) => (
                                <NumberFormat
                                    allowEmptyFormatting={false}
                                    format="## ## ## ## ##"
                                    mask="x"
                                    type="tel"
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.ogecPhoneNumber
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
                        <span className="invalid-feedback">{errors?.ogecPhoneNumber?.message}</span>
                    </div>
                )}

                {!data?.ogecAddress && (
                    <div className="col-md-12 mb-3">
                        <label
                            htmlFor=""
                            className={clsx('form-label', {
                                required: user?.role != 100
                            })}>
                            Code postale :
                        </label>

                        <input
                            type="text"
                            name="ogecAddress"
                            className={clsx('form-control', {
                                'is-invalid': errors?.ogecAddress
                            })}
                            {...register('ogecAddress')}
                        />

                        <span className="invalid-feedback">{errors?.ogecAddress?.message}</span>
                    </div>
                )}

                {!data?.ogecCity && (
                    <div className="col-md-6 mb-3">
                        <label
                            htmlFor=""
                            className={clsx('form-label', {
                                required: user?.role != 100
                            })}>
                            Ville :
                        </label>

                        <input
                            type="text"
                            name="ogecCity"
                            className={clsx('form-control', {
                                'is-invalid': errors?.ogecCity
                            })}
                            {...register('ogecCity')}
                        />
                        <span className="invalid-feedback">{errors?.ogecCity?.message}</span>
                    </div>
                )}

                {!data?.ogecEmail && (
                    <div className="col-md-6 mb-3">
                        <label
                            htmlFor=""
                            className={clsx('form-label', {
                                required: user?.role != 100
                            })}>
                            E-Mail :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.ogecEmail
                            })}
                            {...register('ogecEmail')}
                        />
                        <span className="invalid-feedback">{errors?.ogecEmail?.message}</span>
                    </div>
                )}
            </div>
        </form>
    );
};

export default EstablishmentItem;
