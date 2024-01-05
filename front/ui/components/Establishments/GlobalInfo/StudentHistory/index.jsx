import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { MultiCRUDProvider } from '../../../../../hooks/use-crud';
import { capacityEntrySchema } from '../../../../../schemas/capacityEntrySchema';
import NestedAdd from '../../../Modals/NestedAdd';
import Form from './Form';
import List from './List';

const headersEdit = [
    () => <th className="min-w-50px">Année</th>,
    () => <th className="min-w-50px">Nombre d&apos;élèves</th>,
    () => (
        <th className="min-w-50px">
            <i className="fa fa-bolt"></i>
        </th>
    )
];
const headersAdd = [
    () => <th className="min-w-50px">Année</th>,
    () => (
        <th className="min-w-50px">
            <i className="fa fa-bolt"></i>
        </th>
    )
];
const StudentHistory = ({ title, isUpdate }) => {
    const [isAdd, setIsAdd] = useState();
    const toggleIsAdd = () => setIsAdd((v) => !v);
    const { watch, control } = useFormContext();
    const [studentCapacityEntries, establishmentKey, subscriptionFees] = watch([
        'capacityHistories',
        'establishmentKey',
        'subscriptionFees'
    ]);
    console.log(watch());
    const addForm = useForm({
        resolver: yupResolver(capacityEntrySchema)
    });
    return (
        <>
            <MultiCRUDProvider
                studentCapacityEntries={studentCapacityEntries?.map((e, i) => ({ ...e, id: i }))}
                subscriptionFees={subscriptionFees}
                establishmentKey={isUpdate ? establishmentKey : undefined}>
                <div className="d-flex justify-content-between mb-4">
                    <div className="h6 align-items-center d-flex">{title}</div>
                    <button className="btn btn-sm btn-primary" type="button" onClick={toggleIsAdd}>
                        <i className="fa fa-plus" /> Création
                    </button>
                </div>
                {/* viewRow */}

                <List
                    data={studentCapacityEntries?.map((e, i) => ({ ...e, id: i }))}
                    _headers={isUpdate ? headersEdit : headersAdd}
                />

                <FormProvider {...addForm}>
                    <NestedAdd
                        isShow={isAdd}
                        toggleShow={toggleIsAdd}
                        formId="add-student-history"
                        collectionLabel="une nouvelle ligne d'historique "
                        size="lg"
                        name="capacityHistories"
                        control={control}>
                        <form id="add-student-history">
                            <Form />
                        </form>
                    </NestedAdd>
                </FormProvider>
            </MultiCRUDProvider>
        </>
    );
};
export default StudentHistory;
