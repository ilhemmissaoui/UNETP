import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import Select from 'react-select';

import useAuth from '../../../../hooks/use-auth';
import useCRUD from '../../../../hooks/use-crud';
import { memberType } from '../../../../schemas/establishmentSchema';
import { mixedTypes } from '../../../../schemas/establishmentSchema';
import settings from '../../../../settings';
import Coordinates from '../../../components/SharedComponents/Coordinates';
import EstablishmentChildren from './Establishments';
import StudentHistory from './StudentHistory';

const { endpointUrl } = settings;

const GlobalInfo = ({ isUpdate = false }) => {
    const { user } = useAuth();

    const [isAvailable, setIsAvailable] = useState();
    const [availableName, setAvailableName] = useState();

    const addForm = useFormContext();
    const {
        register,
        formState: { errors },
        control,
        watch,
        setValue
    } = addForm;

    const departments = useCRUD({
        singleName: 'department',
        pluralName: 'departments',
        pageSize: null
    });
    const accademies = useCRUD({
        singleName: 'academy',
        pluralName: 'academies',
        pageSize: null
    });
    const delegations = useCRUD({
        singleName: 'delegation',
        pluralName: 'delegations',
        pageSize: null
    });
    const establishmentLabels = useCRUD({
        singleName: 'establishment-label',
        pluralName: 'establishment-labels',
        pageSize: null
    });
    const guardianships = useCRUD({
        singleName: 'guardianship',
        pluralName: 'guardianships',
        pageSize: null
    });
    const pensions = useCRUD({
        singleName: 'pension',
        pluralName: 'pensions',
        pageSize: null
    });
    const countries = useCRUD({
        singleName: 'country',
        pluralName: 'countries',
        pageSize: null
    });
    const organizationId = watch('organization.id');
    const checkNameAvailability = async (name) => {
        if (name?.length) {
            const { data } = await axios.get(
                `${endpointUrl}/establishments/availability/by-name/${name}${
                    organizationId ? `?exclude=${organizationId}` : ''
                }`
            );
            setAvailableName(data?.data?.isAvailable);
        }
    };

    const checkKeyAvailability = async (value) => {
        if (value?.replace('_', '').length === 7) {
            const { data } = await axios.get(
                `${endpointUrl}/establishments/availability/by-key/${value}${
                    organizationId ? `?exclude=${organizationId}` : ''
                }`
            );
            setIsAvailable(data?.data?.isAvailable);
        }
    };
    const reAddedAt = watch('reAddedAt');
    const resignation = watch('resignation');
    const addEntry = (field) => () => setValue(field, [undefined, ...(watch(field) || [])]);
    const deleteEntry = (field, index) => () =>
        setValue(
            field,
            (watch(field) || []).filter((e, i) => i !== index)
        );
    return (
        <>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label htmlFor="" className="form-label">
                                Membres :
                            </label>
                            <select name="members" className="form-select" {...register('members')}>
                                {Object.entries(memberType).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            <span className=" invalid-feedback">{errors?.members?.message}</span>
                        </div>{' '}
                    </div>
                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label htmlFor="" className="form-label required">
                                Clé de la structure d&apos;établissement :
                            </label>
                            <Controller
                                name="establishmentKey"
                                control={addForm.control}
                                render={({ field }) => (
                                    <NumberFormat
                                        allowEmptyFormatting={false}
                                        format="#######"
                                        mask="_"
                                        type="text"
                                        className={clsx('form-control', {
                                            'is-invalid':
                                                errors?.establishmentKey ||
                                                (typeof isAvailable === 'boolean' && !isAvailable),
                                            'is-valid': isAvailable
                                        })}
                                        onChange={({ target: { value } }) => {
                                            checkKeyAvailability(value);
                                            field.onChange(value);
                                        }}
                                        value={field.value}
                                        ref={field.ref}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />

                            <span className="valid-feedback">
                                {typeof isAvailable === 'boolean' &&
                                    !errors?.establishmentKey &&
                                    isAvailable &&
                                    'Ce clé est disponible'}
                            </span>
                            <span className="invalid-feedback">
                                {typeof isAvailable === 'boolean' && !isAvailable
                                    ? 'Ce clé est pris'
                                    : errors?.establishmentKey?.message}
                            </span>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label htmlFor="" className="form-label required">
                                N° de la structure d&apos;établissement :
                            </label>
                            <Controller
                                name="establishmentNumber"
                                control={addForm.control}
                                render={({ field }) => (
                                    <NumberFormat
                                        allowEmptyFormatting={false}
                                        format="######"
                                        mask="_"
                                        type="text"
                                        className={clsx('form-control', {
                                            'is-invalid': errors?.establishmentNumber
                                        })}
                                        onChange={({ target: { value } }) => {
                                            field.onChange(value);
                                        }}
                                        value={field.value}
                                        ref={field.ref}
                                        onBlur={field.onBlur}
                                        {...field}
                                    />
                                )}
                            />

                            <span className="invalid-feedback d-flex">
                                {errors?.establishmentNumber?.message}
                            </span>
                        </div>{' '}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            Nom de la structure d&apos;établissement :
                        </label>

                        <Controller
                            name="organization.name"
                            control={addForm.control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    name="organization.name"
                                    className={clsx('form-control', {
                                        'is-invalid':
                                            errors?.organization?.name ||
                                            (typeof availableName === 'boolean' && !availableName),
                                        'is-valid': availableName
                                    })}
                                    onChange={({ target: { value } }) => {
                                        if (value) checkNameAvailability(value);
                                        field.onChange(value);
                                    }}
                                    value={field.value}
                                    ref={field.ref}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                        <span className="valid-feedback">
                            {typeof availableName === 'boolean' &&
                                !errors?.organization?.name &&
                                availableName &&
                                'Ce nom est disponible'}
                        </span>
                        <span className="invalid-feedback">
                            {typeof availableName === 'boolean' && !availableName
                                ? 'Ce nom est pris'
                                : errors?.organization?.name?.message}
                        </span>
                    </div>
                </div>
                <div className="separator border-secondary  my-5"></div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            {!departments?.loading && (
                                <>
                                    <label htmlFor="" className="form-label">
                                        Département :
                                    </label>
                                    <select
                                        name="departmentId"
                                        className={clsx('form-select', {
                                            'is-invalid': errors?.departmentId
                                        })}
                                        {...register('departmentId')}>
                                        <option selected value={0}>
                                            - Sélectionner -
                                        </option>
                                        {departments?.page?.nodes?.map(({ label, id }, key) => (
                                            <option key={key} value={id}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                    <span className=" invalid-feedback">
                                        {errors?.departmentId?.message}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            {!accademies?.loading && (
                                <>
                                    <label htmlFor="" className="form-label ">
                                        Académie :
                                    </label>
                                    <select
                                        name="departmentId"
                                        className="form-select"
                                        {...register('academyId')}>
                                        <option selected value={0}>
                                            {' '}
                                            - Sélectionner -
                                        </option>
                                        {accademies?.page?.nodes?.map(({ id, name }, key) => (
                                            <option key={key} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className=" invalid-feedback">
                                        {errors?.academyId?.message}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            {!delegations?.loading && (
                                <>
                                    <label htmlFor="" className="form-label ">
                                        Délégation régionale :
                                    </label>
                                    <select
                                        name="delegationId"
                                        className="form-select"
                                        {...register('delegationId')}>
                                        <option selected value={0}>
                                            {' '}
                                            - Sélectionner -
                                        </option>
                                        {delegations?.page?.nodes?.map((e, key) => {
                                            return (
                                                <option key={key} value={e?.organizationId}>
                                                    {e?.organization?.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <span className=" invalid-feedback">
                                        {errors?.delegationId?.message}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group mb-3">
                            <label htmlFor="" className="form-label">
                                N° académique LP :
                            </label>
                            <input
                                type="text"
                                className={clsx('form-control', {
                                    'is-invalid': errors?.numAcadLP
                                })}
                                name="numAcadLP"
                                {...register('numAcadLP')}
                            />
                            <span className="invalid-feedback">{errors?.numAcadLP?.message}</span>
                        </div>{' '}
                    </div>
                    <div className="col-md-3">
                        <div className="form-group mb-3">
                            <label htmlFor="" className="form-label">
                                N° académique LT :
                            </label>
                            <input
                                type="text"
                                className={clsx('form-control', {
                                    'is-invalid': errors?.numAcadLT
                                })}
                                name="numAcadLT"
                                {...register('numAcadLT')}
                            />
                            <span className="invalid-feedback">{errors?.numAcadLT?.message}</span>
                        </div>{' '}
                    </div>
                    <div className="col-md-3">
                        <div className="form-group mb-3">
                            <label htmlFor="" className="form-label">
                                N° académique CFA :
                            </label>
                            <input
                                type="text"
                                className={clsx('form-control', {
                                    'is-invalid': errors?.numAcadCFA
                                })}
                                name="numAcadCFA"
                                {...register('numAcadCFA')}
                            />
                            <span className="invalid-feedback">{errors?.numAcadCFA?.message}</span>
                        </div>{' '}
                    </div>
                    <div className="col-md-3">
                        <div className="form-group mb-3">
                            <label htmlFor="" className="form-label">
                                N° de déclaration d&apos;existence CFP :
                            </label>
                            <input
                                type="text"
                                className={clsx('form-control', {
                                    'is-invalid': errors?.numExistanceCFP
                                })}
                                name="numExistanceCFP"
                                {...register('numExistanceCFP')}
                            />
                            <span className="invalid-feedback">
                                {errors?.numExistanceCFP?.message}
                            </span>
                        </div>{' '}
                    </div>
                </div>
                <div className="separator border-secondary  my-5"></div>
                <div className="col-md-12">
                    {!establishmentLabels?.loading && (
                        <>
                            <label htmlFor="" className="form-label">
                                Labels :
                            </label>
                            <Controller
                                name="labels"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        isMulti
                                        {...field}
                                        options={establishmentLabels?.page?.nodes?.map(
                                            ({ label, id }) => ({
                                                label,
                                                value: id
                                            })
                                        )}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">{errors?.labels?.message}</span>
                        </>
                    )}
                </div>
                <div className="separator border-secondary  my-5"></div>
                {user?.role === 100 ? (
                    <>
                        <div className=" col-md-12 form-group mb-5">
                            <label htmlFor="" className="form-label">
                                Date d&apos;adhésion :
                            </label>
                            <input
                                type="Date"
                                className={clsx('form-control', {
                                    'is-invalid': errors?.accessDate
                                })}
                                name="accessDate"
                                {...register('accessDate')}
                            />

                            <span className="invalid-feedback">{errors?.accessDate?.message}</span>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-between mb-4">
                                    <label htmlFor="" className="form-label">
                                        Date de réadhésion :
                                    </label>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        type="button"
                                        onClick={addEntry('reAddedAt')}>
                                        <i className="fa fa-plus me-2"></i>
                                        Ajouter une nouvelle date
                                    </button>
                                </div>
                                {reAddedAt?.map((e, i) => (
                                    <div className="mb-3" key={e}>
                                        <div className="input-group">
                                            <span className="input-group-text fw-bolder">
                                                # {i + 1}
                                            </span>
                                            <input
                                                type="Date"
                                                className={clsx('form-control', {
                                                    'is-invalid':
                                                        errors?.reAddedAt && errors?.reAddedAt[i]
                                                })}
                                                {...register(`reAddedAt.${i}`)}
                                            />
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="tooltip-edit">Supprimer</Tooltip>
                                                }>
                                                <button
                                                    className="btn btn-danger btn-icon"
                                                    type="button"
                                                    onClick={deleteEntry('reAddedAt', i)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </OverlayTrigger>
                                        </div>
                                        <span className="invalid-feedback">
                                            {errors?.reAddedAt && errors?.reAddedAt[i]?.message}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex justify-content-between mb-4">
                                    <label htmlFor="" className="form-label">
                                        Date de démission :
                                    </label>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        type="button"
                                        onClick={addEntry('resignation')}>
                                        <i className="fa fa-plus me-2"></i>
                                        Ajouter une nouvelle date
                                    </button>
                                </div>
                                {resignation?.map((e, i) => (
                                    <div className="mb-3" key={e}>
                                        <div className="input-group">
                                            <span className="input-group-text fw-bolder">
                                                # {i + 1}
                                            </span>
                                            <input
                                                type="Date"
                                                className={clsx('form-control', {
                                                    'is-invalid':
                                                        errors?.resignation &&
                                                        errors?.resignation[i]
                                                })}
                                                {...register(`resignation.${i}`)}
                                            />
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="tooltip-edit">Supprimer</Tooltip>
                                                }>
                                                <button
                                                    className="btn btn-danger btn-icon"
                                                    type="button"
                                                    onClick={deleteEntry('resignation', i)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </OverlayTrigger>
                                        </div>
                                        <span className="invalid-feedback">
                                            {errors?.resignation && errors?.resignation[i]?.message}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div></div>
                )}
            </div>
            <div className="separator border-secondary  my-5"></div>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2 mb-3">
                    Coordonnées de l’organisme de gestion :
                </span>
                <div className="row mb-5">
                    <div className="col-md-4">
                        <label
                            htmlFor=""
                            className={clsx('form-label', {
                                required: user?.role !== 100
                            })}>
                            Nom :
                        </label>

                        <input
                            type="text"
                            className={clsx('form-control', { 'is-invalid': errors?.ogecName })}
                            {...register('ogecName')}
                        />
                        <span className="invalid-feedback">{errors?.ogecName?.message}</span>
                    </div>
                    <div className="col-md-4">
                        <label
                            htmlFor=""
                            className={clsx('form-label', {
                                required: user?.role !== 100
                            })}>
                            Numéro de téléphone :
                        </label>
                        <Controller
                            name="ogecPhoneNumber"
                            control={control}
                            render={({ field }) => (
                                <NumberFormat
                                    allowEmptyFormatting={false}
                                    format="## ## ## ## ##"
                                    mask="x"
                                    type="tel"
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.ogecPhoneNumber
                                    })}
                                    onChange={({ target: { value } }) => {
                                        field.onChange(value);
                                    }}
                                    value={field.value}
                                    ref={field.ref}
                                    onBlur={field.onBlur}
                                    {...field}
                                />
                            )}
                        />
                        <span className="invalid-feedback">{errors?.ogecPhoneNumber?.message}</span>
                    </div>
                    <div className="col-md-4">
                        <label
                            htmlFor="ogecAddress"
                            className={clsx('form-label', {
                                required: user?.role !== 100
                            })}>
                            Code postal :
                        </label>
                        <input
                            id="ogecAddress"
                            type="text"
                            className={clsx('form-control', { 'is-invalid': errors?.ogecAddress })}
                            {...register('ogecAddress')}
                        />
                        <span className="invalid-feedback">{errors?.ogecAddress?.message}</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label
                            htmlFor=""
                            className={clsx('form-label', {
                                required: user?.role !== 100
                            })}>
                            Ville :
                        </label>

                        <input
                            type="text"
                            name="ogecCity"
                            className={clsx('form-control', {
                                'is-invalid': errors?.ogecCity
                            })}
                            {...register('ogecCity')}
                        />
                        <span className="invalid-feedback">{errors?.ogecCity?.message}</span>
                    </div>
                    <div className="col-md-4">
                        <label
                            htmlFor=""
                            className={clsx('form-label', {
                                required: user?.role !== 100
                            })}>
                            E-Mail :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.ogecEmail
                            })}
                            {...register('ogecEmail')}
                        />
                        <span className="invalid-feedback">{errors?.ogecEmail?.message}</span>
                    </div>
                </div>
            </div>
            <div className="separator border-secondary  my-5"></div>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2 mb-3">
                    Coordonnées de l&apos;établissement :
                </span>
                <FormProvider {...addForm}>
                    <Coordinates title="Tableau des coordonnées :" />
                </FormProvider>
            </div>
            <div className="separator border-secondary  my-5"></div>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2 mb-3">
                    Informations complémentaires :
                </span>
                <div className=" col-md-12 form-group mb-3">
                    <label htmlFor="" className="form-label">
                        Mixité :
                    </label>
                    <select name="mixed" className="form-select" {...register('mixed')}>
                        {Object.entries(mixedTypes).map(([key, value]) => {
                            return (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            );
                        })}
                    </select>
                    <span className="invalid-feedback">{errors?.mixed?.message}</span>
                </div>
                <div className="col-md-12 form-group mb-3">
                    {!guardianships?.loading && (
                        <>
                            <label htmlFor="" className="form-label">
                                Tutelle :{' '}
                            </label>
                            <Controller
                                name="guardianships"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        isMulti
                                        {...field}
                                        isSearchable
                                        options={guardianships?.page?.nodes?.map(
                                            ({ label, id }) => ({
                                                label,
                                                value: id
                                            })
                                        )}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">
                                {errors?.guardianships?.message}
                            </span>
                        </>
                    )}
                </div>
                <div className="col-md-12 form-group mb-3">
                    {!pensions?.loading && (
                        <>
                            <label htmlFor="" className="form-label">
                                Pension :
                            </label>
                            <Controller
                                name="pensions"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        isMulti
                                        {...field}
                                        isSearchable
                                        options={pensions?.page?.nodes?.map(({ label, id }) => ({
                                            label,
                                            value: id
                                        }))}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">{errors?.pensions?.message}</span>
                        </>
                    )}
                </div>
                <div className="col-md-12 form-group mb-3">
                    {!countries?.loading && (
                        <>
                            <label htmlFor="" className="form-label">
                                Jumelage :
                            </label>
                            <Controller
                                name="parings"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        isMulti
                                        {...field}
                                        isSearchable
                                        options={countries?.page?.nodes?.map(({ label, id }) => ({
                                            label,
                                            value: id
                                        }))}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">{errors?.parings?.message}</span>
                        </>
                    )}
                </div>
                <div className="col-md-12 form-group mb-3">
                    {!countries?.loading && (
                        <>
                            <label htmlFor="" className="form-label">
                                Partenaire :
                            </label>
                            <Controller
                                name="partners"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        isMulti
                                        {...field}
                                        isSearchable
                                        options={countries?.page?.nodes?.map(({ label, id }) => ({
                                            label,
                                            value: id
                                        }))}
                                    />
                                )}
                            />
                            <span className="invalid-feedback">{errors?.partners?.message}</span>
                        </>
                    )}
                </div>
            </div>
            <div className="separator border-secondary  my-5"></div>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                    Nombre d&apos;apprenants :
                </span>
                <FormProvider {...addForm}>
                    <StudentHistory
                        isUpdate={isUpdate}
                        title="Tableau des historiques des nombres d'élèves, d'apprentis, etc. :"
                    />
                </FormProvider>
            </div>
            <div className="separator border-secondary  my-5"></div>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                    Établissements rattachés
                </span>
                <FormProvider {...addForm}>
                    <EstablishmentChildren title="Tableau des établissement rattachés (enfants) :" />
                </FormProvider>
            </div>
            <div className="separator border-secondary  my-5"></div>

            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2 mb-3">
                    Commentaires :
                </span>
                {user?.role === 100 ? (
                    <div className="col-md-12 form-group mb-3">
                        <label htmlFor="" className="form-label">
                            Commentaires UNETP confidentiel :
                        </label>
                        <textarea
                            className="form-control"
                            name="privateComment"
                            {...register('privateComment')}></textarea>
                        <span className="invalid-feedback">{errors?.privateComment?.message}</span>
                    </div>
                ) : (
                    <div></div>
                )}
                <div className="col-md-12 form-group mb-3">
                    <label htmlFor="" className="form-label">
                        Commentaires publiés sur le site Internet :
                    </label>
                    <textarea
                        className="form-control"
                        name="comments"
                        {...register('comments')}></textarea>
                    <span className="invalid-feedback">{errors?.comments?.message}</span>
                </div>
            </div>
        </>
    );
};

export default GlobalInfo;
