import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';

import useData from '../../../../hooks/use-data';
import EstablishmentItem from './item';
const ViewLabel = () => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((v) => !v);

    const { data } = useData();

    return (
        <>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                    Etablissements utilisant le label :
                </span>
                {data?.organizationHasEstablishmentLabels?.length !== 0 ? (
                    <span className="me-3">
                        {data?.organizationHasEstablishmentLabels?.slice(0, 3)?.map((e) => (
                            <EstablishmentItem data={e} key={e.id} />
                        ))}
                        {data?.organizationHasEstablishmentLabels?.length > 3 && (
                            <>
                                <Collapse in={open}>
                                    <div>
                                        {data?.organizationHasEstablishmentLabels
                                            ?.slice(3)
                                            ?.map((e) => (
                                                <EstablishmentItem data={e} key={e.id} />
                                            ))}
                                    </div>
                                </Collapse>
                                <div className="d-flex justify-content-end">
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={toggleOpen}>
                                        {!open ? 'afficher la suite ...' : 'masquer  ...'}
                                    </button>
                                </div>
                            </>
                        )}
                    </span>
                ) : (
                    <span className="d-flex align-items-center justify-content-center text-muted">
                        <i className=" far fa-sad-cry pr-2 fa-2x " />
                        <span className="ps-2 d-flex  pt-2">Aucun établissement</span>
                    </span>
                )}
            </div>
        </>
    );
};

export default ViewLabel;
