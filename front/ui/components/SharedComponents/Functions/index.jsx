import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import useCRUD, { MultiCRUDProvider } from '../../../../hooks/use-crud';
import useFormParams from '../../../../hooks/use-form-params';
import { functionSchema } from '../../../../schemas/globalFunctionSchema';
import { Ability } from '../../GUARDS';
import NestedAdd from '../../Modals/NestedAdd';
import Form from './Form';
import List from './List';

const Functions = ({ withHeader = true, withBody = true, isUpdate }) => {
    const params = useFormParams();
    const civilities = useCRUD({
        pluralName: 'civilities',
        singleName: 'civility',
        pageSize: null
    });
    const functionLabels = useCRUD({
        singleName: 'function-label',
        pluralName: 'function-labels',
        pageSize: null,
        filters: {
            organizationTypeId: params.parameter.functionType
        }
    });
    const [isAdd, setIsAdd] = useState();
    const toggleIsAdd = () => setIsAdd((v) => !v);
    const { watch, control } = useFormContext();
    const addForm = useForm({
        resolver: yupResolver(functionSchema),
        defaultValues: {
            type: params.parameter.functionType,
            user: {
                mode: 'search'
            }
        }
    });
    const functions = watch(params.functions.arrayName);

    return (
        <MultiCRUDProvider civilities={civilities} functionLabels={functionLabels}>
            {withHeader && (
                <div className="d-flex justify-content-end  mb-4">
                    <Ability I="create" an="user">
                        <button
                            className="btn btn-primary btn-sm me-2"
                            type="button"
                            onClick={toggleIsAdd}>
                            <i className="fa fa-plus"></i> Création
                        </button>
                    </Ability>
                </div>
            )}

            {withBody && (
                <List
                    columnsCount={4}
                    isUpdate={isUpdate}
                    data={functions?.map((e, i) => ({ ...e, id: i }))}
                />
            )}
            <FormProvider {...addForm}>
                <NestedAdd
                    isShow={isAdd}
                    toggleShow={toggleIsAdd}
                    formId="add-function"
                    collectionLabelPrefix="d'une"
                    collectionLabel="Fonction"
                    size="lg"
                    name={params.functions.arrayName}
                    control={control}>
                    <form id="add-function">
                        <Form />
                    </form>
                </NestedAdd>
            </FormProvider>
        </MultiCRUDProvider>
    );
};

export default Functions;
