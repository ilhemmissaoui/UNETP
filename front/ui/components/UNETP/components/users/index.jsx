import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../../hooks/use-crud';
import personSchema from '../../../../../schemas/personSchema';
import NestedAdd from '../../../Modals/NestedAdd';
import DTRow from './DTRow';
import Form from './Form';

const Users = ({ title }) => {
    const { control } = useFormContext();
    const addForm = useForm({
        resolver: yupResolver(personSchema),
        defaultValues: {
            addressType: 'professionnel'
        }
    });
    const { boardDirector } = useMultiCRUDContext();
    const [isAdd, setIsAdd] = useState();
    const toggleIsAdd = () => setIsAdd((v) => !v);
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <div className="h6 align-items-center d-flex">{title}</div>
                <button className="btn btn-sm btn-primary" type="button" onClick={toggleIsAdd}>
                    <i className="fa fa-plus"></i> Création
                </button>
            </div>
            <div className="notice d-flex rounded  p-3 mb-3">
                <div className="flex-shrink-0 mb-3">
                    <span className="text-dark fs-4 fw-bolder">
                        Personnes exerçant une fonction :
                    </span>
                </div>{' '}
            </div>

            <div className="table-responsive">
                <table className="table align-middle fs-9 gy-2 no-footer">
                    <thead>
                        <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                            <th className="min-w-50px">Personne</th>
                            <th className="min-w-50px">Libellé</th>
                            <th className="min-w-50px">Période</th>

                            <th className="min-w-50px">
                                <i className="fa fa-bolt"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-bold">
                        {boardDirector?.page?.organization?.functions?.map((e) => (
                            <DTRow data={e} key={e._id} />
                        ))}
                    </tbody>
                </table>
            </div>
            <FormProvider {...addForm}>
                <NestedAdd
                    isShow={isAdd}
                    toggleShow={toggleIsAdd}
                    formId="add-function"
                    collectionLabelPrefix="d'une"
                    collectionLabel="Fonction"
                    size="xl"
                    name="user"
                    control={control}>
                    <form id="add-function">
                        <Form />
                    </form>
                </NestedAdd>
            </FormProvider>
        </>
    );
};
export default Users;
