import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import networkSchema from '../../../../schemas/networkSchema';
import Coordinates from '../../SharedComponents/Coordinates';

const GlobalInfo = ({ data, title }) => {
    const addForm = useForm({
        resolver: yupResolver(networkSchema)
        // defaultValues: data
    });
    const {
        register,
        formState: { errors }
    } = addForm;

    const [isUpdate, setIsUpdate] = useState();
    const toggleUpdate = () => setIsUpdate((v) => !v);

    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <div className="h6 align-items-center d-flex">{title}</div>
                <button className="btn btn-sm btn-primary" type="button" onClick={toggleUpdate}>
                    Modifier
                </button>
            </div>

            <div className="row mb-3">
                <div className="col-md-4">
                    <span className="h5">Nom du réseau :</span>
                </div>
                <div className="col-md-3">
                    <span className="fw-bold fs-7 text-gray-600">
                        Conseil d&apos;administration de l&apos;UNETP
                    </span>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-4">
                    <span className="h5">Date de création :</span>
                </div>
                <div className="col-md-3">
                    <span className="fw-bold fs-7 text-gray-600">08/04/2022</span>
                </div>{' '}
            </div>

            <div className="separator my-2" />
            <div className="form-group mb-3">
                <span className="h5">Description :</span>
                <p>
                    {' '}
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                    turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
                    sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies
                    mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien
                    ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae,
                    ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros
                    ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis
                    pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor
                    neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam
                    dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus{' '}
                </p>
            </div>
            <div className="separator my-2" />

            <Coordinates data={data?.coordinates} title="Tableau des coordonées" />

            <Modal show={isUpdate} onHide={toggleUpdate} size="lg">
                <Modal.Header>
                    <Modal.Title as="h2">Ajout d&apos;une nouvelle coordonnée</Modal.Title>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                </Modal.Header>
                <Modal.Body scrollable={true}>
                    <form>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label required">
                                    Nom du réseau :
                                </label>
                                <input
                                    type="text"
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.name
                                    })}
                                    {...register('name')}
                                />
                                <span className="invalid-feedback">{errors?.name?.message}</span>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="" className="form-label">
                                    Date de création :
                                </label>
                                <input
                                    type="date"
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.date
                                    })}
                                    {...register('date')}
                                />
                                <span className="invalid-feedback">{errors?.date?.message}</span>
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="" className="form-label">
                                Description :
                            </label>
                            <textarea
                                className={clsx('form-control', {
                                    'is-invalid': errors?.description
                                })}
                                {...register('description')}
                            />
                            <span className="invalid-feedback">{errors?.description?.message}</span>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex w-100 justify-content-between">
                        <button className="btn btn-secondary" onClick={toggleUpdate} type="button">
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

export default GlobalInfo;
