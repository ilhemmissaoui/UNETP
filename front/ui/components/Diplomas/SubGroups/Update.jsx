import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import subGroupSchema from '../../../../schemas/subGroupSchema';
import Update from '../../Modals/Update';
import Form from './Form';

const UpdateSubGroup = ({ id, defaultValues, isShow, toggleShow }) => {
    const updateForm = useForm({
        resolver: yupResolver(subGroupSchema),
        defaultValues
    });
    const { reset } = updateForm;
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);
    return (
        <FormProvider {...updateForm}>
            <Update
                id={id}
                isShow={isShow}
                toggleShow={toggleShow}
                collectionLabel="SubGroup"
                form={updateForm}
                formId="update-subGroup"
                size="lg"
                label={defaultValues?.label}>
                <form id="update-subGroup">
                    <Form />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateSubGroup;
