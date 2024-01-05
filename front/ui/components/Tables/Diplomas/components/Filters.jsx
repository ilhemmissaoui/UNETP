import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import useCRUD, { useCRUDContext } from '../../../../../hooks/use-crud';
import { filterSchema } from '../../../../../schemas/diplomasSchema';

const Filters = () => {
    const formRef = useRef(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(filterSchema)
    });
    const grades = useCRUD({
        singleName: 'grade',
        pluralName: 'grades',
        prefix: 'diploma-characteristics',
        pageSize: null
    });
    const specialties = useCRUD({
        singleName: 'specialty',
        pluralName: 'specialties',
        prefix: 'diploma-characteristics',
        pageSize: null
    });
    const groups = useCRUD({
        singleName: 'group',
        pluralName: 'groups',
        prefix: 'diploma-characteristics',
        pageSize: null
    });
    const { handleFilters } = useCRUDContext();
    const submit = async (data) => {
        await handleFilters(data);
    };
    const _reset = () => {
        reset();
    };
    useEffect(() => {
        const subscription = watch(handleSubmit(submit));
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);
    return (
        <form className="p-4 w-300px" ref={formRef} onSubmit={handleSubmit(submit)}>
            <div htmlFor="" className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Nom du diplôme :
                </label>
                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid ': errors?.name
                    })}
                    {...register('name')}
                />
                <span className=" invalid-feedback">{errors?.name?.message}</span>
            </div>

            <div htmlFor="" className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Référence :
                </label>
                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid ': errors?.reference
                    })}
                    {...register('reference')}
                />
                <span className=" invalid-feedback">{errors?.reference?.message}</span>
            </div>

            <div htmlFor="" className="form-group mb-3">
                {!grades.loading && (
                    <>
                        <label htmlFor="" className="form-label required">
                            Niveau :
                        </label>

                        <select
                            name=""
                            className={clsx('form-select', {
                                'is-invalid': errors?.diplomaGradeId
                            })}
                            {...register('diplomaGradeId')}>
                            <option value="">sélectionner</option>
                            {grades?.page?.nodes?.map((e) => (
                                <option value={e.id} key={e.id}>
                                    {e.label}
                                </option>
                            ))}
                        </select>
                    </>
                )}
                <span className="invalid-feedback">{errors?.diplomaGradeId?.message}</span>
            </div>
            <div htmlFor="" className="form-group mb-3">
                {!specialties.loading && (
                    <>
                        <label htmlFor="" className="form-label required">
                            Spécialité :
                        </label>
                        <select
                            name=""
                            className={clsx('form-select', {
                                'is-invalid': errors?.diplomaSpecialtyId
                            })}
                            id=""
                            {...register('diplomaSpecialtyId')}>
                            <option value="">sélectionner</option>
                            {specialties?.page?.nodes?.map((e) => (
                                <option value={e.id} key={e.id}>
                                    {e.label}
                                </option>
                            ))}
                        </select>
                        <span className="invalid-feedback">
                            {errors?.diplomaSpecialtyId?.message}
                        </span>
                    </>
                )}
            </div>
            <div htmlFor="" className="form-group mb-3">
                <label htmlFor="" className="form-label required">
                    Groupe :
                </label>
                <select
                    name=""
                    className={clsx('form-select', {
                        'is-invalid': errors?.groupId
                    })}
                    id=""
                    {...register('diplomaGroupId')}>
                    <option value="">sélectionner</option>
                    {groups?.page?.nodes?.map((e) => (
                        <option value={e.id} key={e.id}>
                            {e.label}
                        </option>
                    ))}
                </select>
                <span className="invalid-feedback">{errors?.diplomaGroupId?.message}</span>
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-secondary btn-sm" type="button" onClick={_reset}>
                    Réinitialiser
                </button>
            </div>
        </form>
    );
};

export default Filters;
