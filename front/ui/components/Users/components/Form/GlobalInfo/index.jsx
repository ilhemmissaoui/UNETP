import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import useCRUD from '../../../../../../hooks/use-crud';
import { relationships } from '../../../../../../schemas/users';
import Coordinates from '../../../../../components/SharedComponents/Coordinates';

const GlobalInfo = () => {
    const addForm = useFormContext();
    const {
        register,
        formState: { errors }
    } = addForm;
    const { page, loading } = useCRUD({
        singleName: 'civility',
        pluralName: 'civilities'
    });

    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <label htmlFor="" className="form-label required">
                        Civilité :
                    </label>
                    {!loading && (
                        <select name="" className="form-select" id="" {...register('civilityId')}>
                            {page?.nodes?.map((e) => (
                                <option value={e.id} key={e.id}>
                                    {e.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className="col-md-4">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            Nom :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', { 'is-invalid': errors?.lastName })}
                            {...register('lastName')}
                        />
                        <span className="invalid-feedback">{errors?.lastName?.message}</span>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            Prénom :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', { 'is-invalid': errors?.firstName })}
                            {...register('firstName')}
                        />
                        <span className="invalid-feedback">{errors?.firstName?.message}</span>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="" className="form-label required">
                        Relation UNETP :
                    </label>
                    <select
                        name=""
                        id=""
                        {...register('relationship')}
                        className={clsx('form-select', {
                            'is-invalid': errors?.relationship
                        })}>
                        <option value="">-- Relation --</option>
                        {Object.entries(relationships).map((e) => (
                            <option value={e[0]} key={e[0]}>
                                {e[1]}
                            </option>
                        ))}
                    </select>
                    <span className="invalid-feedback">{errors?.relationship?.message}</span>
                </div>
                <div className="col-md-6">
                    <label htmlFor="" className="form-label">
                        Date de naissance :
                    </label>
                    <input
                        type="date"
                        className={clsx('form-control', { 'is-invalid': errors?.dob })}
                        {...register('dob')}
                        max={moment().subtract(18, 'years').format('YYYY-MM-DD')}
                    />
                    <span className="invalid-feddeedback">{errors?.dob?.message}</span>
                </div>
            </div>

            <div className="form-group mb-5">
                <label htmlFor="" className="form-label">
                    Commentaires UNETP :
                </label>
                <textarea className="form-control" {...register('comment')} />
                <span className="invalid-feedback">{errors?.comment?.message}</span>
            </div>
            <Coordinates title="Coordonnées personnelles" />
        </>
    );
};

export default GlobalInfo;
