import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import useToast from '../../../hooks/use-toast';
import settings from '../../../settings';
const { endpointUrl } = settings;

const Remove = ({
    id,
    singleName,
    isShow = false,
    toggleShow,
    collectionLabel = 'Élément',
    label = 'ce élément',
    size,
    prefix,
    children
}) => {
    const [deleteError, setDeleteError] = useState();
    const { setToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState();

    const handleConfirm = async () => {
        setIsSubmitting(true);

        try {
            await axios.post(
                `${endpointUrl}/${prefix?.length ? `/${prefix}` : ''}${id ? `/${id}` : ''}`
            );
            setToast({
                message: `${collectionLabel} supprimé avec succès`,
                variant: 'success'
            });
            toggleShow();
        } catch (e) {
            if (e?.response?.data?.message === 'SequelizeForeignKeyConstraintError') {
                setDeleteError(
                    'Impossible de supprimer cet élément car il a des éléments dépendants'
                );
            } else {
                setDeleteError(e?.message);
            }
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
                    Confirmation de suppression
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
                {deleteError && <Alert variant="danger">{deleteError}</Alert>}
                <b>{label}</b> sera définitivement supprimé. Êtes-vous sûr(e) de vouloir continuer?
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

export default Remove;
