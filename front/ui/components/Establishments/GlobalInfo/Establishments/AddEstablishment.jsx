import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';
const AddEstablishment = ({ changeMode }) => {
    const addForm = useFormContext();
    const {
        register,
        control,
        formState: { errors }
    } = addForm;
    return (
        <div>
            <span htmlFor="" className="h5 d-block">
                Créer un nouvel établissement
            </span>
            <span className="fw-bold fs-7 text-gray-600">
                Si la recherche n&apos;a rien donné, c&apos;est peut-être que l&apos;établissement
                ne figure pas encore dans la base de données. Dans ce cas, vous pouvez le créer en
                renseignant les champs ci-dessous,{' '}
                <a className="fs-7" type="button" href="#" onClick={changeMode('search')}>
                    revernir vers recherche.
                </a>
            </span>
            <div className="row mt-5 mb-2">
                <div className="col-md-6">
                    <label htmlFor="" className="form-label">
                        Clé :
                    </label>
                    <Controller
                        name="establishmentKey"
                        control={control}
                        render={({ field }) => (
                            <NumberFormat
                                allowEmptyFormatting={false}
                                format="#######"
                                mask="_"
                                type="text"
                                className={clsx('form-control ', {
                                    'is-invalid': errors?.establishmentKey
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
                    <span className="invalid-feedback">{errors?.establishmentKey?.message}</span>
                </div>
                <div className="col-md-6">
                    <label htmlFor="" className="form-label">
                        N° :
                    </label>
                    <Controller
                        name="establishmentNumber"
                        control={addForm.control}
                        render={({ field }) => (
                            <NumberFormat
                                allowEmptyFormatting={false}
                                format="######"
                                mask="_"
                                type="text"
                                className={clsx('form-control ', {
                                    'is-invalid': errors?.establishmentKey
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
                    <span className="invalid-feedback">{errors?.establishmentNumber?.message}</span>
                </div>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Nom :
                </label>
                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.organization?.name
                    })}
                    {...register('organization.name')}
                />
                <span className="invalid-feedback">{errors?.organization?.name?.message}</span>
            </div>{' '}
        </div>
    );
};

export default AddEstablishment;
