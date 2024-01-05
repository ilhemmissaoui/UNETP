import React from 'react';

import List from '../../../../components/SharedComponents/Coordinates/List';
import ViewRow from '../../../../components/SharedComponents/Coordinates/ViewRow';
const headers = [
    () => <th className="min-w-50px">Téléphone</th>,
    () => <th className="min-w-50px">E-mail</th>,
    () => <th className="min-w-50px">Adresse</th>,
    () => <th className="min-w-50px">Fax</th>,
    () => <th className="min-w-50px">Site internet</th>,
    () => <th className="min-w-50px">Ajouté le</th>
];
const GlobalInformation = ({ data }) => {
    const estblishmentCorrdinatets = data?.functions
        ?.filter((e) => e?.functionLabel?.isHeadMaster)
        .map((e) => ({
            ...e.organization?.coordinates.find((a) => a?.isDefault),
            organization: e?.organization
        }));

    return (
        <>
            <span className="text-gray-600 fs-5 fw-bolder me-2 d-block lh-1 py-5 pb-1 d-flex">
                Structures d&apos;établissement :{' '}
            </span>
            {estblishmentCorrdinatets?.map((e) => {
                return (
                    <>
                        <div className="h6 align-items-center py-3 d-flex">
                            {e?.organization?.name}
                            <span className="badge badge-red ms-2">
                                {e?.organization?.establishment?.establishmentKey}
                            </span>
                        </div>

                        <List
                            data={e}
                            Row={ViewRow}
                            columnsCount={headers.length}
                            isMultipleTables={true}
                            customHeaders={headers}
                        />
                    </>
                );
            })}
        </>
    );
};

export default GlobalInformation;
