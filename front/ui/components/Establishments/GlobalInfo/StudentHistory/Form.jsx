import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import { useMultiCRUDContext } from '../../../../../hooks/use-crud';
import FormCFA from './Forms/cfaForm';
import FormCFP from './Forms/cfpForm';
import EstablishmentForm from './Forms/establishmentForm';

const forms = {
    0: EstablishmentForm,
    1: FormCFA,
    2: FormCFP,
    3: FormCFA,
    4: FormCFP
};
const Form = () => {
    const addForm = useFormContext();
    const {
        setValue,
        formState: { errors }
    } = addForm;

    const { studentCapacityEntries, establishmentKey } = useMultiCRUDContext();
    setValue('studentCapacityEntries', studentCapacityEntries);

    const keyForm = establishmentKey?.charAt(establishmentKey?.length - 1);
    setValue('keyForm', keyForm);

    const Component = forms[keyForm];

    return (
        <>
            <div className="form-group col-md-12 mb-3">
                <label htmlFor="" className="form-label required">
                    Année :
                </label>{' '}
                <Controller
                    name="year"
                    control={addForm.control}
                    render={({ field }) => (
                        <NumberFormat
                            allowEmptyFormatting={false}
                            format="####-####"
                            mask="_"
                            type="text"
                            placeholder="Ex: 2020-2021"
                            className={clsx('form-control', {
                                'is-invalid': errors?.year
                            })}
                            name="year"
                            onChange={({ target: { value } }) => {
                                field.onChange(value);
                            }}
                            value={field.value}
                            onBlur={field.onBlur}
                        />
                    )}
                />
                <span className="invalid-feedback d-flex">{errors?.year?.message}</span>
            </div>
            {establishmentKey && <Component />}
        </>
    );
};

export default Form;
