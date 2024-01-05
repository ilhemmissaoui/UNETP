import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import settings from '../../../../../settings';
import Coordinates from '../../../SharedComponents/Coordinates';
import Establishments from './Establishments';
const { endpointUrl } = settings;

const GlobalInfo = () => {
    const [isAvailable, setIsAvailable] = useState();

    const addForm = useFormContext();
    const {
        watch,
        register,
        formState: { errors }
    } = addForm;

    const organizationId = watch('organization.id');

    const checkNameAvailability = async (name) => {
        console.log(organizationId);
        if (name?.length) {
            const { data } = await axios.get(
                `${endpointUrl}/networks/availability/by-name/${encodeURIComponent(name)}${
                    organizationId ? `?exclude=${organizationId}` : ''
                }`
            );
            setIsAvailable(data?.data?.isAvailable);
        }
    };

    return (
        <>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="" className="form-label required">
                        Nom du réseau :
                    </label>
                    <Controller
                        name="organization.name"
                        control={addForm.control}
                        render={({ field }) => (
                            <input
                                type="text"
                                name="organization.name"
                                className={clsx('form-control', {
                                    'is-invalid':
                                        errors?.organization?.name ||
                                        (typeof isAvailable === 'boolean' && !isAvailable),
                                    'is-valid': isAvailable
                                })}
                                onChange={({ target: { value } }) => {
                                    if (value) checkNameAvailability(value);
                                    field.onChange(value);
                                }}
                                value={field.value}
                                ref={field.ref}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                    <span className="valid-feedback">
                        {typeof isAvailable === 'boolean' &&
                            !errors?.organization?.name &&
                            isAvailable &&
                            'Ce nom est disponible'}
                    </span>
                    <span className="invalid-feedback">
                        {typeof isAvailable === 'boolean' && !isAvailable
                            ? 'Ce nom est pris'
                            : errors?.organization?.name?.message}
                    </span>
                </div>

                <div className="col-md-6">
                    <label htmlFor="" className="form-label">
                        Date de création :
                    </label>
                    <input
                        type="date"
                        className={clsx('form-control', {
                            'is-invalid': errors?.createdAt
                        })}
                        {...register('createdAt')}
                    />
                    <span className="invalid-feedback">{errors?.createdAt?.message}</span>
                </div>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Description :
                </label>
                <textarea
                    className={clsx('form-control', {
                        'is-invalid': errors?.organization?.description
                    })}
                    {...register('organization.description')}
                />
                <span className="invalid-feedback">
                    {errors?.organization?.description?.message}
                </span>
            </div>

            <Coordinates title="Coordonnées du réseau" />

            <div className="separator  my-6" />
            <Establishments title="Établissement du réseau" />
        </>
    );
};

export default GlobalInfo;
