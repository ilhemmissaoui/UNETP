import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import functionSchema from '../../../../schemas/functionSchema';
import Update from '../../Modals/Update';
import Form from './Form';

const dataMapper = ({ organizationType, ...data }) => ({
    ...data,
    organizationTypeId: organizationType?.id
});
const UpdateFunction = ({ id, defaultValues, isShow, toggleShow }) => {
    const updateForm = useForm({
        resolver: yupResolver(functionSchema),
        defaultValues: dataMapper(defaultValues)
    });
    const { reset } = updateForm;
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);
    return (
        <FormProvider {...updateForm}>
            <Update
                size="xl"
                id={id}
                isShow={isShow}
                toggleShow={toggleShow}
                collectionLabel="Fonction"
                form={updateForm}
                formId="update-function"
                label={defaultValues?.singularMaleName}>
                <form id="update-function">
                    <Form organizationTypeDisabled />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateFunction;
