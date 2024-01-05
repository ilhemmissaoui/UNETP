import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../hooks/use-crud';
import AddUser from './AddUser';
import SearchUser from './SearchUser';

const addModes = {
    search: SearchUser,
    add: AddUser
};
const Form = ({ isUpdate }) => {
    const {
        watch,
        setValue,
        register,
        formState: { errors }
    } = useFormContext();
    const user = watch('user');
    const changeMode = (mode) => () => setValue('user.mode', mode);
    const mode = user?.mode ?? (user?.id ? 'search' : 'add');
    const Component = addModes[mode];
    const {
        functionLabels: { page: functionLabels, loading: isFunctionLabelsLoading }
    } = useMultiCRUDContext();
    const labelId = watch('labelId');
    const startDate = watch('startDate');
    const endDate = watch('endDate');
    useEffect(() => {
        const functionLabel = functionLabels?.nodes?.find((e) => e.organizationTypeId);
        if (endDate && startDate) {
            setValue('startDate', moment(startDate).format('yyyy-MM-DD'));
            setValue('endDate', moment(endDate).format('yyyy-MM-DD'));
        }
        if (typeof labelId === 'undefined') {
            setValue('labelId', functionLabel?.id);
        }
    }, []);
    return (
        <div>
            {!isFunctionLabelsLoading && (
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">
                        Fonction :
                    </label>

                    <select
                        name=""
                        id=""
                        className="form-select"
                        {...{
                            ...register('labelId'),
                            onChange: ({ target: { value } }) => {
                                setValue('functionLabel', '');
                                return value;
                            }
                        }}>
                        {functionLabels?.nodes?.map((e) => (
                            <option value={e.id} key={e.id}>
                                {e.singularMaleName}
                            </option>
                        ))}
                    </select>
                    <span className="invalid-feedback">{errors?.labelId?.message}</span>
                </div>
            )}
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Date de début :
                        </label>
                        <input
                            type="date"
                            className={clsx('form-control', {
                                'is-invalid': errors?.startDate
                            })}
                            {...register('startDate')}
                        />
                        <span className="invalid-feedback">{errors?.startDate?.message}</span>
                    </div>{' '}
                </div>

                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Date de fin :
                        </label>
                        <input
                            type="date"
                            className={clsx('form-control', {
                                'is-invalid': errors?.endDate
                            })}
                            {...register('endDate')}
                        />
                        <span className="invalid-feedback">{errors?.endDate?.message}</span>
                    </div>{' '}
                </div>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Commentaires UNETP :
                </label>
                <textarea
                    className={clsx('form-control', {
                        'is-invalid': errors?.comment
                    })}
                    {...register('comment')}
                />
                <span className="invalid-feedback">{errors?.comment?.message}</span>
            </div>
            <div className="separator my-5" />
            {isUpdate ? null : (
                <div className="row">
                    <Component changeMode={changeMode} defaultSelected={user} />
                </div>
            )}
            <span className="invalid-feedback d-flex text-center">{errors?.user?.message}</span>
        </div>
    );
};

export default Form;
