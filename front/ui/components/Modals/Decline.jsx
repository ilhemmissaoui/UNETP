import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import useToast from '../../../hooks/use-toast';
import settings from '../../../settings';
const { endpointUrl } = settings;

const Delete = ({ id, isShow = false, toggleShow, label = 'ce élément', size, children }) => {
    const [deleteError, setDeleteError] = useState();
    const { setToast } = useToast();
    const { push } = useRouter();
    const [isSubmitting, setIsSubmitting] = useState();
    const submit = async () => {
        setIsSubmitting(true);
        try {
            await axios.post(`${endpointUrl}/request-change/decline/${id}`);
            setToast({
                message: 'demande a été réfusée ',
                variant: 'success'
            });
            toggleShow();
        } catch (e) {
            setDeleteError(e?.message);
            setToast({
                message: 'Erreur lors de la suppression',
                variant: 'danger'
            });
        }
        push(`/`);
        setIsSubmitting(false);
    };
    return (
        <Modal show={isShow} onHide={toggleShow} size={size}>
            <Modal.Header>
                <Modal.Title className="text-uppercase">
                    <i className="fa fa-times fs-4 me-2" />
                    Refuser
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
                Etes-vous sûr que vous voulez refuser <b>{label}</b> ?
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex w-100 justify-content-between">
                    <button className="btn btn-secondary" onClick={toggleShow} type="button">
                        <i className="far fa-times-circle fs-4 me-2" />
                        Annuler
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={submit}
                        type="submit"
                        disabled={isSubmitting}>
                        <span
                            className={clsx('indicator-label', {
                                'd-none': isSubmitting
                            })}>
                            <i className="fa fa-times fs-4 me-2" />
                            Refuser
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
