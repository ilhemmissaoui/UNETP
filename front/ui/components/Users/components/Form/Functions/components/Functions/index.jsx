import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { functionSchema } from '../../../../../../../../schemas/users';
import NestedAdd from '../../../../../../Modals/NestedAdd';
import Form from './Form';
import List from './List';

const Functions = ({ title }) => {
    const [isAdd, setIsAdd] = useState();
    const toggleIsAdd = () => setIsAdd((v) => !v);
    const { watch, control } = useFormContext();
    const addForm = useForm({
        resolver: yupResolver(functionSchema)
    });
    const functions = watch('functions');

    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <div className="h6 align-items-center d-flex">{title}</div>
                <button className="btn btn-sm btn-primary" type="button" onClick={toggleIsAdd}>
                    <i className="fa fa-plus"></i> Création
                </button>
            </div>
            <List data={functions?.map((e, i) => ({ ...e, id: i }))} />
            <FormProvider {...addForm}>
                <NestedAdd
                    isShow={isAdd}
                    toggleShow={toggleIsAdd}
                    formId="add-function"
                    collectionLabelPrefix="d'une"
                    collectionLabel="Fonction"
                    size="lg"
                    name="functions"
                    control={control}>
                    <form id="add-function">
                        <Form />
                    </form>
                </NestedAdd>
            </FormProvider>
        </>
    );
};

export default Functions;
