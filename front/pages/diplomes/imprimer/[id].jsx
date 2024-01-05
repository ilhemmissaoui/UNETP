import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';

import useToast from '../../../hooks/use-toast';
import settings from '../../../settings';

const { endpointUrl } = settings;

const Print = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const { setToast } = useToast();
    const { query } = useRouter();

    const fetchDiplome = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/diplomas/${query?.id}`);
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
        if (query?.id) fetchDiplome();
    }, [query?.id]);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                window.print();
            }, 500);
        }
    }, [loading]);

    return loading ? (
        <div className="d-flex w-100 justify-content-center my-20">
            <Spinner animation="border" />
        </div>
    ) : (
        <div className="container-fluid">
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="flex-shrink-0">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                        Nom de diplôme
                    </span>
                    <div className="d-flex">
                        <span className="text-dark fs-1 fw-bolder">{data?.name} </span>
                        <span className="ms-3 text-info fs-6 my-auto fw-bolder">
                            {data?.reference}
                        </span>
                    </div>
                </div>
            </div>

            <div className="separator my-5" />
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="row mb-2">
                    <span className="col-lg-2 fw-bold text-gray-600 fs-6">Niveau :</span>

                    <span className="fw-bolder col-lg-6 fs-5">{data?.diplomaGrade?.label}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-2 fw-bold text-gray-600 fs-6">Spécialité :</span>

                    <span className="fw-bolder col-lg-8 fs-5">
                        {data?.diplomaSpecialty?.label}
                        <span className="badge badge-primary">
                            {data?.department?.departmentCode}
                        </span>
                    </span>
                </div>

                <div className="row mb-2">
                    <span className="col-lg-2 fw-bold text-gray-600 fs-6">Domaine :</span>

                    <span className="fw-bolder col-lg-8 fs-5"> {data?.diplomaDomain?.label}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-2 fw-bold text-gray-600 fs-6">Groupe :</span>

                    <span className="fw-bolder col-lg-8 fs-5"> {data?.diplomaGroup?.label}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-2 fw-bold text-gray-600 fs-6">Sous groupe :</span>

                    <span className="fw-bolder col-lg-8 fs-5"> {data?.diplomaSubGroup?.label}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-2 fw-bold text-gray-600 fs-6">Type :</span>

                    <span className="fw-bolder col-lg-8 fs-5">{data?.diplomaType?.label}</span>
                </div>
            </div>

            <div className="separator my-3" />

            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-600 fs-5 fw-bolder me-2 d-block lh-1 py-5 pb-1">
                    Etablissements délivrant ce diplôme :
                </span>

                <div className="py-5">
                    <div className="py-0">
                        {data?.diplomas?.map((e) => (
                            <div className="mt-3" key={e}>
                                <span className="text-info fw-bolder fs-7 w-55px justify-content-center">
                                    {e?.organization?.establishment?.establishmentKey}
                                </span>
                                <span className="fw-bold fs-6 ms-3"> {e?.organization?.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Print;
