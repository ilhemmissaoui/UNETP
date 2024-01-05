import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import useCRUD, { MultiCRUDProvider } from '../../../../hooks/use-crud';
import useFormParams from '../../../../hooks/use-form-params';
import { coordinateSchema } from '../../../../schemas/coordinatesSchema';
import { Ability } from '../../GUARDS';
import NestedAdd from '../../Modals/NestedAdd';
import Form from './Form';
import List from './List';
const Coordinates = ({ title, isMultipleTables = false }) => {
    const [isAdd, setIsAdd] = useState();
    const toggleIsAdd = () => setIsAdd((v) => !v);
    const { watch, control } = useFormContext();
    const addForm = useForm({
        resolver: yupResolver(coordinateSchema),
        defaultValues: {
            addressType: 'professionnel'
        }
    });
    const params = useFormParams();
    const coordinates = watch(params?.coordinates?.arrayName);
    const countries = useCRUD({
        singleName: 'country',
        pluralName: 'countries',
        pageSize: null
    });
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <div className="h6 align-items-center d-flex">{title}</div>

                <Ability I="create" an="unetp">
                    <button className="btn btn-sm btn-primary" type="button" onClick={toggleIsAdd}>
                        <i className="fa fa-plus"></i> Création
                    </button>
                </Ability>
            </div>
            <MultiCRUDProvider countries={countries}>
                <List
                    data={coordinates?.map((e, i) => ({ ...e, id: i }))}
                    isMultipleTables={isMultipleTables}
                />
                <FormProvider {...addForm}>
                    <NestedAdd
                        isShow={isAdd}
                        toggleShow={toggleIsAdd}
                        formId="add-coordinate"
                        collectionLabelPrefix="d'une"
                        collectionLabel="Coordonnée"
                        size="xl"
                        name={params?.coordinates?.arrayName}
                        control={control}>
                        <form id="add-coordinate">
                            <Form />
                        </form>
                    </NestedAdd>
                </FormProvider>
            </MultiCRUDProvider>
        </>
    );
};
export default Coordinates;
