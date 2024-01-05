import clsx from 'clsx';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFormContext } from 'react-hook-form';

import { useCRUDContext } from '../../../hooks/use-crud';
import useToast from '../../../hooks/use-toast';

const Update = ({ id, isShow, toggleShow, collectionLabel, label, formId, children, size }) => {
    const { setToast } = useToast();
    const { update } = useCRUDContext();
    const {
        handleSubmit,
        formState: { isSubmitting }
    } = useFormContext();

    const handleUpdate = async (item) => {
        try {
            await update({ id, data: item });
            console.log({ id });
            console.log({ item });
            setToast({
                message: `${collectionLabel} a été mis à jour avec succès`,
                variant: 'success'
            });
        } catch (e) {
            setToast({
                message: `Erreur lors de la mise à jour du ${collectionLabel}`,
                variant: 'danger'
            });
        }
        toggleShow();
    };
    return (
        <Modal show={isShow} onHide={toggleShow} size={size}>
            <Modal.Header>
                <Modal.Title>Mise à jour : {label}</Modal.Title>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleShow}
                />
            </Modal.Header>
            <Modal.Body>
                {Array.isArray(children)
                    ? [
                          React.cloneElement(children[0], {
                              onSubmit: handleSubmit(handleUpdate)
                          }),
                          ...children.slice(1)
                      ]
                    : React.cloneElement(children, {
                          onSubmit: handleSubmit(handleUpdate)
                      })}
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex w-100 justify-content-between">
                    <button className="btn btn-secondary" onClick={toggleShow} type="button">
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

export default Update;
