import React, { useState } from 'react';
import { Collapse, OverlayTrigger, Tooltip } from 'react-bootstrap';

import useData from '../../../../../hooks/use-data';
import LinkWithRef from '../../../Link';
import EstablishmentItem from './item';
const DiplomaView = () => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((v) => !v);
    const { data } = useData();
    return (
        <>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="flex-shrink-0">
                    <div className="d-flex justify-content-between">
                        <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                            Nom de diplôme
                        </span>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-edit">Imprimer</Tooltip>}>
                            <LinkWithRef
                                href={`/diplomes/imprimer/${data?.id}`}
                                passHref
                                className="btn btn-primary btn-icon btn-sm"
                                target="_blank">
                                <i className="fa fa-print"></i>
                            </LinkWithRef>
                        </OverlayTrigger>
                    </div>
                    <div className="d-flex">
                        <span className="text-dark fs-1 fw-bolder">{data?.name} </span>
                        <span className="ms-3 badge badge-primary my-auto">{data?.reference}</span>
                    </div>
                </div>{' '}
            </div>

            <div className="separator my-5" />
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="row mb-2">
                    <span className="col-lg-2 fw-bold text-gray-600 fs-6">Niveau :</span>

                    <span className="fw-bolder col-lg-6 fs-5">{data?.diplomaGrade?.label}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-2 fw-bold text-gray-600 fs-6">Spécialité :</span>

                    <span className="fw-bolder col-lg-8 fs-5">
                        {data?.diplomaSpecialty?.label}
                        <span className="badge badge-primary">
                            {data?.department?.departmentCode}
                        </span>
                    </span>
                </div>

                <div className="row mb-2">
                    <span className="col-lg-2 fw-bold text-gray-600 fs-6">Domaine :</span>

                    <span className="fw-bolder col-lg-8 fs-5"> {data?.diplomaDomain?.label}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-2 fw-bold text-gray-600 fs-6">Groupe :</span>

                    <span className="fw-bolder col-lg-8 fs-5"> {data?.diplomaGroup?.label}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-2 fw-bold text-gray-600 fs-6">Sous groupe :</span>

                    <span className="fw-bolder col-lg-8 fs-5"> {data?.diplomaSubGroup?.label}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-2 fw-bold text-gray-600 fs-6">Type :</span>

                    <span className="fw-bolder col-lg-8 fs-5">{data?.diplomaType?.label}</span>
                </div>
            </div>

            <div className="separator my-3" />

            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-600 fs-5 fw-bolder me-2 d-block lh-1 py-5 pb-1">
                    Etablissements délivrant ce diplôme :{' '}
                </span>

                <div className="py-5">
                    {data?.diplomas.length === 1 ? (
                        <div className="py-0">
                            {data?.diplomas?.map((e) => (
                                <EstablishmentItem data={e} key={e.id} />
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="mt-3">
                                {data?.diplomas?.slice(0, 3)?.map((e) => (
                                    <EstablishmentItem data={e} key={e.id} />
                                ))}
                            </div>
                            <Collapse in={open}>
                                <div>
                                    {data?.diplomas?.slice(3)?.map((e) => (
                                        <EstablishmentItem data={e} key={e.id} />
                                    ))}
                                </div>
                            </Collapse>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-secondary btn-sm" onClick={toggleOpen}>
                                    {!open ? 'Afficher la suite' : 'Masquer'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default DiplomaView;
