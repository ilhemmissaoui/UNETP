import clsx from 'clsx';
import moment from 'moment';
import React, { useState } from 'react';
import { Alert, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

import useToast from '../../../../../hooks/use-toast';
import Form from './Form';

const DTRow = ({ data }) => {
    const { setToast } = useToast();

    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };

    const [isSubmitting, setIsSubmitting] = useState();
    const [deleteError, setDeleteError] = useState();
    const handleConfirm = async () => {
        setIsSubmitting(true);
        try {
            toggleIsDelete();
        } catch (e) {
            setDeleteError(e?.message);
            setToast({
                message: `Erreur lors de la suppression`,
                variant: 'danger'
            });
        }
        setIsSubmitting(false);
    };

    return (
        <>
            <tr className="align-middle text-center fs-8 text-gray-800">
                <td>{data?.type}</td>
                <td>{data?.label}</td>

                <td>{moment().format('DD/MM/YYYY HH:mm')}</td>
                <td>{data?.comment}</td>
                <td className="text-center sm">
                    <div className="btn-group">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                            <button
                                type="button"
                                className="btn btn-primary btn-icon btn-sm"
                                onClick={toggleIsUpdate}>
                                <i className="fa fa-edit"></i>
                            </button>
                        </OverlayTrigger>

                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-archive">Archiver</Tooltip>}>
                            <button
                                type="button"
                                className="btn btn-danger btn-icon btn-sm"
                                onClick={toggleIsDelete}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </OverlayTrigger>
                    </div>
                </td>
            </tr>

            <Modal show={isUpdate} onHide={toggleIsUpdate} size="lg">
                <Modal.Header>
                    <Modal.Title as="h2">Modifier </Modal.Title>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={toggleIsUpdate}
                    />
                </Modal.Header>
                <Modal.Body scrollable={true}>
                    <form>
                        <Form />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex w-100 justify-content-between">
                        <button
                            className="btn btn-secondary"
                            onClick={toggleIsUpdate}
                            type="button">
                            <i className="far fa-times-circle fs-4 me-2" />
                            Annuler
                        </button>
                        <button className="btn btn-success" type="submit" disabled={false}>
                            <span
                                className={clsx('indicator-label', {
                                    'd-none': false
                                })}>
                                <i className="far fa-check-circle fs-4 me-2" />
                                Modifier
                            </span>

                            <span
                                className={clsx('indicator-progress', {
                                    'd-block': false
                                })}>
                                Attendez...
                                <span className="spinner-border spinner-border-sm align-middle ms-2" />
                            </span>
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal show={isDelete} onHide={toggleIsDelete}>
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
                        onClick={toggleIsDelete}
                    />
                </Modal.Header>
                <Modal.Body>
                    {deleteError && <Alert variant="danger">{deleteError}</Alert>}
                    Etes-vous sûr de vouloir supprimer ?
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex w-100 justify-content-between">
                        <button
                            className="btn btn-secondary"
                            onClick={toggleIsDelete}
                            type="button">
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
                                supprimer{' '}
                            </span>
                            <span
                                className={clsx('indicator-progress', {
                                    'd-block': isSubmitting
                                })}>
                                Attendez...
                                <span className="spinner-border spinner-border-sm align-middle ms-2" />
                            </span>
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DTRow;
