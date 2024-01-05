import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';

import useData from '../../../../../hooks/use-data';
import EstablishmentItem from './EstablishmentItem';

const ViewGuardianship = () => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((v) => !v);
    const { data } = useData();
    return (
        <>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="flex-shrink-0">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                        Nom de tutelle
                    </span>
                    <span className="text-dark fs-1 fw-bolder">{data?.label}</span>
                </div>
            </div>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                    Etablissements sous la même tutelle :
                </span>
                <span className="me-3">
                    {data?.organizations?.slice(0, 3)?.map((e) => (
                        <EstablishmentItem data={e} key={e.id} />
                    ))}

                    {data?.organizations?.length > 3 && (
                        <>
                            <Collapse in={open}>
                                <div>
                                    {data?.organizations?.slice(3)?.map((e) => (
                                        <EstablishmentItem data={e} key={e.id} />
                                    ))}
                                </div>
                            </Collapse>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-secondary btn-sm" onClick={toggleOpen}>
                                    {!open ? 'Afficher la suite ...' : 'Masquer ...'}
                                </button>
                            </div>
                        </>
                    )}
                </span>
            </div>
        </>
    );
};

export default ViewGuardianship;
