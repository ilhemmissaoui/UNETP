import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import civilitySchema from '../../../../schemas/civilitySchema';
import Update from '../../Modals/Update';
import Form from './Form';

const UpdateCivility = ({ id, defaultValues, isShow, toggleShow, data }) => {
    const updateForm = useForm({
        resolver: yupResolver(civilitySchema),
        defaultValues
    });
    const { reset } = updateForm;
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);
    return (
        <FormProvider {...updateForm}>
            <Update
                defaultValues={data}
                id={id}
                isShow={isShow}
                toggleShow={toggleShow}
                collectionLabel="Civility"
                form={updateForm}
                formId="update-civility"
                size="lg"
                label={defaultValues?.name}>
                <form id="update-civility">
                    <Form />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateCivility;
