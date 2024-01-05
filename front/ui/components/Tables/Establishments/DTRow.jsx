import clsx from 'clsx';
import moment from 'moment';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { getCurrentYear } from '../../../utils/time';
import { Ability } from '../../GUARDS';
import LinkWithRef from '../../Link';
import Archive from '../../Modals/Archive';
import Restore from '../../Modals/Restore';
import View from '../../Modals/View';
import Header from './components/Header';
import HeadMaster from './components/HeadMaster/index';
import EstablishmentView from './View';
const colorByState = {
    'Solde initial': 'bg-danger ',
    'Solde partiel': 'bg-danger',
    'Solde négatif (trop perçu)': 'bg-danger',
    Validé: 'bg-success',
    Soldé: 'bg-success'
};

const DTRow = ({ data }) => {
    const currentYear = getCurrentYear();

    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    const [isRestore, setIsRestore] = useState();
    const toggleIsRestore = () => setIsRestore((v) => !v);

    const [isDelete, setIsDelete] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);

    const coordinate = (data?.organization?.coordinates || [])[0];
    const subscriptionFee = data?.organization?.subscriptionFees?.find(
        (e) => e?.subscriptionParam?.year === currentYear
    );
    const chiefId = [1, 2, 3, 6, 7, 156, 115, 7, 155];
    const headMasters = data?.organization?.functions?.filter((e) =>
        chiefId.includes(e.functionLabel?.id)
    );
    return (
        <>
            <tr className="align-middle">
                <td>
                    <span className="badge badge-primary badge-lg">{data?.establishmentKey}</span>
                </td>
                <td className="">
                    <div className="d-flex text-dark fw-bolder text-hover-primary mb-1 fs-5">
                        <div className="me-2">
                            <button className="btn btn-link fw-bolder p-0" onClick={toggleIsView}>
                                {data?.organization?.name}{' '}
                            </button>
                        </div>
                        <div>
                            {' '}
                            {data?.organization?.isArchived ? (
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-archive"> Archivé</Tooltip>}>
                                    <span className="square square-statut h-10px w-10px bg-danger" />
                                </OverlayTrigger>
                            ) : (
                                <> </>
                            )}
                        </div>
                    </div>
                </td>

                <td>
                    {coordinate?.zipCode} {coordinate?.city}
                </td>
                <td className="text-dark fw-bolder text-hover-primary mb-1 py-2 fs-5">
                    {headMasters?.map(({ user, ...fn }) => (
                        <HeadMaster user={user} fn={fn} key={user?.id} />
                    ))}
                </td>
                <td>
                    <div className="badge badge-light fw-bolder">
                        {data?.organization?.updatedAt
                            ? moment(data?.organization?.updatedAt).format('DD/MM/YYYY HH:mm')
                            : null}
                    </div>
                </td>

                <td className="text-center">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-edit"> {subscriptionFee?.status}</Tooltip>}>
                        <span
                            className={clsx(
                                'bullet bullet-dot h-10px w-10px',
                                colorByState[subscriptionFee?.status]
                            )}
                        />
                    </OverlayTrigger>
                </td>

                <td className="text-center">
                    <div className="btn-group">
                        <Ability I="write" an="establishment">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                                <LinkWithRef
                                    href={`/structures-etablissement/modifier/${data?.id}`}
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
                        {data?.organization?.isArchived ? (
                            <Ability I="delete" an="establishment">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-edit">Restaurer</Tooltip>}>
                                    <button
                                        className="btn btn-success btn-icon btn-sm"
                                        onClick={toggleIsRestore}>
                                        <i className="fa fa-recycle"></i>
                                    </button>
                                </OverlayTrigger>
                            </Ability>
                        ) : (
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
                        )}
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
            <Archive
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Établissement"
                singleName="establishment"
            />

            <Restore
                _id={data?.id}
                isShow={isRestore}
                toggleShow={toggleIsRestore}
                collectionLabel="Établissement"
                singleName="establishment"
                prefix="establishments"
            />
        </>
    );
};

export default DTRow;
