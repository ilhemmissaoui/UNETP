import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import functionsSchema from '../../../../schemas/functionsSchema';
import Update from '../../Modals/Update';
import Form from './Form';

const UpdateFunction = ({ id, defaultValues, isShow, toggleShow }) => {
    const updateForm = useForm({
        resolver: yupResolver(functionsSchema),
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
                collectionLabel="Tunction"
                form={updateForm}
                formId="update-function"
                size="lg"
                label={defaultValues?.label}>
                <form id="update-function">
                    <Form />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateFunction;
