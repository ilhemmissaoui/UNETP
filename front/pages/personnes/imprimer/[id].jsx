import axios from 'axios';
import clsx from 'clsx';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

import useCRUD from '../../../hooks/use-crud';
import useToast from '../../../hooks/use-toast';
import { roles } from '../../../schemas/users';
import settings from '../../../settings';
import Period from '../../../ui/components/Utils/Period';
import { FormatPrice } from '../../../ui/utils/currency';
const { endpointUrl } = settings;

const headers = [
    () => <th className="min-w-50px">Téléphone</th>,
    () => <th className="min-w-50px">E-mail</th>,
    () => <th className="min-w-50px">Adresse</th>,
    () => <th className="min-w-50px">Fax</th>,
    () => <th className="min-w-50px">Site internet</th>,
    () => <th className="min-w-50px">Ajouté le</th>
];

const historyHeaders = [
    () => <th className="min-w-50px">Type</th>,
    () => <th className="min-w-50px">Libellé</th>,
    () => <th className="min-w-50px">Période</th>,
    () => (
        <th className="min-w-50px">
            <i className="fa fa-bolt"></i>
        </th>
    )
];

const SubscriptionFeesheaders = [
    () => <th className="min-w-50px">Cotisation</th>,
    () => <th className="min-w-50px">Statut</th>,
    () => <th className="min-w-50px">Montant</th>,
    () => <th className="min-w-50px">syndicat</th>
];

const colorByStatus = {
    'Solde initial': 'bg-danger ',
    'Solde partiel': 'bg-danger',
    'Solde négatif (trop perçu)': 'bg-danger',
    Validé: 'bg-success',
    Soldé: 'bg-success'
};

const Imprimer = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const { setToast } = useToast();
    const { query } = useRouter();

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/users/${query?.id}`);
            setData(data);
            setLoading(false);
        } catch (e) {
            setToast({
                message: `Erreur lors de la récupération de l'établissement`,
                variant: 'danger'
            });
            setLoading(true);
        }
    };

    useEffect(() => {
        if (query?.id) fetchData();
    }, [query?.id]);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                window.print();
            }, 500);
        }
    }, [loading]);

    const estblishmentCorrdinatets = data?.functions
        ?.filter((e) => e?.functionLabel?.isHeadMaster)
        .map((e) => ({
            ...e.organization?.coordinates.find((a) => a?.isDefault),
            organization: e?.organization
        }));

    const filters = [
        {
            data: data?.functions.filter((e) => e?.functionLabel?.organizationTypeId == 1),
            title: "Fonctions exercées au niveau de l'UNETP :",
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">UNETP</th>,
                () => <th className="min-w-50px">Période</th>
            ]
        },
        {
            data: data?.functions.filter((e) => e?.functionLabel?.organizationTypeId == 2),
            title: "Fonctions exercées au niveau du C.A. de l'UNETP :",
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">C.A</th>,
                () => <th className="min-w-50px">Période</th>
            ]
        },
        {
            data: data?.functions.filter((e) => e?.functionLabel?.organizationTypeId == 3),
            title: 'Fonctions exercées au niveau du bureau du C.A. :',
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">Bureau C.A</th>,
                () => <th className="min-w-50px">Période</th>
            ]
        },
        {
            data: data?.functions.filter((e) => e?.functionLabel?.organizationTypeId == 4),
            title: "Fonctions exercées au niveau d'une structure d'établissement :",
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">Établissement</th>,
                () => <th className="min-w-50px">Période</th>
            ]
        },
        {
            data: data?.functions.filter((e) => e?.functionLabel?.organizationTypeId == 5),
            title: "Fonctions exercées au niveau d'une délégation :",
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">Délégation</th>,
                () => <th className="min-w-50px">Période</th>
            ]
        },
        {
            data: data?.functions.filter((e) => e?.functionLabel?.organizationTypeId == 6),
            title: "Fonctions exercées au niveau d'un réseau :",
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">Network</th>,
                () => <th className="min-w-50px">Période</th>
            ]
        },
        {
            data: data?.functions.filter((e) => e?.functionLabel?.organizationTypeId == 7),
            title: 'Fonctions non communiqué :',
            customHeader: [
                () => <th className="min-w-50px">Fonction </th>,
                () => <th className="min-w-50px">Période</th>
            ],
            columnsCount: 2
        }
    ];

    const { page: functionLabels } = useCRUD({
        singleName: 'function-label',
        pluralName: 'function-labels',
        pageSize: null
    });

    let history = data?.histories;

    const role = roles?.find((e) => e.id === data?.access?.role);

    return loading ? (
        <div className="d-flex w-100 justify-content-center my-20">
            <Spinner animation="border" />
        </div>
    ) : (
        <div className="container-fluid">
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="flex-shrink-0">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                        Nom de la personne
                    </span>
                    <span className="text-dark fs-1 fw-bolder">
                        {data?.civility.abbreviation} {data?.firstName} {data?.lastName}
                    </span>
                </div>
            </div>

            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="d-flex flex-wrap flex-sm-nowrap">
                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                            <div className="d-flex flex-column">
                                <div className="mb-4 d-flex flex-column">
                                    <label className=" fw-bold">
                                        E-mail :
                                        <span className="fw-bold fs-6 text-gray-600">
                                            {data?.coordinates[0]?.email
                                                ? data?.coordinates[0]?.email
                                                : '-'}
                                        </span>
                                    </label>
                                    <label className=" fw-bold">
                                        Date de naissance :
                                        <span className="fw-bold fs-6 text-gray-600">
                                            {' '}
                                            {data?.dob
                                                ? moment(data?.dob).format('DD/MM/YYYY')
                                                : '-'}
                                        </span>
                                    </label>
                                    <label className=" fw-bold">
                                        Téléphone :
                                        <span className="fw-bold fs-6 text-gray-600">
                                            {data?.coordinates[0]?.phoneNumber
                                                ? data?.coordinates[0]?.phoneNumber
                                                : '-'}
                                        </span>
                                    </label>
                                    <label className=" fw-bold">
                                        Adresse :
                                        <span className="fw-bold fs-6 text-gray-600">
                                            {!data?.coordinates[0]?.addressLine1 &&
                                                !data?.coordinates[0]?.zipCode &&
                                                !data?.coordinates[0]?.city &&
                                                '-'}
                                            {data?.coordinates[0]?.addressLine1}
                                            {data?.coordinates[0]?.zipCode}
                                            {data?.coordinates[0]?.city}
                                        </span>
                                    </label>
                                    <label className="fw-bold">
                                        Fax :
                                        <span className="fw-bold fs-6 text-gray-600">
                                            {data?.coordinates[0]?.fax?.length
                                                ? data?.coordinates[0]?.fax
                                                : '-'}
                                        </span>
                                    </label>
                                    <label className=" fw-bold">
                                        Site internet :
                                        <span className="fw-bold fs-6 text-gray-600">
                                            {data?.coordinates[0]?.website?.length
                                                ? data?.coordinates[0]?.website
                                                : '-'}
                                        </span>
                                    </label>

                                    <label className=" fw-bold">
                                        Membre depuis le :
                                        <span className="fw-bold fs-6 text-gray-600">
                                            {moment(data?.createdAt).format('DD/MM/YYYY')}
                                        </span>
                                    </label>

                                    <label className=" fw-bold">
                                        Relation UNETP :
                                        <span className="fw-bold fs-6 text-gray-600">
                                            {data?.relationship}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="separator my-5" />

            {estblishmentCorrdinatets?.length && (
                <div>
                    <div className="fw-bolder fs-3 d-flex align-items-center mt-4">
                        <span>Informations Générales : </span>
                    </div>
                    <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                        <>
                            <span className="text-gray-600 fs-5 fw-bolder me-2 d-block lh-1 py-5 pb-1 d-flex">
                                Structures d&apos;établissement :{' '}
                            </span>
                            {estblishmentCorrdinatets?.map((item) => {
                                return (
                                    <>
                                        <div className="h6 align-items-center py-3 d-flex">
                                            {item?.organization?.name}
                                            <span className="fw-bolder text-info ms-2">
                                                {
                                                    item?.organization?.establishment
                                                        ?.establishmentKey
                                                }
                                            </span>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table align-middle fs-9 gy-2 no-footer">
                                                <thead>
                                                    <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                                                        {headers
                                                            ?.slice(0, headers.length)
                                                            .map((Header, i) => (
                                                                <Header key={i} />
                                                            ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-600 fw-bold">
                                                    <tr className="align-middle text-center fs-7 text-gray-800">
                                                        <td>
                                                            <NumberFormat
                                                                displayType="text"
                                                                format="## ## ## ## ##"
                                                                value={item?.phoneNumber}
                                                            />
                                                        </td>
                                                        <td>
                                                            <span className="fw-bolder col-lg-8 fs-7">
                                                                {item?.email ? item?.email : '-'}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <div>
                                                                {item?.voiceLabel
                                                                    ? item?.voiceLabel
                                                                    : '-'}{' '}
                                                                <br />
                                                                {item?.zipCode
                                                                    ? item?.zipCode
                                                                    : '-'}{' '}
                                                                {item.city ? item.city : '-'}
                                                            </div>
                                                        </td>
                                                        <td>{item?.fax ? item?.fax : '-'}</td>

                                                        <td>
                                                            {item?.website ? item?.website : '-'}
                                                        </td>
                                                        <td>
                                                            {item?.createdAt
                                                                ? moment(item?.createdAt).format(
                                                                      'DD/MM/YYYY HH:mm'
                                                                  )
                                                                : ''}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                );
                            })}
                        </>
                    </div>
                </div>
            )}
            <div className="separator my-5" />

            {filters?.length && (
                <div>
                    <div className="fw-bolder fs-3 d-flex align-items-center">
                        <span>Fonctions : </span>
                    </div>
                    <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                        <>
                            {filters.map(({ data, title, customHeader, columnsCount }) => {
                                return (
                                    !!data?.length && (
                                        <>
                                            <div className="h6 align-items-center py-3 d-flex">
                                                {title}
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table align-middle fs-9 gy-2 no-footer">
                                                    <thead>
                                                        <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                                                            {customHeader
                                                                .slice(0, columnsCount)
                                                                .map((Header, i) => (
                                                                    <Header key={i} />
                                                                ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-gray-600 fw-bold">
                                                        {data?.map((e) => (
                                                            <tr
                                                                className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light"
                                                                key={e}>
                                                                <td>
                                                                    <span className="fw-bold fs-8 text-gray-800">
                                                                        {e?.functionLabels
                                                                            ?.singularMaleName
                                                                            ? e?.functionLabels
                                                                                  ?.singularMaleName
                                                                            : functionLabels?.nodes?.find(
                                                                                  (func) =>
                                                                                      func?.id ==
                                                                                      e?.labelId
                                                                              )?.singularMaleName}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="fw-bold fs-8 text-gray-800">
                                                                        {' '}
                                                                        {e?.organization?.name}
                                                                    </span>{' '}
                                                                    <span className="fw-bolder text-info ms-2 fs-7">
                                                                        {
                                                                            e?.organization
                                                                                ?.establishment
                                                                                ?.establishmentKey
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <Period {...e} />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    )
                                );
                            })}
                        </>
                    </div>
                </div>
            )}
            <div className="separator my-5" />

            <div>
                <div className="fw-bolder fs-3 d-flex align-items-center">
                    <span>Historiques : </span>
                </div>
                <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                    <div className="table-responsive">
                        <table className="table align-middle fs-9 gy-2 no-footer">
                            <thead>
                                <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                                    {historyHeaders.slice(0, 4).map((Header) => (
                                        <Header key />
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="text-gray-600 fw-bold">
                                {history?.map((e) => (
                                    <tr className="align-middle text-center" key>
                                        <td>
                                            <span className="text-dark  text-hover mb-1 fs-7">
                                                {e?.historyType?.label}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-dark  text-hover mb-1 fs-7">
                                                {e?.label}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="badge badge-light fw-bolder">
                                                <Period {...e} />
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-dark  text-hover mb-1 fs-7">
                                                {e?.comment?.length ? e?.comment : null}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="separator my-5" />

            <div>
                <div className="fw-bolder fs-3 d-flex align-items-center">
                    <span>Cotisations : </span>
                </div>
                <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                    <div className="notice bg-light-success rounded border-success border border-dashed p-4 mb-3">
                        <div className="flex-shrink-0 mb-3">
                            <span className="text-dark fs-5 fw-bolder">
                                Gestion des cotisations personnelles uniquement pour les années
                                antérieures à{' '}
                                <span className="text-gray-600 fs-5  me-2">2012-2013.</span>
                            </span>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table align-middle fs-9 gy-2 no-footer">
                            <thead>
                                <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                                    {SubscriptionFeesheaders.slice(
                                        0,
                                        SubscriptionFeesheaders?.length
                                    ).map((Header, i) => (
                                        <Header key={i} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 fw-bold">
                                {data?.subscriptionFees?.map((e) => (
                                    <tr
                                        key={e?.id}
                                        className="align-middle text-center fs-8 text-gray-800">
                                        <td>
                                            <div className="position-relative  pe-3 py-2">
                                                <div
                                                    className={clsx(
                                                        'position-absolute start-0 top-0 w-4px h-100 rounded-2 ',
                                                        colorByStatus[e?.status]
                                                    )}
                                                />
                                                <div className="text-hover-primary fw-bolder text-center fs-6 ">
                                                    {e?.subscriptionParam?.year}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className={clsx(
                                                    '  fs-7 fw-bolder',
                                                    {
                                                        'text-success': e?.status === 'Validé'
                                                    },
                                                    {
                                                        'text-danger': e?.status === 'Solde partiel'
                                                    },
                                                    {
                                                        'text-danger': e?.status === 'Solde initial'
                                                    }
                                                )}>
                                                {e?.status}
                                            </span>
                                        </td>

                                        {e?.customAmount != 0 && e?.customAmount !== null ? (
                                            <td>
                                                <FormatPrice value={e?.customAmount} />
                                            </td>
                                        ) : (
                                            <td>
                                                <FormatPrice value={e?.calculatedAmount} />
                                            </td>
                                        )}

                                        <td>
                                            <span className="fw-bold fs-6 text-gray-800">
                                                {e?.unionSubscriptionFee?.label}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div>
                <div className="fw-bolder fs-3 d-flex align-items-center mt-4">
                    <span>Compte d&apos;accés : </span>
                </div>
                <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                    <div className="form-group mb-3">
                        <span className="h6">
                            Identifiant :
                            <span className="fw-bold fs-6 text-gray-600">
                                {data?.access?.username}
                            </span>
                        </span>
                    </div>

                    <div className="form-group mb-3">
                        <span className="h6">
                            Profil :
                            <span className="fw-bold fs-6 text-gray-600">
                                {role?.label}
                                {role?.badge && (
                                    <span className="badge badge-secondary badge-sm">
                                        {role?.badge}
                                    </span>
                                )}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Imprimer;
