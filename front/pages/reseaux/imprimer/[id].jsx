import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import NumberFormat from 'react-number-format';

import useToast from '../../../hooks/use-toast';
import settings from '../../../settings';
import RowHistory from '../../../ui/components/SharedComponents/Histories/ViewDTrow';
const { endpointUrl } = settings;

const headersUser = [
    () => <th className="min-w-50px">Personne</th>,
    () => <th className="min-w-50px">Libellé</th>
];

const headersHistory = [
    () => <th className="min-w-50px">Type </th>,
    () => <th className="min-w-50px">Libellé</th>,
    () => <th className="min-w-50px">Période</th>
];

const headersGlobalInfo = [
    () => <th className="min-w-50px">Email</th>,
    () => <th className="min-w-50px">Téléphone</th>,
    () => <th className="min-w-50px">Adresse</th>,
    () => <th className="min-w-50px">Fax</th>
];

const Print = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const { setToast } = useToast();
    const { query } = useRouter();

    const fetchNetwork = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/networks/${query?.id}`);
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

    useEffect(async () => {
        if (query?.id) await fetchNetwork();
    }, [query?.id]);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                window.print();
            }, 500);
        }
    }, [loading]);

    const users = data?.organization?.functions;

    const history = data?.organization?.histories;

    return loading ? (
        <div className="d-flex w-100 justify-content-center my-20">
            <Spinner animation="border" />
        </div>
    ) : (
        <div className="container-fluid">
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="flex-shrink-0">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                        Réseau :
                    </span>
                    <span className="text-dark fs-1 fw-bolder">{data?.organization?.name}</span>{' '}
                    <div className="row mb-7">
                        <span className="text-gray-600 fs-5 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                            Date de création :{' '}
                            <span className="fw-bold fs-7 text-gray-600">
                                {moment(data?.createdAt).format('DD/MM/YYYY HH:mm')}
                            </span>{' '}
                        </span>
                    </div>
                </div>
            </div>
            <div className="my-3" />

            <div className="fw-bolder fs-3 d-flex align-items-center">
                <span>Informations Générales : </span>
            </div>
            {data?.organization?.description.length ? (
                <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                    <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                        <div className="fw-bold">
                            <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                                Description :{' '}
                            </span>
                            <div className="fs-5 text-gray-900 py-3">
                                {' '}
                                {data?.organization?.description}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            <div className="separator my-5" />
            <div className="form-group  mb-3">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                    Réseau Biotechnologies :{' '}
                </span>
            </div>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="table-responsive">
                    <table className="table align-middle fs-9 gy-2 no-footer">
                        <thead>
                            <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                                {headersGlobalInfo.slice(0).map((Header, i) => (
                                    <Header key={i} />
                                ))}
                            </tr>
                        </thead>

                        <tbody className="text-gray-600 fw-bold text-center">
                            {data?.organization?.coordinates?.map((e) => (
                                <tr className="align-middle" key={e}>
                                    <td>
                                        <span className="fw-bolder col-lg-8 fs-7">{e?.email}</span>
                                    </td>
                                    <td>
                                        <span className="text-dark  text-hover mb-1 fs-7">
                                            <NumberFormat
                                                displayType="text"
                                                format="## ## ## ## ##"
                                                value={e?.phoneNumber}
                                            />
                                        </span>
                                    </td>

                                    <td>
                                        <span className="text-dark  text-hover mb-1 fs-7">
                                            {e?.voiceNumber} {e?.voiceLabel}
                                        </span>
                                        <br />
                                        <span className="text-dark  text-hover mb-1 fs-7">
                                            {e?.addressLine1} {e?.addressLine2} {e?.zipCode}
                                            {e?.city}
                                            {!!e?.cedex?.length && `- ${e?.cedex}`}
                                        </span>
                                        <br />
                                        <span className="text-dark  text-hover mb-1 fs-7">
                                            {e?.country?.label}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="text-dark  text-hover mb-1 fs-7">
                                            {e?.fax}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="separator my-5" />
            {users?.length && (
                <div>
                    <div className="fw-bolder fs-3 d-flex align-items-center">
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
                                        <tr className="text-center" key={e}>
                                            <td className=" align-items-center">
                                                <div className="text-gray-800 text-hover-primary mb-1">
                                                    <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                                                        {e?.user?.civility?.abbreviation}
                                                        {e?.user?.firstName}
                                                    </span>{' '}
                                                    <span className="text-dark  text-hover mb-1 fs-7">
                                                        {e?.user?.lastName}
                                                    </span>
                                                </div>
                                            </td>

                                            <td>
                                                <span className="text-dark  text-hover mb-1 fs-7">
                                                    {e?.functionLabel?.singularMaleName}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            <div className="separator my-5" />
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
        </div>
    );
};
export default Print;
