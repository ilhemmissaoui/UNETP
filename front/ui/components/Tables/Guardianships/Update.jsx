import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import guardianshipSchema from '../../../../schemas/guardianshipSchema';
import Update from '../../Modals/Update';
import Form from './Form';

const UpdateGuardianship = ({ id, defaultValues, isShow, toggleShow }) => {
    const updateForm = useForm({
        resolver: yupResolver(guardianshipSchema),
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
                collectionLabel="guardianship"
                form={updateForm}
                formId="update-guardianship"
                size="lg"
                label={defaultValues?.label}>
                <form id="update-guardianship">
                    <Form />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateGuardianship;
