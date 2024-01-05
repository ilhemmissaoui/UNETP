import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../hooks/use-crud';

const AddUser = ({ changeMode }) => {
    const addForm = useFormContext();
    const {
        register,
        formState: { errors }
    } = addForm;
    const { civilities } = useMultiCRUDContext();
    return (
        <div>
            <div className="form-group mb-3">
                <label htmlFor="" className="h5">
                    Créer une nouvelle personne
                </label>
            </div>
            <span className="fw-bold fs-7 text-gray-600">
                <span className="fw-bold fs-7 text-gray-600">
                    Si la recherche n&apos;a rien donné, c&apos;est peut-être que la personne ne
                    figure pas encore dans la base de données. <br />
                    Dans ce cas, vous pouvez la créer en renseignant les champs ci-dessous.
                    <a className="fs-7" type="button" href="#" onClick={changeMode('search')}>
                        revernir vers recherche.
                    </a>
                </span>
            </span>
            <br /> <br />
            <div className="row">
                <div className="form-group mb-3">
                    {!civilities?.loading && (
                        <>
                            <label htmlFor="" className="form-label">
                                Civilité :
                            </label>
                            <select
                                {...register('user.civilityId')}
                                className={clsx('form-select', {
                                    'is-invalid': errors?.user?.civilityId
                                })}>
                                {civilities?.page?.nodes?.map((e) => (
                                    <option key={e?.id} value={e?.id}>
                                        {e.abbreviation}
                                    </option>
                                ))}
                            </select>
                            <span className="invalid-feedback">
                                {errors?.user?.civilityId?.message}
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label required">
                        Nom :
                    </label>
                    <input
                        className={clsx('form-control', {
                            'is-invalid': errors?.user?.firstName
                        })}
                        {...register('user.firstName')}
                    />
                    <span className="invalid-feedback">{errors?.user?.firstName?.message}</span>
                </div>{' '}
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label required">
                        Prénom :
                    </label>
                    <input
                        className={clsx('form-control', {
                            'is-invalid': errors?.user?.lastName
                        })}
                        {...register('user.lastName')}
                    />
                    <span className="invalid-feedback">{errors?.user?.lastName?.message}</span>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
