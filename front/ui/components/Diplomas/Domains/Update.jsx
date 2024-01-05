import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import domainSchema from '../../../../schemas/domainSchema';
import Update from '../../Modals/Update';
import Form from './Form';

const UpdateDomain = ({ id, defaultValues, isShow, toggleShow }) => {
    const updateForm = useForm({
        resolver: yupResolver(domainSchema),
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
                collectionLabel="Domain"
                form={updateForm}
                formId="update-domain"
                size="lg"
                label={defaultValues?.label}>
                <form id="update-domain">
                    <Form />
                </form>
            </Update>
        </FormProvider>
    );
};

export default UpdateDomain;
