import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm, useFormContext } from 'react-hook-form';

import { amountSchema } from '../../../../schemas/subscriptionFeeSchema';
import { FormatPrice } from '../../../utils/currency';
const Edit = ({ isShow, toggleShow, size, formId, customTitle }) => {
    const editFrom = useFormContext();
    const { watch, setValue } = editFrom;

    const data = watch();

    const handelEdit = (data) => {
        setValue('customAmount', data?.customAmount);
        toggleShow();
    };
    const updateForm = useForm({
        resolver: yupResolver(amountSchema)
    });

    const {
        reset,
        register,
        formState: { errors },
        handleSubmit
    } = updateForm;
    useEffect(() => {
        reset({ customAmount: data?.customAmount });
    }, [data?.customAmount]);

    return (
        <>
            <Modal show={isShow} onHide={toggleShow} size={size}>
                <Modal.Header>
                    <Modal.Title>{customTitle}</Modal.Title>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={toggleShow}
                    />
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group mb-3">
                        <label className="fw-bold">
                            Montant calculé : <FormatPrice value={data?.calculatedAmount} />
                        </label>
                    </div>
                    <div className="from-group mb-3">
                        <label htmlFor="customAmount" className="fw-bold from-label">
                            Montant personnalisé :
                        </label>
                        <input
                            type="number"
                            className={clsx('form-control', { 'is-invalid': errors?.customAmount })}
                            id="customAmount"
                            {...register('customAmount')}
                        />
                        <span className="invalid-feedback">{errors?.customAmount?.message}</span>
                    </div>
                    <div className="notice bg-light-success border-dashed border-success rounded border p-3 mb-3">
                        Si vous saisissez un montant personnalisé, il primera sur le montant
                        calculé. Cela signifie que c&apos;est celui là qui sera utilisé pour la
                        gestion de cette cotisation.
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex w-100 justify-content-between">
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={toggleShow}
                            type="button">
                            <i className="far fa-times-circle fs-4 me-2" />
                            Annuler
                        </button>
                        <button
                            className="btn btn-sm btn-success"
                            form={formId}
                            onClick={handleSubmit(handelEdit)}
                            type="button">
                            <span className={clsx('indicator-label')}>
                                <i className="far fa-check-circle fs-4 me-2" />
                                Enregistrer
                            </span>
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default Edit;
