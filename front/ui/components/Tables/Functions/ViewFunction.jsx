import React from 'react';

import useData from '../../../../hooks/use-data';

const ViewFunction = () => {
    const { data } = useData();

    return (
        <>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="flex-shrink-0">
                    <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                        Intitulé de la fonction :
                    </span>
                    <span className="text-dark fs-1 fw-bolder">{data?.singularMaleName}</span>
                </div>
            </div>

            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className="separator my-5" />
                <div className="row mb-2">
                    <span className="col-lg-3 fw-bold text-gray-600 fs-5">
                        {' '}
                        Intitulé masculin :
                    </span>

                    <span className="fw-bolder col-lg-8 fs-5"> {data?.singularMaleName}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-3 fw-bold text-gray-600 fs-5">Intitulé féminin :</span>

                    <span className="fw-bolder col-lg-8 fs-5"> {data?.singularFemaleName}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-3 fw-bold text-gray-600 fs-5">
                        Intitulé masculin pluriel :
                    </span>

                    <span className="fw-bolder col-lg-8 fs-5"> {data?.pluralMaleName}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-3 fw-bold text-gray-600 fs-5">
                        {' '}
                        Intitulé féminin pluriel :
                    </span>

                    <span className="fw-bolder col-lg-8 fs-5">{data?.pluralFemaleName}</span>
                </div>
                <div className="separator my-5" />

                <div className="row mb-2">
                    <span className="col-lg-3 fw-bold text-gray-600 fs-5">
                        Fonction applicable pour l&apos;organisme :
                    </span>

                    <span className="fw-bolder col-lg-4 fs-5">
                        {' '}
                        {data?.organizationType?.label}
                    </span>
                </div>

                <div className="d-flex fs-5 py-9">
                    {' '}
                    Une personne exerçant cette fonction est assimilée à un chef
                    d&apos;établissement :
                    <span className="ps-3">
                        {' '}
                        {data?.isHeadMaster ? (
                            <span className="badge badge-light-success fs-8 fw-bolder">Oui</span>
                        ) : (
                            <span className="badge badge-light-danger fs-8 fw-bolder">Non</span>
                        )}
                    </span>
                </div>
            </div>
        </>
    );
};

export default ViewFunction;
