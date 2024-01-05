import clsx from 'clsx';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { useCRUDContext } from '../../../hooks/use-crud';

const Delete = ({
    id,
    isShow = false,
    toggleShow,

    label = 'ce élément',
    size,
    children
}) => {
    const { _delete } = useCRUDContext();
    const [isSubmitting, setIsSubmitting] = useState();
    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            await _delete(id);

            toggleShow();
        } catch (e) {
            console.log(e);
        }
        setIsSubmitting(false);
    };
    return (
        <Modal show={isShow} onHide={toggleShow} size={size}>
            <Modal.Header>
                <Modal.Title className="text-uppercase">
                    <i className="far fa-trash-alt fs-4 me-2" />
                    Supprimer
                </Modal.Title>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleShow}
                />
            </Modal.Header>
            <Modal.Body>
                {children}
                Etes-vous sûr que vous voulez supprimer <b>{label}</b> ?
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex w-100 justify-content-between">
                    <button className="btn btn-secondary" onClick={toggleShow} type="button">
                        <i className="far fa-times-circle fs-4 me-2" />
                        Annuler
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={handleConfirm}
                        type="submit"
                        disabled={isSubmitting}>
                        <span
                            className={clsx('indicator-label', {
                                'd-none': isSubmitting
                            })}>
                            <i className="far fa-trash-alt fs-4 me-2" />
                            Supprimer
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

export default Delete;
