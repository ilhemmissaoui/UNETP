import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import academySchema from '../../../../schemas/academySchema';
import Update from '../../Modals/Update';
import Form from './Form';

const UpdateAcademy = ({ id, defaultValues, isShow, toggleShow }) => {
    const updateForm = useForm({
        resolver: yupResolver(academySchema),
        defaultValues: defaultValues
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
                collectionLabel="Academy"
                form={updateForm}
                formId="update-academy"
                size="lg"
                label={defaultValues?.name}>
                <form id="update-academy">
                    <Form />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateAcademy;
