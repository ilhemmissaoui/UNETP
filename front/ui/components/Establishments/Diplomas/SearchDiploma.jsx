import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

import { useMultiCRUDContext } from '../../../../hooks/use-crud';
const SearchDiploma = ({ changeMode }) => {
    // const { endpointUrl } = settings;
    const {
        control,
        formState: { errors },
        register
    } = useFormContext();
    const { diplomas } = useMultiCRUDContext();

    return (
        <div>
            <div className="form-group mb-3">
                <label htmlFor="" className="h5">
                    Rechercher un diplôme existant
                </label>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label required">
                    Référence du diplôme :
                </label>
                {!diplomas.loading && (
                    <Controller
                        control={control}
                        name="diplomaId"
                        render={({ field }) => (
                            <Select
                                {...field}
                                isSearchable
                                options={diplomas.page.nodes.map(({ name, reference, id }) => ({
                                    label: `${reference} -${name}`,
                                    value: id
                                }))}
                            />
                        )}
                    />
                )}
                <span className="invalid-feedback d-flex">{errors?.diplomaId?.message}</span>
                <span className="fw-bold fs-7 text-gray-600">
                    Vous n&apos;avez pas trouvé le diplôme à partir de sa référence?{' '}
                    <a
                        href="#"
                        className="btn btn-link p-0 fs-7"
                        type="button"
                        onClick={changeMode('add')}>
                        Choisissez un diplôme maintenenant.
                    </a>
                </span>
            </div>
            <div className="separator border-secondary  my-5"></div>
            <div className="form-group mb-3 col-md-12">
                <label htmlFor="" className="form-label">
                    Complément :
                </label>
                <textarea
                    name="complement"
                    className={clsx('form-control', {
                        'is-invalid': errors?.complement
                    })}
                    {...register('complement')}
                />
                <span className="invalid-feedback d-flex">{errors?.complement?.message}</span>
            </div>
        </div>
    );
};

export default SearchDiploma;
