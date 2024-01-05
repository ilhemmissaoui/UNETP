import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../../hooks/use-crud';
import { paymentMethods } from '../../../../../schemas/subscriptionFeeSchema';
import { FormatPrice } from '../../../../utils/currency';

const Form = ({ totalUnpaid }) => {
    const addForm = useFormContext();
    const {
        register,
        watch,
        formState: { errors }
    } = addForm;
    const { entities } = useMultiCRUDContext();
    const data = watch();

    return (
        <>
            <div className="form-group mb-3">
                <label className="form-label" htmlFor="refrence">
                    Référence :
                </label>
                <input
                    {...register('reference')}
                    type="text"
                    id="refrence"
                    className={clsx('form-control', { 'is-invalid': errors?.reference })}
                />
                <span className="invalid-feedback">{errors?.reference?.message}</span>
            </div>
            <div className="form-group mb-3">
                <label className="form-label required" htmlFor="mode">
                    Mode de paiement :
                </label>
                <select
                    {...register('paimentType')}
                    type="text"
                    id="mode"
                    className={clsx('form-select', {
                        'is-invalid d-flex': errors?.paimentType
                    })}>
                    <option value={0}>Sélectionner...</option>
                    {Object.entries(paymentMethods).map(([value], i) => {
                        return (
                            <option key={i} value={value}>
                                {value}
                            </option>
                        );
                    })}
                </select>
                <span className="invalid-feedback">{errors?.paimentType?.message}</span>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label" htmlFor="depositDate">
                        Date de dépot :
                    </label>
                    <input
                        {...register('depositDate')}
                        type="date"
                        id="depositDate"
                        className={clsx('form-control', { 'is-invalid': errors?.depositDate })}
                    />
                    <span className="invalid-feedback">{errors?.depositDate?.message}</span>
                </div>

                <div className="col-md-6">
                    <label className="form-label" htmlFor="cashedDate">
                        Date d&apos;encaissement :
                    </label>
                    <input
                        {...register('cashedDate')}
                        type="date"
                        id="cashedDate"
                        className={clsx('form-control', { 'is-invalid': errors?.cashedDate })}
                    />
                    <span className="invalid-feedback">{errors?.cashedDate?.message}</span>
                </div>
            </div>

            <div className="notice bg-light-success border-dashed  border-success rounded border p-3 mb-3">
                <div className="row mt-5">
                    <div className="col-md-2 text-gray-700 fs-6 fw-bolder">Type de cotisation</div>
                    <div className="col-md-4 text-gray-700 fs-6 fw-bolder">Nom</div>
                    <div className="col-md-3 text-gray-700 fs-6 fw-bolder">Solde</div>
                    <div className="col-md-3 text-gray-700 fs-6 fw-bolder">Versement</div>
                </div>
                {data?.enitiesPayments?.map((e, i) => {
                    if (e?.type === 'organization') {
                        const organization = entities.find((a) => a.id === e.entityId);
                        return (
                            <div className="row" key={e.id}>
                                <div className="col-md-2 text-gray-700 fs-6 fw-bolder my-5">
                                    établissement
                                </div>
                                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">
                                    {organization?.name}{' '}
                                    <span className="badge badge-primary">
                                        {' '}
                                        {organization?.establishment?.establishmentKey}
                                    </span>
                                </div>
                                <div className="col-md-3 text-gray-700 fs-6 fw-bolder my-5">
                                    <FormatPrice value={totalUnpaid || 0} />
                                </div>
                                <div className="col-md-3 text-gray-700 fs-6 fw-bolder my-2">
                                    <div className="form-group">
                                        <div className="input-group mb-5">
                                            <input
                                                type="number"
                                                step="any"
                                                className={clsx('form-control', {
                                                    'is-invalid': errors?.amount
                                                })}
                                                {...register(`enitiesPayments.${i}.amount`)}
                                            />
                                            <span className="input-group-text">€</span>
                                        </div>

                                        <span className="fw-normal  invalid-feedback">
                                            {errors?.amount?.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    const user = entities.find((a) => a.id === e.entityId);
                    return (
                        <div className="row" key={e.id}>
                            <div className="col-md-2 text-gray-700 fs-6 fw-bolder my-5">
                                personnelle
                            </div>
                            <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">
                                {`${user?.civility?.abbreviation} ${user?.firstName} ${user?.lastName} `}
                            </div>
                            <div className="col-md-3 text-gray-700 fs-6 fw-bolder my-5">
                                <FormatPrice value={0} />
                            </div>
                            <div className="col-md-3 text-gray-700 fs-6 fw-bolder  my-5">
                                <FormatPrice value={e.amount || 0} />
                            </div>
                        </div>
                    );
                })}

                <div className="row">
                    <div className="col-md-6 text-gray-900 fs-6 fw-bolder border-top">
                        Solde total :
                    </div>
                    <div className="col-md-3 text-gray-900 fs-6 fw-bolder">
                        {' '}
                        <FormatPrice value={totalUnpaid || 0} />
                    </div>
                </div>
            </div>
            <div className="form-group mb-3">
                <label className="form-label" htmlFor="comment">
                    Commentaire :
                </label>
                <textarea
                    {...register('comment')}
                    type="text"
                    id="comment"
                    className={clsx('form-control', { 'is-invalid': errors?.comment })}
                />
                <span className="invalid-feedback">{errors?.comment?.message}</span>
            </div>
        </>
    );
};
export default Form;
