import React from 'react';

import List from '../Form/Functions/components/Functions/List';
import ViewRow from '../Form/Functions/components/Functions/ViewRow';

const Function = ({ data }) => {
    const filters = [
        {
            data: data.functions.filter((e) => e.functionLabel.organizationTypeId == 1),
            title: "Fonctions exercées au niveau de l'UNETP :",
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">UNETP</th>,
                () => <th className="min-w-50px">Période</th>,
                () => (
                    <th className="min-w-50px">
                        <i className="fa fa-bolt"></i>
                    </th>
                )
            ]
        },
        {
            data: data.functions.filter((e) => e.functionLabel.organizationTypeId == 2),
            title: "Fonctions exercées au niveau du C.A. de l'UNETP :",
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">C.A</th>,
                () => <th className="min-w-50px">Période</th>,
                () => (
                    <th className="min-w-50px">
                        <i className="fa fa-bolt"></i>
                    </th>
                )
            ]
        },
        {
            data: data.functions.filter((e) => e.functionLabel.organizationTypeId == 3),
            title: 'Fonctions exercées au niveau du bureau du C.A. :',
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">Bureau C.A</th>,
                () => <th className="min-w-50px">Période</th>,
                () => (
                    <th className="min-w-50px">
                        <i className="fa fa-bolt"></i>
                    </th>
                )
            ]
        },
        {
            data: data.functions.filter((e) => e.functionLabel.organizationTypeId == 4),
            title: "Fonctions exercées au niveau d'une structure d'établissement :",
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">Établissement</th>,
                () => <th className="min-w-50px">Période</th>,
                () => (
                    <th className="min-w-50px">
                        <i className="fa fa-bolt"></i>
                    </th>
                )
            ]
        },
        {
            data: data.functions.filter((e) => e.functionLabel.organizationTypeId == 5),
            title: "Fonctions exercées au niveau d'une délégation :",
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">Délégation</th>,
                () => <th className="min-w-50px">Période</th>,
                () => (
                    <th className="min-w-50px">
                        <i className="fa fa-bolt"></i>
                    </th>
                )
            ]
        },
        {
            data: data.functions.filter((e) => e.functionLabel.organizationTypeId == 6),
            title: "Fonctions exercées au niveau d'un réseau :",
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">Network</th>,
                () => <th className="min-w-50px">Période</th>,
                () => (
                    <th className="min-w-50px">
                        <i className="fa fa-bolt"></i>
                    </th>
                )
            ]
        },
        {
            data: data.functions.filter((e) => e.functionLabel.organizationTypeId == 7),
            title: 'Fonctions non communiqué :',
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">Période</th>,
                () => (
                    <th className="min-w-50px">
                        <i className="fa fa-bolt"></i>
                    </th>
                )
            ],
            columnsCount: 2
        }
    ];

    console.log(data);
    return (
        <>
            {filters.map(({ data, title, customHeader, columnsCount }) => {
                return (
                    !!data?.length && (
                        <>
                            <div className="h6 align-items-center py-3 d-flex">{title}</div>
                            <List
                                data={data}
                                Row={ViewRow}
                                columnsCount={columnsCount ? columnsCount : 3}
                                customHeaders={customHeader}
                            />
                        </>
                    )
                );
            })}
        </>
    );
};

export default Function;
