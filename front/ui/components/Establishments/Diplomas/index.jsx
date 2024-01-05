import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import useCRUD, { MultiCRUDProvider } from '../../../../hooks/use-crud';
import { diplomaSchema } from '../../../../schemas/establishmentSchema';
import NestedAdd from '../../Modals/NestedAdd';
import Form from './Form';
import List from './List';

const Diplomas = () => {
    const grades = useCRUD({
        singleName: 'grade',
        pluralName: 'grades',
        prefix: 'diploma-characteristics',
        pageSize: null
    });

    const diplomas = useCRUD({
        singleName: 'diploma',
        pluralName: 'diplomas',
        pageSize: null
    });
    const [isAdd, setIsAdd] = useState();
    const toggleIsAdd = () => setIsAdd((v) => !v);
    const { watch, control } = useFormContext();
    const addForm = useForm({
        resolver: yupResolver(diplomaSchema),
        defaultValues: {
            diploma: {
                mode: 'add'
            }
        }
    });
    const diplomasList = watch('diplomas');
    return (
        <MultiCRUDProvider grades={grades} diplomas={diplomas}>
            <div className="d-flex justify-content-between mb-4">
                <div className="h6 align-items-center d-flex">
                    Tableau des Formations dispensées :
                </div>
                <button className="btn btn-sm btn-primary" type="button" onClick={toggleIsAdd}>
                    <i className="fa fa-plus"></i> Création
                </button>
            </div>
            <List columnsCount={2} data={diplomasList?.map((e, i) => ({ ...e, id: i }))} />
            <FormProvider {...addForm}>
                <NestedAdd
                    isShow={isAdd}
                    toggleShow={toggleIsAdd}
                    formId="add-diploma"
                    collectionLabelPrefix="d'un"
                    collectionLabel="Diplôme"
                    size="lg"
                    name="diplomas"
                    control={control}>
                    <form id="add-diploma">
                        <Form />
                    </form>
                </NestedAdd>
            </FormProvider>
        </MultiCRUDProvider>
    );
};

export default Diplomas;
