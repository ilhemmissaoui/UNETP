import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

import { useMultiCRUDContext } from '../../../../../hooks/use-crud';
const SearchEstablishment = ({ changeMode }) => {
    const {
        control,
        formState: { errors },
        watch
    } = useFormContext();
    const { establishments } = useMultiCRUDContext();
    const id = watch('id');
    const rawSelectedValue = establishments?.page?.nodes?.find((e) => e?.organization?.id === id);
    const formatedSelectedValue = rawSelectedValue
        ? {
              value: rawSelectedValue?.organization?.id,
              label: rawSelectedValue?.organization?.name
          }
        : undefined;
    return (
        <div>
            <span htmlFor="" className="h5 d-block">
                Rechercher un établissement
            </span>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Établissement :
                </label>
                <Controller
                    control={control}
                    name="id"
                    render={({ field }) => (
                        <Select
                            {...{
                                ...field,
                                value: formatedSelectedValue
                            }}
                            options={establishments?.page?.nodes?.map((e) => ({
                                value: e?.organization?.id,
                                label: `${e.establishmentNumber} - ${e.organization?.name}`
                            }))}
                        />
                    )}
                />
                <span className={clsx('invalid-feedback', { 'd-flex': errors?.id })}>
                    {errors?.id?.message}
                </span>
            </div>
            <span className="fw-bold fs-7 text-gray-600">
                Vous n&apos;avez pas trouvé l&apos;établissement recherché ?{' '}
                <a href="#" className="btn btn-link p-0" type="button" onClick={changeMode('add')}>
                    Crééz un maintenenant
                </a>
            </span>
        </div>
    );
};

export default SearchEstablishment;
