import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Ability } from '../GUARDS';
import View from '../Modals/View';
import EstablishmentView from '../Tables/Establishments/View';
import UserView from '../Users/components/View';

const DTRow = ({ data }) => {
    const [isView, setIsView] = useState();

    const toggleIsView = () => setIsView((v) => !v);
    const [isViewE, setIsViewE] = useState();

    const toggleIsViewE = () => setIsViewE((v) => !v);
    const Header = ({ data }) => {
        const city =
            data?.organization?.coordinates.find((e) => e?.isDefault)?.city ||
            data?.coordinates[0]?.city;
        return (
            <div className="d-flex flex-column w-100">
                <div>
                    <div className="d-flex align-items-center">
                        <span>{data?.organization?.name}</span>
                        {data?.department?.departmentCode && (
                            <span className="ms-2 badge badge-info badge-outline">
                                {data?.department?.departmentCode}
                            </span>
                        )}
                        {city && (
                            <span className="ms-2 badge badge-secondary badge-outline">{city}</span>
                        )}
                    </div>
                    <span className="badge badge-primary badge-lg">{data?.establishmentKey}</span>
                </div>
            </div>
        );
    };

    return (
        <>
            <tr className="text-center">
                <td className=" align-items-center">
                    <button
                        className="btn btn-link d-flex align-items-center p-0"
                        onClick={toggleIsView}>
                        <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                            {data?.lastName !== '' ? (
                                <div className="symbol-label fs-3 bg-light-danger text-danger">
                                    {data?.user?.firstName[0]?.toUpperCase()}
                                    {data?.user?.lastName[0]?.toUpperCase()}
                                </div>
                            ) : (
                                <div className="symbol-label fs-3 bg-light-danger text-danger">
                                    {data?.user?.firstName[0]?.toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="text-gray-800 text-hover-primary mb-1">
                            <span className="fw-bolder"> {data?.user?.firstName} </span>
                            {data?.user?.lastName}
                        </div>
                    </button>
                </td>
                <td
                    role="presentation"
                    className="text-gray-800 fs-6 mb-1 cursor-pointer text-hover-primary"
                    onClick={toggleIsViewE}>
                    {' '}
                    {data?.object?.organization?.name}{' '}
                </td>
                <td> {data?.user?.comment}</td>

                <td>
                    {data?.createdAt && (
                        <div className="badge badge-light fw-bolder">
                            {data?.createdAt
                                ? moment(data?.createdAt).format('DD/MM/YYYY HH:mm')
                                : null}
                        </div>
                    )}
                </td>

                <td className="text-center">
                    <div className="btn-group">
                        <Ability I="view" an="request">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Visualiser</Tooltip>}>
                                <Link href={`/demandes/${data.id}`} passHref>
                                    <a className="btn btn-secondary btn-sm btn-icon">
                                        <i className="fa fa-eye"></i>
                                    </a>
                                </Link>
                            </OverlayTrigger>
                        </Ability>
                    </div>
                </td>
            </tr>

            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                customTitle="Fiche personne"
                pluralName="users"
                id={data?.user?.id}
                label={` ${data?.user?.firstName} ${data?.user?.lastName}`}>
                <UserView isMultipleTables={true} />
            </View>
            <View
                isShow={isViewE}
                toggleIsShow={toggleIsViewE}
                size="xl"
                bsPrefix="modal-header py-3"
                pluralName="establishments"
                id={data?.object?.id}
                customTitle={<Header data={data?.object} />}>
                <EstablishmentView />
            </View>
        </>
    );
};

export default DTRow;
