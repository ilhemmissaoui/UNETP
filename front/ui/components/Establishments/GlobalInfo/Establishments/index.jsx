import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { childEstablishmentSchema } from '../../../../../schemas/establishmentSchema';
import NestedAdd from '../../../Modals/NestedAdd';
import Form from './Form';
import List from './List';
const Establishments = ({ title }) => {
    const [isAdd, setIsAdd] = useState();
    const toggleIsAdd = () => setIsAdd((v) => !v);
    const { watch, control } = useFormContext();
    const addForm = useForm({
        resolver: yupResolver(childEstablishmentSchema),
        defaultValues: {
            mode: 'search'
        }
    });
    const establishments = watch('childEstablishments');
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <div className="h6 align-items-center d-flex">{title}</div>
                <button className="btn btn-sm btn-primary" type="button" onClick={toggleIsAdd}>
                    <i className="fa fa-plus"></i> Création
                </button>
            </div>
            <List data={establishments?.map((e, i) => ({ ...e, index: i }))} />

            <FormProvider {...addForm}>
                <NestedAdd
                    isShow={isAdd}
                    toggleShow={toggleIsAdd}
                    formId="add-child-establishment"
                    collectionLabelPrefix="d'un"
                    collectionLabel="Etablissement"
                    size="lg"
                    name="childEstablishments"
                    control={control}>
                    <form id="add-child-establishment">
                        <Form />
                    </form>
                </NestedAdd>
            </FormProvider>
        </>
    );
};
export default Establishments;
