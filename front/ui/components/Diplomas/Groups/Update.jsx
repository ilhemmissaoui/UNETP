import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import groupSchema from '../../../../schemas/groupSchema';
import Update from '../../Modals/Update';
import Form from './Form';

const UpdateGroup = ({ id, defaultValues, isShow, toggleShow }) => {
    const updateForm = useForm({
        resolver: yupResolver(groupSchema),
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
                collectionLabel="Group"
                form={updateForm}
                formId="update-group"
                size="lg"
                label={defaultValues?.label}>
                <form id="update-group">
                    <Form />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateGroup;
