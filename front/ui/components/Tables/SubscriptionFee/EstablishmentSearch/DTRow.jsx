import React from 'react';
import { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import View from '../../../Modals/View';
import EstablishmentView from '../../Establishments/View';

const Header = ({ data }) => {
    const city =
        data?.organization?.coordinates.find((e) => e?.isDefault)?.city ||
        data?.organization?.coordinates[0]?.city;

    return (
        <div className="d-flex flex-column w-100">
            <div>
                <div className="d-flex align-items-center">
                    <span>{data?.organization?.name}</span>
                    {data?.organization?.establishment?.department?.departmentCode && (
                        <span className="ms-2 badge badge-info badge-outline">
                            {data?.organization?.establishment?.department?.departmentCode}
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

const DTRow = ({ data }) => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    console.log(data);
    return (
        <>
            <tr>
                <td>
                    <div className="fs-7 fw-bolder badge badge-primary fw-bolder">
                        {data?.establishmentKey}{' '}
                    </div>
                </td>

                <td>
                    <div className="d-flex ">
                        <button className="btn btn-link fw-bolder p-0" onClick={toggleIsView}>
                            {data?.name}
                        </button>
                        <div className="my-1 mx-1">
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
                    <span className="fw-bold fs-7 text-gray-800">{data?.year}</span>
                </td>
                <td>
                    <span className="fw-bold fs-7 text-gray-800">
                        {data?.lpContractStudentsCount}
                    </span>
                </td>
                <td>
                    <span className="fs-7 fw-bolder text-gray-800">
                        {data?.collegeContractStudentsCount}
                    </span>
                </td>

                <td>
                    <span className="fw-bold fs-7 text-gray-800">{data?.apprenticesCount} </span>
                </td>
                <td>
                    <div className="badge badge-success fw-bolder">{data?.hoursCount}</div>
                </td>
            </tr>
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                bsPrefix="modal-header py-3"
                pluralName="establishments"
                id={data?.establishmentId}
                customTitle={<Header data={data} />}>
                <EstablishmentView />
            </View>
        </>
    );
};

export default DTRow;
