import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { DataProvider } from '../../../hooks/use-data';

const ViewCore = ({
    isShow,
    toggleIsShow,
    size,
    label,
    customTitle,
    bsPrefix,
    loading,
    data,
    children
}) => {
    return (
        <Modal show={isShow} onHide={toggleIsShow} size={size}>
            <Modal.Header bsPrefix={bsPrefix}>
                <Modal.Title>
                    {customTitle || 'Détails :'} {label}
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
                <DataProvider loading={loading} data={data}>
                    {data ? (
                        children
                    ) : (
                        <div className="d-flex w-100 justify-content-center my-20">
                            <Spinner animation="border" />
                        </div>
                    )}
                </DataProvider>
            </Modal.Body>
        </Modal>
    );
};
export default ViewCore;
