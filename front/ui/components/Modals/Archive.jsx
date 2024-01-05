import clsx from 'clsx';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import { useCRUDContext } from '../../../hooks/use-crud';
import useToast from '../../../hooks/use-toast';

const Archive = ({
    id,
    singleName,
    isShow = false,
    toggleShow,
    collectionLabel = 'Élément',
    label = 'cet élément',
    size,
    children
}) => {
    const [archiveError, setArchiveError] = useState();
    const { _delete } = useCRUDContext();
    const { setToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState();
    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            console.log({ id });
            await _delete(id);

            setToast({
                message: `${collectionLabel} supprimé avec succès`,
                variant: 'success'
            });
            toggleShow();
        } catch (e) {
            setArchiveError(e?.message);
            setToast({
                message: `Erreur lors de la suppression du ${singleName}`,
                variant: 'danger'
            });
        }
        setIsSubmitting(false);
    };
    return (
        <Modal show={isShow} onHide={toggleShow} size={size}>
            <Modal.Header>
                <Modal.Title className="text-uppercase">
                    <i className="far fa-trash-alt fs-4 me-2" />
                    Confirmation d&apos;archivage
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
                {archiveError && <Alert variant="danger">{archiveError}</Alert>}
                Êtes-vous sûr(e) de vouloir archiver <b>{label}</b> ?
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
                            Archiver
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

export default Archive;
