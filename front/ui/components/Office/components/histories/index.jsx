import clsx from 'clsx';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import Form from './Form';
import List from './List';

const Histories = ({ data }) => {
    const [isAdd, setIsAdd] = useState();
    const toggleAdd = () => setIsAdd((v) => !v);
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <div className="h6 align-items-center d-flex">Tableau des historiques :</div>
                <button className="btn btn-sm btn-primary" type="button" onClick={toggleAdd}>
                    <i className="fa fa-plus"></i> Création
                </button>
            </div>
            <List data={data} />

            <Modal show={isAdd} onHide={toggleAdd} size="lg">
                <Modal.Header>
                    <Modal.Title as="h2">Ajout d&apos;une nouvelle historique</Modal.Title>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                </Modal.Header>
                <Modal.Body scrollable={true}>
                    <form>
                        <Form />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex w-100 justify-content-between">
                        <button className="btn btn-secondary" onClick={toggleAdd} type="button">
                            <i className="far fa-times-circle fs-4 me-2" />
                            Annuler
                        </button>
                        <button className="btn btn-success" type="submit" disabled={false}>
                            <span
                                className={clsx('indicator-label', {
                                    'd-none': false
                                })}>
                                <i className="far fa-check-circle fs-4 me-2" />
                                Création
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
        </>
    );
};
export default Histories;
