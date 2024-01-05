import { FormatPrice } from '../../../../../utils/currency';

const Settings = ({ data }) => {
    return (
        <>
            <div className="mt-4">
                <div className="fs-3 fw-bolder text-gray-600 mb-3">
                    Année de cotisation : <span className="text-gray-900">{data?.year} </span>
                </div>
                <div className="notice bg-light rounded border border-dashed  border-gray-400 p-3 mb-3">
                    <span className="text-gray-600 fs-5 fw-bolder me-2 d-block lh-1 py-5 pb-1">
                        Taux par élève
                    </span>{' '}
                    <div className="mt-3">
                        <ul className="text-gray-900 fs-6 fw-bolder">
                            <li>
                                Collége : <FormatPrice value={data?.schoolContractAmount} />
                            </li>
                            <li>
                                LP : <FormatPrice value={data?.lpContractAmount} />
                            </li>
                            <li>
                                LGT : <FormatPrice value={data?.lgtContractAmount} />
                            </li>
                            <li>
                                BTS : <FormatPrice value={data?.btsContractAmount} />
                            </li>
                            <li>
                                SUP-CPGE : <FormatPrice value={data?.scSup} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="notice bg-light rounded border border-dashed  border-gray-400 p-3 mb-3">
                    <div>
                        <span className="text-gray-600 fs-5 fw-bolder me-2 d-block lh-1 py-5 pb-1">
                            Taux par apprenti
                        </span>{' '}
                    </div>
                    <ul className="text-gray-900 fs-6 fw-bolder">
                        <li>
                            CFA/UFA : <FormatPrice value={data?.cfaUfa} />
                        </li>
                    </ul>
                </div>
                <div className="notice bg-light rounded border border-dashed  border-gray-400 p-3 mb-3">
                    <div>
                        <span className="text-gray-600 fs-5 fw-bolder me-2 d-block lh-1 py-5 pb-1">
                            Taux pour 1000 h.
                        </span>{' '}
                    </div>
                    <ul className="text-gray-900 fs-6 fw-bolder">
                        <li>
                            CFP/CFC : <FormatPrice value={data?.cfpCfc} />
                        </li>
                    </ul>
                </div>
                <div className="notice bg-light rounded border border-dashed  border-gray-400 p-3 mb-3">
                    <div>
                        <span className="text-gray-600 fs-5 fw-bolder me-2 d-block lh-1 py-5 pb-1">
                            Part fixe (depuis 2012/2013)
                        </span>{' '}
                    </div>
                    <ul className="text-gray-900 fs-6 fw-bolder">
                        <li>
                            Part fixe (clé 0,3,4) : <FormatPrice value={data?.fixedPart034} />
                        </li>
                        <li>
                            Part fixe (clé 1,2) : <FormatPrice value={data?.fixedPart12} />
                        </li>
                    </ul>
                </div>
                <div className="notice bg-light rounded border border-dashed  border-gray-400 p-3 mb-3">
                    <div>
                        <span className="text-gray-600 fs-5 fw-bolder me-2 d-block lh-1 py-5 pb-1">
                            Autres Taux
                        </span>{' '}
                    </div>
                    <ul className="text-gray-900 fs-6 fw-bolder">
                        <li>
                            Chef d&apos;établissement :{' '}
                            <FormatPrice value={data?.headEstablishment} />
                        </li>
                        <li>
                            Autre dirigeant : <FormatPrice value={data?.otherLeader} />
                        </li>
                        <li>
                            Ancien : <FormatPrice value={data?.oldHeadEstablishment} />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Settings;
