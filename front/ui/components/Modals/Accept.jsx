import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import useToast from '../../../hooks/use-toast';
import settings from '../../../settings';
const { endpointUrl } = settings;
const Accept = ({
    id,
    organizationId,
    isShow = false,
    toggleIsShow,
    label = 'ce élément',
    size,
    children
}) => {
    const [deleteError, setDeleteError] = useState();
    const { setToast } = useToast();
    const { push } = useRouter();
    console.log(organizationId);
    const [isSubmitting, setIsSubmitting] = useState();
    const submit = async () => {
        setIsSubmitting(true);
        try {
            await axios.post(`${endpointUrl}/request-change/approve/${id}`, { organizationId });
            setToast({
                message: 'Demande a été acceptée avec succès',
                variant: 'success'
            });
            toggleIsShow();
        } catch (e) {
            setDeleteError(e?.message);
            setToast({
                message: "Erreur lors de l'acceptation de la demande",
                variant: 'danger'
            });
        }
        setIsSubmitting(false);
        push(`/`);
    };

    return (
        <Modal show={isShow} onHide={toggleIsShow} size={size}>
            <Modal.Header>
                <Modal.Title className="text-uppercase">
                    <i className="fa fa-check fs-4 me-2" />
                    Accepter
                </Modal.Title>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleIsShow}
                />
            </Modal.Header>
            <Modal.Body>
                {children}
                {deleteError && <Alert variant="danger">{deleteError}</Alert>}
                Etes-vous sûr que vous voulez accepter <b>{label}</b> ?
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex w-100 justify-content-between">
                    <button className="btn btn-secondary" onClick={toggleIsShow} type="button">
                        <i className="far fa-times-circle fs-4 me-2" />
                        Annuler
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={submit}
                        type="submit"
                        disabled={isSubmitting}>
                        <span
                            className={clsx('indicator-label', {
                                'd-none': isSubmitting
                            })}>
                            <i className="fa fa-check fs-4 me-2" />
                            Accepter
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

export default Accept;
