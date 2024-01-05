import Link from 'next/link';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Ability } from '../../../GUARDS';
import Delete from '../../../Modals/Delete';

const DTRow = ({ data }) => {
    const [isDelete, setIsDelete] = useState();
    const toggleIsDelete = () => setIsDelete((v) => !v);

    return (
        <>
            <tr className="align-middle">
                <td className="fs-6 text-black">{data?.label}</td>
                <td>
                    <span className="fw-bold fs-6 text-gray-700 ms-20 d-flex">{data?.request}</span>
                </td>
                <td className="text-center">
                    <div className="btn-group">
                        <Ability I="write" an="advancedSearch.personalized">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                                <Link
                                    href={`/recherche-avancee/personnalise/requete/modifier/${data.id}`}
                                    passHref>
                                    <a
                                        href="#"
                                        className="btn btn-primary btn-icon btn-sm"
                                        data-bs-toggle="modal"
                                        data-bs-target="#kt_modal_offer_a_deal">
                                        <i className="fa fa-edit"></i>
                                    </a>
                                </Link>
                            </OverlayTrigger>
                        </Ability>
                        <Ability I="delete" an="advancedSearch.personalized">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-delete">Supprimer</Tooltip>}>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-icon btn-sm"
                                    onClick={toggleIsDelete}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>
                    </div>
                </td>
            </tr>
            <Delete
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Requête"
                singleName="request"
            />
        </>
    );
};

export default DTRow;
