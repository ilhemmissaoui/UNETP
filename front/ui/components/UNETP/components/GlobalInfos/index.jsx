import clsx from 'clsx';
import React, { useState } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';

import { Ability } from '../../../GUARDS';
import NestedUpdate from '../../../Modals/NestedUpdate';
import Coordinates from '../../../SharedComponents/Coordinates';

const GlobalInfo = ({ data }) => {
    const updateForm = useFormContext();
    const { control, watch } = updateForm;
    const {
        register,
        formState: { errors }
    } = updateForm;

    const [isUpdate, setIsUpdate] = useState();
    const toggleUpdate = () => setIsUpdate((v) => !v);
    const organizationName = watch('name');
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <div>
                    <span className="h5">Nom : </span>
                    <span className="fw-bold fs-5 text-gray-800">{organizationName}</span>{' '}
                </div>

                <Ability I="write" an="unetp">
                    <button className="btn btn-sm btn-primary" type="button" onClick={toggleUpdate}>
                        <i className="fa fa-edit"></i>
                        Modifier
                    </button>
                </Ability>
            </div>

            <div className="separator my-9" />
            <FormProvider {...updateForm}>
                <Coordinates title="Tableau des coordonées" />
            </FormProvider>
            <NestedUpdate
                id={data?.id}
                isShow={isUpdate}
                toggleShow={toggleUpdate}
                collectionLabel="Nom"
                formId="update-name"
                size="lg"
                label={organizationName}
                control={control}
                name="names">
                <form id="update-name">
                    <div className="row mb-3">
                        <label htmlFor="" className="form-label required">
                            Nom :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.name
                            })}
                            {...register('name')}
                        />
                        <span className="invalid-feedback">{errors?.name?.message}</span>
                    </div>
                </form>
            </NestedUpdate>
        </>
    );
};

export default GlobalInfo;
