import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import typeSchema from '../../../../schemas/typeSchema';
import Update from '../../Modals/Update';
import Form from './Form';

const UpdateType = ({ id, defaultValues, isShow, toggleShow }) => {
    const updateForm = useForm({
        resolver: yupResolver(typeSchema),
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
                collectionLabel="Type"
                form={updateForm}
                formId="update-type"
                size="lg"
                label={defaultValues?.label}>
                <form id="update-type">
                    <Form />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateType;
