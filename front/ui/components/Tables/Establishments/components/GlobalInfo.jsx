import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

import useAuth from '../../../../../hooks/use-auth';
import { displayMemberType } from '../../../../../schemas/establishmentSchema';
import View from '../../../Modals/View';
import DelegationView from '../../Delegations/View';
import AdditionalInfo from './CapacityHistory/AdditionalInfo';
import Bloc from './CapacityHistory/Bloc';

const GlobalInfo = ({ data }) => {
    const { user } = useAuth();

    const [isView, setView] = useState();
    const toggleIsView = () => setView((v) => !v);
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((v) => !v);
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
    return (
        <>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="flex-shrink-0">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                        Nom de la structure d&apos;établissement
                    </span>
                    <span className="text-dark fs-1 fw-bolder">{data?.organization?.name}</span>
                </div>{' '}
            </div>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="row">
                    <div className="col-lg-6">
                        {!!data?.relationship?.length && (
                            <div className="row mb-2">
                                <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                    Membre :
                                </span>
                                <span className="fw-bolder col-lg-6 fs-5">
                                    {displayMemberType[data?.relationship]}
                                </span>
                            </div>
                        )}
                        <div className="row mb-2">
                            <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                Département :
                            </span>
                            <span className="fw-bolder col-lg-6 fs-5">
                                <span className="me-2 badge badge-info">
                                    {data?.department?.departmentCode}
                                </span>
                                <span>{data?.department?.label}</span>
                            </span>
                        </div>
                        <div className="row mb-2">
                            <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                Numéro d&apos;établissement :
                            </span>
                            <span className="fw-bolder col-lg-6 fs-5">
                                {data?.establishmentNumber}
                            </span>
                        </div>
                        <div className="row mb-2">
                            <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                Clé d&apos;établissement :
                            </span>
                            <span className="fw-bolder col-lg-6 fs-5">
                                {data?.establishmentKey}
                            </span>
                        </div>
                        <div className="row mb-2">
                            <span className="col-lg-6 fw-bold text-gray-600 fs-6">Académie :</span>
                            <span className="fw-bolder col-lg-6 fs-5">{data?.academy?.name}</span>
                        </div>
                        <div className="row mb-2">
                            <span className="col-lg-6 fw-bold text-gray-600 fs-6">Région :</span>
                            <span className="fw-bolder col-lg-6 fs-5">
                                <button className="btn btn-link py-0" onClick={toggleIsView}>
                                    {data?.delegation?.name ? data?.delegation?.name : '-'}
                                </button>
                            </span>
                        </div>
                    </div>
                    {user?.role === 100 ? (
                        <div className="col-lg-6">
                            {!!data?.organization?.createdAt && (
                                <div className="row mb-2">
                                    <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                        Date d&apos;adhésion :
                                    </span>
                                    <span className="fw-bolder col-lg-6 fs-5">
                                        {moment(data?.organization?.createdAt).format('DD/MM/YYYY')}
                                    </span>
                                </div>
                            )}
                            <div className="row mb-2">
                                <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                    Date de démission :
                                </span>
                                <span className="fw-bolder col-lg-6 fs-5">-</span>
                            </div>
                            <div className="row mb-2">
                                <span className="col-lg-6 fw-bold text-gray-600 fs-6">
                                    Date de réadhésion :
                                </span>
                                <span className="fw-bolder col-lg-6 fs-5">-</span>
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
                            N° établissement (UAI/RNE) <b>LT</b> :
                        </span>
                        <span className="fw-bolder col-lg-8 fs-5"> {data?.numAcadLT}</span>
                    </div>
                )}
                {!!data?.numAcadLP?.length && (
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            N° établissement (UAI/RNE) <b>LP</b> :
                        </span>
                        <span className="fw-bolder col-lg-8 fs-5"> {data?.numAcadLP}</span>
                    </div>
                )}
                {!!data?.numAcadCFA?.length && (
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            N° établissement (UAI/RNE) <b>CFA</b> :
                        </span>
                        <span className="fw-bolder col-lg-8 fs-5"> {data?.numAcadCFA}</span>
                    </div>
                )}
                {!!data?.numExistanceCFP?.length && (
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            N° établissement (UAI/RNE) <b>CFC</b> :
                        </span>
                        <span className="fw-bolder col-lg-8 fs-5"> {data?.numExistanceCFP}</span>
                    </div>
                )}
                <div className="row mb-2">
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                        Nom de la structure d&apos;établissement :
                    </span>
                    <span className="fw-bolder col-lg-8 fs-5">{data?.organization?.name}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">Adresse :</span>
                    <span className="fw-bold col-lg-8 fs-6">
                        {coordinates?.voiceLabel} <br /> {coordinates?.zipCode} {coordinates?.city}{' '}
                        <br /> {country}
                    </span>
                </div>
                {!!coordinates?.phoneNumber && (
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">Téléphone :</span>
                        <span className="fw-bolder col-lg-8 fs-5">
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
                            Mail établissement :
                        </span>
                        <span className="fw-bolder col-lg-8 fs-5">
                            <a
                                target="_blank"
                                href={`mailto:${coordinates?.email}`}
                                rel="noreferrer">
                                {coordinates?.email}
                            </a>
                        </span>
                    </div>
                )}
                {!!coordinates?.website && (
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">Site web :</span>
                        <span className="fw-bolder col-lg-8 fs-5">
                            <a href={coordinates?.website} target="_blank" rel="noreferrer">
                                {coordinates?.website}
                            </a>
                        </span>
                    </div>
                )}
            </div>
            {!!newsCoordinates?.email && (
                <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                    <div className="row my-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            Mail CE pour réception des informations Unetp :
                        </span>
                        <span className="fw-bolder col-lg-8 fs-5">
                            <a
                                target="_blank"
                                href={`mailto:${newsCoordinates?.email}`}
                                rel="noreferrer">
                                {newsCoordinates?.email}
                            </a>
                        </span>
                    </div>
                </div>
            )}
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                    Coordonnées de l’organisme de gestion :
                </span>
                <div className="row mb-2">
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">Nom :</span>
                    <span className="fw-bolder col-lg-8 fs-5">
                        {' '}
                        {data?.ogecName ? data?.ogecName : '-'}
                    </span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">Téléphone :</span>
                    <span className="fw-bolder col-lg-8 fs-5">
                        {data?.ogecPhoneNumber ? data?.ogecPhoneNumber : '-'}
                    </span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">Code postal :</span>
                    <span className="fw-bolder col-lg-8 fs-5">
                        {' '}
                        {data?.ogecAddress ? data?.ogecAddress : '-'}
                    </span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">E-mail :</span>
                    <span className="fw-bolder col-lg-8 fs-5">
                        {' '}
                        {data?.ogecEmail ? data?.ogecEmail : '-'}
                    </span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">Ville :</span>
                    <span className="fw-bolder col-lg-8 fs-5">
                        {' '}
                        {data?.ogecCity ? data?.ogecCity : '-'}
                    </span>
                </div>
                {!!accountant?.length && (
                    <div className="row mb-2">
                        <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                            Mail comptable :
                        </span>
                        {accountantCoordinates?.map((e, i) => (
                            <span className="fw-bolder col-lg-8 fs-5" key={i}>
                                <a target="_blank" href={`mailto:${e.email}`} rel="noreferrer">
                                    {e.email}
                                </a>
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                    Nombre d&apos;apprenants :
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
                            {capacityHistory?.slice(0, 3)?.map((e) => (
                                <Bloc
                                    key={e.year}
                                    data={e}
                                    type={parseInt(`${data?.establishmentKey}`.split('').pop())}
                                />
                            ))}
                        </div>
                        <Collapse in={open}>
                            <div>
                                {capacityHistory?.slice(3)?.map((e) => (
                                    <Bloc
                                        data={e}
                                        key={e.year}
                                        type={parseInt(`${data?.establishmentKey}`.split('').pop())}
                                    />
                                ))}
                            </div>
                        </Collapse>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-secondary btn-sm" onClick={toggleOpen}>
                                {!open ? "Voir l'historique" : "Fermer l'historique"}
                            </button>
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
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">Labels :</span>
                    <span className="fw-bolder col-lg-8 fs-5">{labels?.length ? labels : '-'}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">Jumelage :</span>
                    <span className="fw-bolder col-lg-8 fs-5">
                        {pairing?.length ? pairing : '-'}
                    </span>
                </div>
            </div>
            {user?.role === 100 && data?.privateComment?.trim()?.length > 0 ? (
                <div className="notice bg-light-danger rounded border border-danger border border-dashed p-3 mt-3 bg-light">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                        Commentaires UNETP confidentiel :
                    </span>
                    <span className="fs-6">{data?.privateComment}</span>
                </div>
            ) : (
                <div></div>
            )}
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                pluralName="delegations"
                id={data?.delegation?.delegation?.id}
                label={data?.delegation?.name ? data?.delegation?.name : null}>
                <DelegationView />
            </View>
        </>
    );
};
export default GlobalInfo;
