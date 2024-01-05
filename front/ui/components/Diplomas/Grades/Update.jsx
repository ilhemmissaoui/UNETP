import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import levelSchema from '../../../../schemas/levelSchema';
import Update from '../../Modals/Update';
import Form from './Form';

const UpdateLevel = ({ id, defaultValues, isShow, toggleShow }) => {
    const updateForm = useForm({
        resolver: yupResolver(levelSchema),
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
                collectionLabel="Level"
                form={updateForm}
                formId="update-level"
                size="lg"
                label={defaultValues?.label}>
                <form id="update-level">
                    <Form />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateLevel;
