import clsx from 'clsx';
import React, { useState } from 'react';

import View from '../../../../../ui/components/Modals/View';
import EstablishmentView from '../../../Tables/Establishments/View';

const colorByStatus = {
    'Solde initial': 'badge-light-danger',
    'Solde partiel': 'badge-light-danger',
    'Solde négatif (trop perçu)': 'badge-primary',
    Soldé: 'badge-light-warning',
    Validé: 'badge-light-success'
};

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

function DTRow({ data }) {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    return (
        <>
            <tr>
                <td>
                    <div className="fs-7 fw-bolder badge badge-primary fw-bolder">
                        {data?.establishmentKey}{' '}
                    </div>
                </td>
                <td>
                    <button className="btn btn-link p-0" onClick={toggleIsView}>
                        {data?.name}
                    </button>
                </td>
                <td>
                    <span className="fs-7 fw-bolder text-gray-800">{data?.year}</span>
                </td>
                <td>
                    <span className="fs-7 fw-bolder text-gray-800">
                        {data?.collegeContractStudentsCount}
                    </span>
                </td>
                <td>
                    <span className="fs-7 fw-bolder text-gray-800">
                        {data?.lpContractStudentsCount}
                    </span>
                </td>
                <td>
                    <span className=" fs-7 fw-bolder text-gray-800">{data?.apprenticesCount} </span>
                </td>
                <td>
                    <div className="badge badge-success fw-bolder">{data?.hoursCount}</div>
                </td>
                <td>
                    <span className={clsx(' badge ', colorByStatus[data?.status])}>
                        {data?.status}
                    </span>
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
}

export default DTRow;
