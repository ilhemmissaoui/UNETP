import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import useToast from '../../../hooks/use-toast';
import settings from '../../../settings';
const { endpointUrl } = settings;

const Create = ({
    isShow = false,
    toggleIsShow,
    formId,
    prefix,
    collectionLabel,
    label,
    size,
    lastYear,
    updateHook = { updateHook },
    children
}) => {
    const [serverError, setServerError] = useState();
    const { setToast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState();
    const submit = async () => {
        setIsSubmitting(true);
        try {
            await axios.post(`${endpointUrl}/${prefix}`);
            setToast({
                message: `Les ${collectionLabel} ont été créées avec succès`,
                variant: 'success'
            });
            toggleIsShow();
        } catch (e) {
            setServerError(e?.response?.data?.message);
            setToast({
                message: `Erreur lors de création des ${collectionLabel}`,
                variant: 'danger'
            });
        }
        setIsSubmitting(false);
        updateHook();
    };

    return (
        <Modal show={isShow} onHide={toggleIsShow} size={size}>
            <Modal.Header>
                <Modal.Title as="h2">{`Création ${label}`}</Modal.Title>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleIsShow}
                />
            </Modal.Header>
            <Modal.Body scrollable={true}>
                {serverError && <Alert variant="danger">{serverError}</Alert>}
                {children}
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex w-100 justify-content-between">
                    <button className="btn btn-secondary" onClick={toggleIsShow} type="button">
                        <i className="far fa-times-circle fs-4 me-2" />
                        Annuler
                    </button>

                    <button
                        className="btn btn-success"
                        form={formId}
                        onClick={submit}
                        type="submit"
                        disabled={isSubmitting}>
                        <span
                            className={clsx('indicator-label', {
                                'd-none': isSubmitting
                            })}>
                            Créer les cotisations pour l&apos;année {lastYear}
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

export default Create;
