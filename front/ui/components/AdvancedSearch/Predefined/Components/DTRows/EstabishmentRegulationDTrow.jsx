import moment from 'moment';
import { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Ability } from '../../../../GUARDS';
import LinkWithRef from '../../../../Link';
import Delete from '../../../../Modals/Delete';
import View from '../../../../Modals/View';
import Header from '../../../../Tables/Diplomas/View/EstablishmentHeader';
import EstablishmentView from '../../../../Tables/Establishments/View';

const DTRow = ({ data }) => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);

    const [isDelete, setIsDelete] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);

    return (
        <>
            <tr className="align-middle">
                <td className="">
                    <div className="d-flex text-dark fw-bolder text-hover-primary mb-1 fs-5">
                        <div className="me-2">
                            <button className="btn btn-link fw-bolder p-0" onClick={toggleIsView}>
                                {data?.organization?.name}{' '}
                            </button>
                        </div>
                    </div>
                </td>
                <td className="text-center">Etablissement</td>
                <td className="text-center">
                    {' '}
                    <div className="badge badge-light fw-bolder">
                        {data?.organization?.updatedAt
                            ? moment(data?.organization?.updatedAt).format('DD/MM/YYYY HH:mm')
                            : null}
                    </div>
                </td>
                <td className="text-center">
                    <div className="btn-group">
                        <Ability I="write" an="establishment">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                                <LinkWithRef
                                    href={`structures-etablissement/modifier/${data?.id}`}
                                    passHref
                                    className="btn btn-primary btn-icon btn-sm">
                                    <i className="fa fa-edit"></i>
                                </LinkWithRef>
                            </OverlayTrigger>
                        </Ability>

                        <Ability I="view" an="establishment">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Visualiser</Tooltip>}>
                                <button
                                    className="btn btn-secondary btn-sm btn-icon"
                                    onClick={toggleIsView}>
                                    <i className="fa fa-eye"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>

                        <Ability I="delete" an="establishment">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Archiver</Tooltip>}>
                                <button
                                    className="btn btn-danger btn-icon btn-sm"
                                    onClick={toggleIsDelete}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>
                    </div>
                </td>
            </tr>
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                bsPrefix="modal-header py-3"
                pluralName="establishments"
                id={data?.id}
                customTitle={<Header data={data} />}>
                <EstablishmentView />
            </View>
            <Delete
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Établissement"
                singleName="establishment"
            />
        </>
    );
};

export default DTRow;
