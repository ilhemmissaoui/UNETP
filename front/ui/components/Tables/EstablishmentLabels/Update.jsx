import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import labelSchema from '../../../../schemas/labelSchema';
import Update from '../../Modals/Update';
import Form from './Form';

const UpdateLabel = ({ id, defaultValues, isShow, toggleShow }) => {
    const updateForm = useForm({
        resolver: yupResolver(labelSchema),
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
                collectionLabel="Libellé"
                form={updateForm}
                formId="update-label"
                size="lg"
                label={defaultValues?.label}>
                <form id="update-label">
                    <Form />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateLabel;
