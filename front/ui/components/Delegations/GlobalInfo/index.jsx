import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';

import settings from '../../../../settings';
import Coordinates from '../../SharedComponents/Coordinates';
const { endpointUrl } = settings;

const GlobalInfo = ({ data }) => {
    const [isAvailable, setIsAvailable] = useState();

    const addForm = useFormContext();
    const {
        watch,
        control,
        register,
        formState: { errors }
    } = addForm;

    const organizationId = watch('organizationId');

    const checkNameAvailability = async (name) => {
        console.log(organizationId);
        if (name?.length) {
            const { data } = await axios.get(
                `${endpointUrl}/delegations/availability/by-name/${encodeURIComponent(name)}${
                    organizationId ? `?exclude=${organizationId}` : ''
                }`
            );
            setIsAvailable(data?.data?.isAvailable);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            Nom de la délégation :
                        </label>

                        <Controller
                            name="delegationName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    name="delegationName"
                                    className={clsx('form-control', {
                                        'is-invalid':
                                            errors?.delegationName ||
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
                                !errors?.delegationName &&
                                isAvailable &&
                                'Ce nom est disponible'}
                        </span>
                        <span className="invalid-feedback">
                            {typeof isAvailable === 'boolean' && !isAvailable
                                ? 'Ce nom est pris'
                                : errors?.delegationName?.message}
                        </span>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Référence :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.reference
                            })}
                            {...register('reference')}
                        />
                        <span className="invalid-feedback">{errors?.reference?.message}</span>
                    </div>{' '}
                </div>
            </div>
            <FormProvider {...addForm}>
                <Coordinates data={data?.coordinates} title="Tableau des coordonnées" />
            </FormProvider>
        </>
    );
};

export default GlobalInfo;
