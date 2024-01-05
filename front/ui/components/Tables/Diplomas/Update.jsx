import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import diplomasSchema from '../../../../schemas/diplomasSchema';
import Update from '../../Modals/Update';
import Form from './Form';

const UpdateDiploma = ({ id, defaultValues, isShow, toggleShow }) => {
    const updateForm = useForm({
        resolver: yupResolver(diplomasSchema),
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
                formId="update-diploma"
                size="xl"
                label={defaultValues?.name}>
                <form id="update-diploma">
                    <Form exclude={id} />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateDiploma;
