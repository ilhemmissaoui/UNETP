import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import { useCRUDContext } from '../../../hooks/use-crud';
import useToast from '../../../hooks/use-toast';
import settings from '../../../settings';

const { endpointUrl } = settings;

const Restore = ({
    _id,
    isShow = false,
    toggleShow,
    collectionLabel = 'Item',
    label = 'ce élément ',
    size,
    prefix
}) => {
    const { refetch } = useCRUDContext();
    const [suspendError, setSuspendError] = useState();
    const { setToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState();
    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            await axios.post(`${endpointUrl}/${prefix}/restore/${_id}`);
            refetch();
            setToast({
                message: `${collectionLabel} restauré avec succès`,
                variant: 'success'
            });
            toggleShow();
        } catch (e) {
            setSuspendError(e?.message);
            setToast({
                message: `Erreur lors de la restauration du  ${collectionLabel}`,
                variant: 'danger'
            });
        }
        setIsSubmitting(false);
    };
    useEffect(() => {
        setSuspendError();
    }, [isShow]);
    return (
        <Modal show={isShow} onHide={toggleShow} size={size}>
            <Modal.Header>
                <Modal.Title>Restaurer</Modal.Title>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleShow}
                />
            </Modal.Header>
            <Modal.Body>
                {suspendError && <Alert variant="danger">{suspendError}</Alert>}
                Etes-vous sûr que vous voulez restaurer <b>{label}</b> ?
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex w-100 justify-content-between">
                    <button className="btn btn-secondary" onClick={toggleShow} type="button">
                        Annuler
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={handleConfirm}
                        type="submit"
                        disabled={isSubmitting}>
                        <span
                            className={clsx('indicator-label', {
                                'd-none': isSubmitting
                            })}>
                            Restaurer
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

export default Restore;
