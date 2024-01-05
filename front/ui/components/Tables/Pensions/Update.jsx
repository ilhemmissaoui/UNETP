import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import pensionSchema from '../../../../schemas/pensionSchema';
import Update from '../../Modals/Update';
import Form from './Form';

const UpdateLabel = ({ id, defaultValues, isShow, toggleShow }) => {
    const updateForm = useForm({
        resolver: yupResolver(pensionSchema),
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
                collectionLabel="pension"
                form={updateForm}
                formId="update-pension"
                size="lg"
                label={defaultValues?.label}>
                <form id="update-pension">
                    <Form />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateLabel;
