import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import settings from '../../../../settings';
const { endpointUrl } = settings;
import useCRUD from '../../../../hooks/use-crud';

const Form = ({ exclude }) => {
    const [isValid, setIsValid] = useState();
    const [isTouched, SetIsTouched] = useState(false);
    const [state] = useState([]);

    const addForm = useFormContext();
    const {
        control,
        register,
        formState: { errors },
        watch,
        setValue,
        getValues,
        setError,
        clearErrors
    } = addForm;
    const domains = useCRUD({
        singleName: 'domain',
        pluralName: 'domains',
        prefix: 'diploma-characteristics',
        pageSize: null
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
    const subGroups = useCRUD({
        singleName: 'sub-group',
        pluralName: 'sub-groups',
        prefix: 'diploma-characteristics',
        pageSize: null
    });
    const types = useCRUD({
        singleName: 'type',
        pluralName: 'types',
        prefix: 'diploma-characteristics',
        pageSize: null
    });
    const functions = useCRUD({
        singleName: 'function',
        pluralName: 'functions',
        prefix: 'diploma-characteristics',
        pageSize: null
    });

    const values = watch('reference');
    const inputRefs = {
        'reference.gradeId': useRef(),
        'reference.subGroupId': useRef(),
        'reference.functionId': useRef(),
        'reference.specialtyId': useRef(),
        'reference.typeId': useRef()
    };

    const checkIsReferenceAvailable = async () => {
        if (
            isTouched &&
            values?.gradeId?.length === 3 &&
            values?.subGroupId?.length === 3 &&
            values?.functionId?.length === 1 &&
            values?.specialtyId?.length === 3 &&
            values?.typeId?.length === 1
        ) {
            const { data } = await axios.get(
                `${endpointUrl}/diplomas/is-available/${
                    values?.gradeId +
                    values?.subGroupId +
                    values?.functionId +
                    values?.specialtyId +
                    values?.typeId
                }${exclude ? `?exclude=${exclude}` : ''}`
            );
            if (!data?.isAvailable) {
                setError('reference', { message: 'Un diplôme avec cette référence existe déjà' });
                setIsValid({});
            } else {
                setIsValid({
                    valid: data?.isAvailable,
                    message: 'Cette reference est disponible'
                });
            }
        }
    };
    useEffect(() => {
        clearErrors('reference');
        checkIsReferenceAvailable();
        setValue(
            'name',
            `${grades?.page?.nodes?.find((e) => e.code == values?.gradeId)?.label || ''} ${
                specialties?.page?.nodes?.find((e) => e.code == values?.specialtyId)?.label || ''
            }
            `
        );
    }, [
        values?.gradeId,
        values?.subGroupId,
        values?.functionId,
        values?.specialtyId,
        values?.typeId,
        isTouched,
        state
    ]);
    return (
        <div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    <h5>Entrez vos données :</h5>
                </label>
                <br />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Nom du diplôme :
                </label>
                <input type="text" readOnly className="form-control" value={getValues('name')} />
                <span className="invalid-feedback">{errors?.word?.message}</span>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label  required">
                    Référence :
                </label>
                <div
                    className={clsx('d-flex border border-secondary rounded flex-grow-0', {
                        'border-success': isValid?.valid
                    })}>
                    {' '}
                    <Controller
                        name="reference.gradeId"
                        control={control}
                        render={({ field }) => (
                            <NumberFormat
                                allowEmptyFormatting={false}
                                format="###"
                                mask="_"
                                type="text"
                                placeholder="999"
                                className={clsx(' form-control border-0', {
                                    'is-invalid': errors?.reference?.gradeId
                                })}
                                onValueChange={({ value }) => {
                                    SetIsTouched(true);
                                    if (value?.length === 3) {
                                        inputRefs['reference.subGroupId'].current.focus();
                                    }
                                    field.onChange(value);

                                    value.slice(0, 3);
                                    setValue('reference.domainId');
                                }}
                                value={field.value}
                                getInputRef={inputRefs['reference.gradeId']}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                    <Controller
                        name="reference.subGroupId"
                        control={control}
                        render={({ field }) => (
                            <NumberFormat
                                allowEmptyFormatting={false}
                                format="###"
                                mask="_"
                                type="text"
                                placeholder="999"
                                className={clsx(' form-control border-0', {
                                    'is-invalid': errors?.reference?.subGroupId
                                })}
                                onValueChange={({ value }) => {
                                    SetIsTouched(true);
                                    if (value?.length === 3) {
                                        inputRefs['reference.functionId'].current.focus();
                                    }
                                    setValue('reference.domainId', value.charAt(0));
                                    setValue('reference.groupId', value.substring(0, 2));
                                    field.onChange(value);
                                    value.slice(4, 6);
                                }}
                                value={field.value}
                                getInputRef={inputRefs['reference.subGroupId']}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                    <Controller
                        name="reference.functionId"
                        control={control}
                        render={({ field }) => (
                            <input
                                allowEmptyFormatting={false}
                                maxLength="1"
                                type="text"
                                placeholder="A"
                                className={clsx(' form-control border-0', {
                                    'is-invalid': errors?.reference?.functionId
                                })}
                                onChange={({ target: { value } }) => {
                                    SetIsTouched(true);
                                    if (value.length === 1) {
                                        inputRefs['reference.specialtyId'].current.focus();
                                    }
                                    field.onChange(value);
                                }}
                                value={field.value}
                                ref={inputRefs['reference.functionId']}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                    <Controller
                        name="reference.specialtyId"
                        control={control}
                        render={({ field }) => (
                            <NumberFormat
                                allowEmptyFormatting={false}
                                format="###"
                                mask="_"
                                type="text"
                                placeholder="999"
                                className={clsx(' form-control border-0', {
                                    'is-invalid': errors?.reference?.specialtyId
                                })}
                                onValueChange={({ value }) => {
                                    SetIsTouched(true);
                                    if (value.length === 3)
                                        inputRefs['reference.typeId'].current.focus();
                                    field.onChange(value);
                                }}
                                value={field.value}
                                getInputRef={inputRefs['reference.specialtyId']}
                                onBlur={field.onBlur}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="reference.typeId"
                        control={control}
                        render={({ field }) => (
                            <input
                                allowEmptyFormatting={false}
                                maxLength="1"
                                type="text"
                                placeholder="A"
                                className={clsx(' form-control border-0', {
                                    'is-invalid': errors?.reference?.typeId
                                })}
                                onChange={({ target: { value } }) => {
                                    SetIsTouched(true);
                                    field.onChange(value);
                                }}
                                value={field.value}
                                onBlur={field.onBlur}
                                ref={inputRefs['reference.typeId']}
                            />
                        )}
                    />
                </div>
                {typeof isValid?.valid === 'boolean' && (
                    <span className="d-flex valid-feedback">{isValid?.message}</span>
                )}
                <span className="d-flex invalid-feedback">{errors?.reference?.message}</span>
            </div>
            <div className="form-group mb-3">
                {!grades.loading && (
                    <>
                        <label htmlFor="" className="form-label required">
                            Niveau :
                        </label>
                        <select
                            name=""
                            className={clsx('form-select', {
                                'is-invalid': errors?.reference?.gradeId
                            })}
                            {...register('reference.gradeId')}
                            value={values?.gradeId}>
                            <option value="">-- Sélectionner --</option>
                            {grades?.page?.nodes?.map((e) => (
                                <option value={e.code} key={e.id}>
                                    {e.label}
                                </option>
                            ))}
                        </select>
                    </>
                )}
                <span className="invalid-feedback">{errors?.reference?.gradeId?.message}</span>
            </div>
            <div className="form-group mb-3">
                {!specialties.loading && (
                    <>
                        <label htmlFor="" className="form-label required">
                            Spécialité :
                        </label>
                        <select
                            className={clsx('form-select', {
                                'is-invalid': errors?.reference?.specialtyId
                            })}
                            {...register('reference.specialtyId')}
                            value={values?.specialtyId}>
                            <option value="">-- Sélectionner --</option>
                            {specialties?.page?.nodes?.map((e) => (
                                <option value={e.code} key={e.id}>
                                    {e.label}
                                </option>
                            ))}
                        </select>
                        <span className="invalid-feedback">
                            {errors?.reference?.specialtyId?.message}
                        </span>
                    </>
                )}
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label required">
                    Domaine :
                </label>
                {!domains.loading && (
                    <select
                        className={clsx('form-select', {
                            'is-invalid': errors?.reference?.domainId
                        })}
                        {...register('reference.domainId')}
                        value={values?.domainId}>
                        <option value="">-- Sélectionner --</option>
                        {domains?.page?.nodes?.map((e) => (
                            <option value={e.code} key={e.id}>
                                {e.label}
                            </option>
                        ))}
                    </select>
                )}
                <span className="invalid-feedback">{errors?.reference?.domainId?.message}</span>
            </div>
            <>
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label required">
                        Groupe :
                    </label>
                    {!groups.loading && (
                        <select
                            className={clsx('form-select', {
                                'is-invalid': errors?.reference?.groupId
                            })}
                            {...register('reference.groupId')}
                            value={values?.groupId}>
                            <option value="">-- Sélectionner --</option>
                            {groups?.page?.nodes
                                ?.filter(({ code }) => code.charAt(0) === values?.domainId)
                                .map((e) => (
                                    <option value={e.code} key={e.id}>
                                        {e.label}
                                    </option>
                                ))}
                        </select>
                    )}
                    <span className="invalid-feedback">{errors?.reference?.groupId?.message}</span>
                </div>
            </>
            <>
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label required">
                        Sous-Groupe :
                    </label>
                    {!subGroups.loading && (
                        <select
                            name=""
                            className={clsx('form-select', {
                                'is-invalid': errors?.reference?.subGroupId
                            })}
                            id=""
                            {...register('reference.subGroupId')}
                            value={values?.subGroupId}>
                            <option value="">-- Sélectionner --</option>
                            {subGroups?.page?.nodes
                                ?.filter(({ code }) => code.substring(0, 2) === values?.groupId)
                                .map((e) => (
                                    <option value={e.code} key={e.id}>
                                        {e.label}
                                    </option>
                                ))}
                        </select>
                    )}
                    <span className="invalid-feedback">
                        {errors?.reference?.subGroupId?.message}
                    </span>
                </div>
            </>

            <div className="form-group mb-3">
                <label htmlFor="" className="form-label required">
                    Type :
                </label>
                {!types.loading && (
                    <Controller
                        name="reference.typeId"
                        control={control}
                        render={({ field }) => (
                            <select
                                className={clsx('form-select', {
                                    'is-invalid': errors?.reference?.typeId
                                })}
                                value={field.value}
                                onBlur={field.onBlur}
                                onChange={({ target: { value } }) => {
                                    SetIsTouched(true);
                                    field.onChange(value);
                                }}>
                                <option value="">-- Sélectionner --</option>
                                {types?.page?.nodes?.map((e) => (
                                    <option value={e.code} key={e.id}>
                                        {e.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                )}
                <span className="invalid-feedback">{errors?.reference?.typeId?.message}</span>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label  required">
                    Fonction :
                </label>
                {!functions.loading && (
                    <Controller
                        name="reference.functionId"
                        control={control}
                        render={({ field }) => (
                            <select
                                name="functionId"
                                className={clsx('form-select', {
                                    'is-invalid': errors?.reference?.functionId
                                })}
                                value={field.value}
                                onBlur={field.onBlur}
                                onChange={({ target: { value } }) => {
                                    SetIsTouched(true);
                                    field.onChange(value);
                                }}>
                                <option value="">-- Sélectionner --</option>
                                {functions?.page?.nodes?.map((e) => (
                                    <option value={e.code} key={e.id}>
                                        {e.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                )}
                <span className="invalid-feedback">{errors?.reference?.functionId?.message}</span>
            </div>
        </div>
    );
};

export default Form;
