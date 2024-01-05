import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import useCRUD, { MultiCRUDProvider } from '../../../../hooks/use-crud';
import useFormParams from '../../../../hooks/use-form-params';
import { historySchema } from '../../../../schemas/historySchema';
import { Ability } from '../../GUARDS';
import NestedAdd from '../../Modals/NestedAdd';
import DefaultDTRow from './DTRow';
import Form from './Form';
import List from './List';
const Histories = ({ DTRow = DefaultDTRow, headers, columnsCount }) => {
    const [isAdd, setIsAdd] = useState();
    const toggleIsAdd = () => setIsAdd((v) => !v);
    const addForm = useForm({
        resolver: yupResolver(historySchema)
    });
    const { control, watch } = useFormContext();
    const historyTypes = useCRUD({
        singleName: 'history-type',
        pluralName: 'history-types'
    });
    const params = useFormParams();
    const histories = watch(params?.histories?.arrayName);
    return (
        <MultiCRUDProvider historyTypes={historyTypes}>
            <div className="d-flex justify-content-end mb-4">
                <Ability I="create" an="history-type">
                    <button
                        className="btn btn-primary btn-sm me-2"
                        type="button"
                        onClick={toggleIsAdd}>
                        <i className="fa fa-plus"></i> Création
                    </button>
                </Ability>
            </div>

            <List
                data={histories?.map((e, i) => ({ ...e, index: i }))}
                Row={DTRow}
                headers={headers}
                columnsCount={columnsCount}
            />
            <FormProvider {...addForm}>
                <NestedAdd
                    isShow={isAdd}
                    toggleShow={toggleIsAdd}
                    formId="add-history"
                    collectionLabel="Historique"
                    size="lg"
                    name={params?.histories?.arrayName}
                    control={control}>
                    <form id="add-history">
                        <Form />
                    </form>
                </NestedAdd>
            </FormProvider>
        </MultiCRUDProvider>
    );
};

export default Histories;
