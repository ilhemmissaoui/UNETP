import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../../../hooks/use-crud';
import { FormatPrice } from '../../../../../utils/currency';
const Form = ({ subscriptionFees }) => {
    const [years, setYearValue] = useState();
    const { subscriptionFeeParams } = useMultiCRUDContext();
    const addForm = useFormContext();
    const {
        watch,
        getValues,
        register,
        formState: { errors }
    } = addForm;

    useEffect(() => {
        const year = getValues('subscriptionParam.year');
        const years = subscriptionFeeParams?.page?.nodes?.find((e) => e.year === year);
        setYearValue(years);
    }, [watch()]);
    return (
        <>
            <div className="h5 mb-3">Création une cotisation : </div>

            <div className="row mb-5 d-flex">
                <div className="col-md-12">
                    <label htmlFor="" className="form-label required">
                        Année de Cotisation :
                    </label>
                    {!subscriptionFeeParams.loading && (
                        <select
                            name="year"
                            className={clsx('form-select', {
                                'is-invalid': errors?.year
                            })}
                            {...register('subscriptionParam.year')}>
                            <option value="">Création une année de cotisation...</option>
                            {subscriptionFeeParams.page?.nodes
                                ?.filter((el) => {
                                    return !subscriptionFees.some((f) => {
                                        return f?.subscriptionParam?.year === el?.year;
                                    });
                                })
                                .map((e) => {
                                    const year = parseInt(e.year.split('-')?.[0]);

                                    return year < 2012 ? (
                                        <option key={e?.year} value={e?.year}>
                                            {e.year}{' '}
                                        </option>
                                    ) : null;
                                })}
                        </select>
                    )}
                    <div
                        className={clsx('text-danger', {
                            'is-invalid': errors?.year
                        })}>
                        {errors?.year?.message}
                    </div>
                </div>
            </div>

            <div className="mb-10">
                <div className="d-flex flex-column fv-row">
                    <label htmlFor="" className="form-label required">
                        Montant :
                    </label>
                    <div className="form-check form-check-custom form-check-solid mb-3">
                        <input
                            className="form-check-input me-3"
                            name="radio_input"
                            type="radio"
                            value={'noChoice'}
                            id="noChoice"
                            {...register('calculatedAmount')}
                        />

                        <label className="form-check-label" htmlFor="noChoice">
                            <div className="fw-bolder text-gray-800">Pas de choix</div>
                        </label>
                    </div>
                    <div className="form-check form-check-custom form-check-solid mb-3">
                        <input
                            className="form-check-input me-3"
                            type="radio"
                            name="radio_input"
                            value={years?.headEstablishment}
                            {...register('calculatedAmount')}
                            id="chief"
                        />

                        <label className="form-check-label" htmlFor="chief">
                            <div className="fw-bolder text-gray-800">
                                Chef d&apos;établissement ?{' '}
                                <FormatPrice value={years?.headEstablishment || 0} />
                            </div>
                        </label>
                    </div>
                    <div className="form-check form-check-custom form-check-solid mb-3">
                        <input
                            name="radio_input"
                            className="form-check-input me-3"
                            type="radio"
                            id="oldChief"
                            value={years?.oldHeadEstablishment}
                            {...register('calculatedAmount')}
                        />

                        <label className="form-check-label" htmlFor="oldChief">
                            <div className="fw-bolder text-gray-800">
                                Ancien chef d&apos;établissement ?{' '}
                                <FormatPrice value={years?.oldHeadEstablishment || 0} />
                            </div>
                        </label>
                    </div>
                    <div className="form-check form-check-custom form-check-solid mb-3">
                        <input
                            className="form-check-input me-3"
                            name="radio_input"
                            type="radio"
                            value={years?.otherLeader}
                            id="leader"
                            {...register('calculatedAmount')}
                        />
                        <label className="form-check-label" htmlFor="leader">
                            <div className="fw-bolder text-gray-800">
                                Autre dirigeant ? <FormatPrice value={years?.otherLeader || 0} />
                            </div>
                        </label>
                    </div>
                    <div
                        className={clsx('text-danger', {
                            'is-invalid': errors?.calculatedAmount
                        })}>
                        {errors?.calculatedAmount?.message}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Form;
