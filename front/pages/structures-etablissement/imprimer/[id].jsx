import axios from 'axios';
import clsx from 'clsx';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import React, { useMemo, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

import useAuth from '../../../hooks/use-auth';
import useToast from '../../../hooks/use-toast';
import { displayMemberType } from '../../../schemas/establishmentSchema';
import settings from '../../../settings';
import BlocSubscriptionFees from '../../../ui/components/Establishments/SubscriptionFees/components/Bloc';
import RowHistory from '../../../ui/components/SharedComponents/Histories/ViewDTrow';
import AdditionalInfo from '../../../ui/components/Tables/Establishments/components/CapacityHistory/AdditionalInfo';
import Bloc from '../../../ui/components/Tables/Establishments/components/CapacityHistory/Bloc';
import RowRelaunchHistory from '../../../ui/components/Tables/Establishments/components/RelaunchHistory/DTRow';
import Period from '../../../ui/components/Utils/Period';
const { endpointUrl } = settings;
const colorTabByStatus = {
    'Solde initial': 'bg-danger',
    'Solde partiel': 'bg-danger',
    'Solde négatif (trop perçu)': 'bg-danger',
    Validé: 'bg-success',
    Soldé: 'bg-success'
};

const colorByStatus = {
    'Solde initial': 'text-danger',
    'Solde partiel': 'text-danger',
    'Solde négatif (trop perçu)': 'text-danger',
    Validé: 'text-success',
    Soldé: 'text-success'
};
const headersUser = [
    () => <th className="min-w-50px">Personnes</th>,
    () => <th className="min-w-50px">Fonctions</th>,
    () => <th className="min-w-50px">Dates d&apos;entrée en fonction</th>
];

const headersHistory = [
    () => <th className="min-w-50px">Type </th>,
    () => <th className="min-w-50px">Libellé</th>,
    () => <th className="min-w-50px">Période</th>,
    () => <th className="min-w-50px">Commentaires</th>
];

const headersRelaunchHistory = [
    () => <th className="min-w-50px">Sujet</th>,
    () => <th className="min-w-50px">Statut</th>,
    () => <th className="min-w-50px">Date d&apos;envoi </th>,
    () => (
        <th className="text-center">
            <i className="fa fa-bolt"></i>
        </th>
    )
];

const headersSubscriptionFees = [
    () => <th className="min-w-50px">Cotisation </th>,
    () => <th className="min-w-50px">Statut</th>,
    () => <th className="min-w-50px">Montant </th>
];

const Print = () => {
    const { user } = useAuth();

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const { setToast } = useToast();
    const { query } = useRouter();

    const fetchEstablishment = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/establishments/${query?.id}`);
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
        if (query?.id) fetchEstablishment();
    }, [query?.id]);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                window.print();
            }, 500);
        }
    }, [loading]);

    let diplomas = data?.organization?.diplomas;

    const users = data?.organization?.functions;

    const history = data?.organization?.histories;

    const relaunchHistory = data?.RelaunchHistories;

    const subscriptionFees = data?.organization?.subscriptionFees;

    const coordinates =
        data?.organization?.coordinates.find((e) => e.isDefault) ||
        data?.organization?.coordinates[0];
    const newsCoordinates = data?.organization?.coordinates.find(
        (e) => e?.label.trim() === 'Email nouvelles'
    );

    const capacityHistory = useMemo(
        () => data?.organization?.capacityHistories,
        [data?.organization?.capacityHistories]
    );
    const country = data?.organization?.coordinates
        ?.map((e) => e?.country?.label)
        ?.find((e) => e?.length);

    const labels = data?.organization?.establishmentLabels?.map((e) => e?.label)?.join(', ');

    const pairing = data?.organization?.organizationHasCountryPairings
        ?.map((e) => e?.country?.label)
        ?.join(', ');
    const accountant = data?.organization?.functions?.filter((e) => e.functionLabel?.id == 152);
    const accountantCoordinates = accountant?.map((e) =>
        e.user?.coordinates.find((data) => data.isDefault)
    );

    return loading ? (
        <div className="d-flex w-100 justify-content-center my-20">
            <Spinner animation="border" />
        </div>
    ) : (
        <div className="container-fluid">
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="flex-shrink-0">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                        Nom de la structure d&apos;établissement
                    </span>
                    <span className="text-dark fs-1 fw-bolder">{data?.organization?.name}</span>
                </div>
            </div>

            <div>
                <div className="fw-bolder fs-3 d-flex align-items-center mt-4">
                    <span>Informations Générales : </span>
                </div>
                <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                    <div className="row">
                        <div className="col-lg-6">
                            {!!data?.relationship?.length && (
                                <div className="row mb-2">
                                    <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                        <b> Membre : </b>
                                        <span> {displayMemberType[data?.relationship]} </span>
                                    </span>
                                </div>
                            )}
                            <div className="row mb-2">
                                <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                    <b> Département : </b>
                                    {data?.department?.departmentCode} {data?.department?.label}
                                </span>
                            </div>
                            <div className="row mb-2">
                                <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                    <b> Numéro d&apos;établissement :</b>{' '}
                                    {data?.establishmentNumber}
                                </span>
                            </div>
                            <div className="row mb-2">
                                <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                    <b> Clé d&apos;établissement : </b> {data?.establishmentKey}
                                </span>
                            </div>
                            <div className="row mb-2">
                                <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                    <b> Académie : </b>
                                    {data?.academy?.name}
                                </span>
                            </div>
                            <div className="row mb-2">
                                <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                    <b> Région : </b>{' '}
                                    {data?.delegation?.name ? data?.delegation?.name : '-'}
                                </span>
                            </div>
                        </div>
                        {user?.role === 100 ? (
                            <div className="col-lg-6">
                                {!!data?.organization?.createdAt && (
                                    <div className="row mb-2">
                                        <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                            <b> Date d&apos;adhésion :</b>{' '}
                                            {moment(data?.organization?.createdAt).format(
                                                'DD/MM/YYYY'
                                            )}
                                        </span>
                                    </div>
                                )}
                                <div className="row mb-2">
                                    <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                        <b> Date de démission : </b> -
                                    </span>
                                </div>
                                <div className="row mb-2">
                                    <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                        <b> Date de réadhésion : </b>-
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
                <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                        Coordonnées de l&apos;établissement :
                    </span>
                    {!!data?.numAcadLT?.length && (
                        <div className="row mb-2">
                            <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                                <b> N° établissement (UAI/RNE) LT</b> : {data?.numAcadLT}
                            </span>
                        </div>
                    )}
                    {!!data?.numAcadLP?.length && (
                        <div className="row mb-2">
                            <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                                <b> N° établissement (UAI/RNE) LP</b> : {data?.numAcadLP}
                            </span>
                        </div>
                    )}
                    {!!data?.numAcadCFA?.length && (
                        <div className="row mb-2">
                            <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                                <b> N° établissement (UAI/RNE) CFA</b> : {data?.numAcadCFA}
                            </span>
                        </div>
                    )}
                    {!!data?.numExistanceCFP?.length && (
                        <div className="row mb-2">
                            <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                                <b> N° établissement (UAI/RNE) CFC</b> : {data?.numExistanceCFP}
                            </span>
                        </div>
                    )}
                    <div className="row mb-2">
                        <span className="col-lg-12 fw-bold text-gray-600 fs-6">
                            <b> Nom de la structure d&apos;établissement : </b>
                            {data?.organization?.name}
                        </span>
                    </div>
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            <b> Adresse : </b>
                            {coordinates?.voiceLabel ? coordinates?.voiceLabel : ''} <br />
                            {coordinates?.zipCode ? coordinates?.zipCode : ''}
                            {coordinates?.city ? coordinates?.city : ''} <br /> {country}
                        </span>
                    </div>
                    {!!coordinates?.phoneNumber && (
                        <div className="row mb-2">
                            <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                                <b> Téléphone :</b>
                                <NumberFormat
                                    displayType="text"
                                    format="## ## ## ## ##"
                                    value={coordinates?.phoneNumber}
                                />
                            </span>
                        </div>
                    )}

                    {!!coordinates?.email?.length && (
                        <div className="row mb-2">
                            <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                                <b> Mail établissement : </b>
                                {coordinates?.email}
                            </span>
                        </div>
                    )}
                    {!!coordinates?.website && (
                        <div className="row mb-2">
                            <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                                <b> Site web : </b>
                                {coordinates?.website}
                            </span>
                        </div>
                    )}
                </div>
                {!!newsCoordinates?.email && (
                    <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                        <div className="row my-2">
                            <span className="col-lg-12 fw-bold text-gray-600 fs-6">
                                <b> Mail CE pour réception des informations Unetp : </b>
                                {newsCoordinates?.email}
                            </span>
                        </div>
                    </div>
                )}
                <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                        Coordonnées de l’organisme de gestion :
                    </span>
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            <b> Nom : </b>
                            {data?.ogecName ? data?.ogecName : '-'}
                        </span>
                    </div>
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            <b> Téléphone : </b>{' '}
                            {data?.ogecPhoneNumber ? data?.ogecPhoneNumber : '-'}
                        </span>
                    </div>
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            <b> Code Postal : </b> {data?.ogecAddress ? data?.ogecAddress : '-'}
                        </span>
                    </div>
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            <b> Ville : </b>
                            {data?.ogecCity ? data?.ogecCity : '-'}
                        </span>
                    </div>
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            <b> E-mail : </b>
                            {data?.ogecEmail ? data?.ogecEmail : '-'}
                        </span>
                    </div>
                    {!!accountant?.length && (
                        <div className="row mb-2">
                            <span className="fw-bold text-gray-600 fs-6">
                                <b> Mail comptable :</b>
                                {accountantCoordinates?.map((e, i) => (
                                    <span key={i}>{e.email}</span>
                                ))}
                            </span>
                        </div>
                    )}
                </div>
                <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                        <b> Nombre d&apos;apprenants : </b>
                    </span>
                    {capacityHistory?.length <= 3 ? (
                        capacityHistory?.map((e, i) => (
                            <>
                                {!!i && <div className="separator my-5" />}
                                <Bloc
                                    key={e.year}
                                    data={e}
                                    type={parseInt(`${data?.establishmentKey}`.split('').pop())}
                                />
                            </>
                        ))
                    ) : (
                        <>
                            <div className="mt-3">
                                {capacityHistory?.map((e) => (
                                    <Bloc
                                        key={e.year}
                                        data={e}
                                        type={parseInt(`${data?.establishmentKey}`.split('').pop())}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                        Informations complémentaires :
                    </span>
                    <AdditionalInfo data={data} />
                    <div className="row my-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            Labels : {labels?.length ? labels : '-'}
                        </span>
                    </div>
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            Jumelage : {pairing?.length ? pairing : '-'}
                        </span>
                    </div>
                </div>

                {user?.role === 100 && data?.privateComment?.trim()?.length > 0 ? (
                    <div className="notice bg-light-danger rounded border border-danger border border-dashed p-3 mt-3 bg-light">
                        <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                            Commentaires UNETP confidentiel : {data?.privateComment}
                        </span>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>

            {diplomas?.length && (
                <div>
                    <div className="fw-bolder fs-3 d-flex align-items-center mt-4">
                        <span>Diplômes : </span>
                    </div>

                    <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                        <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                            Formations dispensées :
                        </span>
                        <div className="mt-3">
                            {diplomas.map((e) => (
                                <button className="btn btn-link d-block py-2" key={e}>
                                    <ul className="me-5">
                                        <li className="text-dark text-hover mb-1 fs-6">
                                            {' '}
                                            {e?.diploma?.name}
                                        </li>
                                    </ul>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {users?.length && (
                <div>
                    <div className="fw-bolder fs-3 d-flex align-items-center mt-4">
                        <span>Personnes : </span>
                    </div>
                    <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                        <div className="table-responsive">
                            <table className="table gy-3 gs-7">
                                <thead>
                                    <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                                        {headersUser.slice(0, 3).map((Header, i) => (
                                            <Header key={i} />
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 fw-bold">
                                    {users?.map((e) => (
                                        <tr className="text-center" key={e.id}>
                                            <td className=" align-items-center">
                                                <div className="d-flex flex-column">
                                                    <a
                                                        href="#"
                                                        className="text-gray-800 text-hover-primary mb-1">
                                                        <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                                                            {e?.user?.civility?.abbreviation}{' '}
                                                            {e?.user?.firstName}
                                                        </span>{' '}
                                                        <span className="text-dark  text-hover mb-1 fs-7">
                                                            {e?.user?.lastName}
                                                        </span>
                                                    </a>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="text-dark  text-hover mb-1 fs-7">
                                                    {e?.functionLabel?.singularMaleName}
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
                    </div>
                </div>
            )}

            {history?.length && (
                <div>
                    <div className="fw-bolder fs-3 d-flex align-items-center mt-4">
                        <span>Historique : </span>
                    </div>
                    <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                        <table className="table gy-3 gs-7 ">
                            <thead>
                                <tr className="fw-bolder fs-7 text-gray-800  bg-light text-center border-1 ">
                                    {headersHistory.slice(0, 4).map((Header, i) => (
                                        <Header key={i} />
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="text-gray-600 fw-bold">
                                {history?.map((e) => (
                                    <RowHistory data={e} key={e._id} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {relaunchHistory?.length && (
                <div>
                    <div className="fw-bolder fs-3 d-flex align-items-center mt-4">
                        <span>Historique Relance : </span>
                    </div>
                    <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                        <div className="table-responsive">
                            <table className="table align-middle fs-9 gy-2 no-footer">
                                <thead>
                                    <tr className="fw-bolder fs-7 text-gray-800  bg-light text-center">
                                        {headersRelaunchHistory.slice(0, 4).map((Header, i) => (
                                            <Header key={i} />
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="text-gray-600 fw-bold text-center">
                                    {relaunchHistory?.map((e) => (
                                        <RowRelaunchHistory data={e} key={e._id} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {subscriptionFees?.length && (
                <div>
                    <div className="fw-bolder fs-3 d-flex align-items-center mt-4">
                        <span>Cotisations : </span>
                    </div>

                    <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                        <div className="table-responsive">
                            <table className="table align-middle fs-9 gy-2 no-footer">
                                <thead>
                                    <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                                        {headersSubscriptionFees.slice(0, 5).map((Header, i) => (
                                            <Header key={i} />
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="text-gray-600 fw-bold text-center">
                                    {data?.organization?.subscriptionFees?.map((e) => (
                                        <tr
                                            key={e?.id}
                                            className="align-middle text-center fs-8 text-gray-800">
                                            <td>
                                                <div className="position-relative  pe-3 py-2">
                                                    <div
                                                        className={clsx(
                                                            'position-absolute start-0 top-0 w-4px h-100 rounded-2 ',
                                                            colorTabByStatus[e?.status]
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
                                                        ' badge fs-7 fw-bolder',
                                                        colorByStatus[e?.status]
                                                    )}>
                                                    {e?.status}
                                                </span>
                                            </td>
                                            <td className="text-start">
                                                {e && (
                                                    <BlocSubscriptionFees
                                                        capacityHistory={data?.organization?.capacityHistories?.find(
                                                            (a) =>
                                                                a.year === e.subscriptionParam?.year
                                                        )}
                                                        data={e}
                                                        type={parseInt(
                                                            `${data?.establishmentKey}`
                                                                .split('')
                                                                .pop()
                                                        )}
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Print;
