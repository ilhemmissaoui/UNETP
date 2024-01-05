import clsx from 'clsx';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFormContext } from 'react-hook-form';

import { useCRUDContext } from '../../../hooks/use-crud';
import useToast from '../../../hooks/use-toast';
import Alert from '../Alert';

const Add = ({
    isShow,
    customTitle,
    toggleShow,
    collectionLabel,
    collectionLabelPrefix = '',
    formId,
    children,
    size,
    doReset = true,
    onSuccess
}) => {
    const { setToast } = useToast();
    const {
        reset,
        handleSubmit,
        formState: { isSubmitting }
    } = useFormContext();
    const { add } = useCRUDContext();
    const [serverError, setServerError] = useState();
    const handleAdd = async (item, e) => {
        try {
            await add(item, e);
            setToast({
                message: `${collectionLabel} a été ajouté avec succès`,
                variant: 'success'
            });
            if (doReset) reset();
            onSuccess && onSuccess();
            toggleShow();
        } catch (e) {
            console.log({ e });
            setServerError(e?.response?.data?.message);
            setToast({
                message: `Erreur lors de l'ajout du ${collectionLabel}`,
                variant: 'danger'
            });
        }
    };
    const _toggleShow = () => {
        if (doReset) reset();
        toggleShow();
    };
    return (
        <Modal show={isShow} onHide={_toggleShow} size={size}>
            <Modal.Header>
                <Modal.Title as="h2">
                    {customTitle
                        ? customTitle
                        : `Création ${collectionLabelPrefix} ${collectionLabel}`}
                </Modal.Title>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleShow}
                />
            </Modal.Header>
            <Modal.Body scrollable={true}>
                <Alert
                    title={serverError}
                    isShow={serverError?.length}
                    description="Veuillez vérifier les champs et soumettre à nouveau."
                    isDashed
                />
                {Array.isArray(children)
                    ? [
                          React.cloneElement(children[0], {
                              onSubmit: handleSubmit(handleAdd)
                          }),
                          ...children.slice(1)
                      ]
                    : React.cloneElement(children, {
                          onSubmit: handleSubmit(handleAdd)
                      })}
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex w-100 justify-content-between">
                    <button className="btn btn-secondary" onClick={_toggleShow} type="button">
                        <i className="far fa-times-circle fs-4 me-2" />
                        Annuler
                    </button>
                    <button
                        className="btn btn-success"
                        form={formId}
                        type="submit"
                        disabled={isSubmitting}>
                        <span
                            className={clsx('indicator-label', {
                                'd-none': isSubmitting
                            })}>
                            <i className="far fa-check-circle fs-4 me-2" />
                            Enregistrer
                        </span>

                        <span
                            className={clsx('indicator-progress', {
                                'd-block': isSubmitting
                            })}>
                            S&apos;il vous plaît, attendez...
                            <span className="spinner-border spinner-border-sm align-middle ms-2" />
                        </span>
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default Add;
