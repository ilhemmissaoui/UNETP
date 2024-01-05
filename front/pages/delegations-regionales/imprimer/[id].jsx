import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';

import useToast from '../../../hooks/use-toast';
import settings from '../../../settings';
import RowHistory from '../../../ui/components/SharedComponents/Histories/ViewDTrow';
import Period from '../../../ui/components/Utils/Period';

const { endpointUrl } = settings;

const headersUser = [
    () => <th className="min-w-50px">Personnes </th>,
    () => <th className="min-w-50px">Libellé</th>,
    () => <th className="min-w-50px">Période</th>
];

const headersHistory = [
    () => <th className="min-w-50px">Type </th>,
    () => <th className="min-w-50px">Libellé</th>,
    () => <th className="min-w-50px">Période</th>,
    () => <th className="min-w-50px">Commentaire</th>
];

const Print = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const { setToast } = useToast();
    const { query } = useRouter();

    const fetchDelegation = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/delegations/${query?.id}`);
            console.log(data);
            setData(data);
        } catch (e) {
            setToast({
                message: `Erreur lors de la récupération de l'établissement`,
                variant: 'danger'
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        if (query?.id) fetchDelegation();
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
                        Délégation régionale :
                    </span>
                    <div className="d-flex">
                        <span className="text-dark fs-1 py-2 fw-bolder">
                            {data?.organization?.name}
                        </span>
                        <span className="text-info fw-bolder fs-3 ms-3 my-auto">
                            {data?.reference}
                        </span>
                    </div>
                </div>
            </div>
            <div className="separator my-5" />

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
                                        <tr className="text-center" key={e}>
                                            <td className=" align-items-center">
                                                <div className="text-gray-800 text-hover-primary mb-1">
                                                    <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
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
                                                <span className="text-info fs-7 fw-bolder ms-2">
                                                    {e?.comment}
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
