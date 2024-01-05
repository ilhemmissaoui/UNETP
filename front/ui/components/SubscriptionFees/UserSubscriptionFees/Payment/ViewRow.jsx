import React from 'react';

import { useMultiCRUDContext } from '../../../../../hooks/use-crud';
import { FormatPrice } from '../../../../utils/currency';
const ViewRow = ({ data }) => {
    const totalPaid = data?.reduce((pv, cv) => pv + parseFloat(cv?.amount || 0), 0);
    const { usersIncluded } = useMultiCRUDContext();
    const payments = [...data, ...usersIncluded]?.reduce((pv, cv) => {
        if (!pv.find((e) => e.entity?.id === cv?.entity.id)) {
            return [...pv, cv];
        }
        return pv;
    }, []);
    return (
        <div className="fw-bolder fs-6 text-gray-800">
            <div>Référence : {data[0]?.subscriptionFeesPaymentRef?.reference} </div>
            <div className="mb-5">
                Montant : <FormatPrice value={totalPaid || 0} />{' '}
            </div>
            <div>Mode de paiement : {data[0]?.subscriptionFeesPaymentRef?.paimentType} </div>
            <div>Date de Dépot : {data[0]?.subscriptionFeesPaymentRef?.depositDate} </div>
            <div className="mb-5">
                Date d&apos;encaissement : {data[0]?.subscriptionFeesPaymentRef?.cashedDate}{' '}
            </div>
            <div className="mb-5">Détail du paiement :</div>
            <div className="notice bg-light-success border-dashed  border-success rounded border p-3 mb-3">
                <div className="row mt-5">
                    <div className="col-md-4 text-gray-700 fs-6 fw-bolder">Type de cotisation</div>
                    <div className="col-md-4 text-gray-700 fs-6 fw-bolder">Nom</div>
                    <div className="col-md-4 text-gray-700 fs-6 fw-bolder">Versement</div>
                </div>
                {payments?.map((e) => {
                    if (e?.type === 'organization')
                        return (
                            <div className="row" key={e.id}>
                                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">
                                    établissement
                                </div>
                                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">
                                    {e?.entity?.name}{' '}
                                    <span className="fw-bolder fs-7 badge badge-primary">
                                        {e?.entity?.establishment?.establishmentKey}
                                    </span>
                                </div>
                                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">
                                    <FormatPrice value={e.amount || 0} />
                                </div>
                            </div>
                        );
                    if (e?.type === 'user')
                        return (
                            <div className="row" key={e.id}>
                                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">
                                    personnelle
                                </div>
                                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">
                                    {`${e?.entity?.civility?.abbreviation} ${e?.entity?.firstName} ${e?.entity?.lastName} `}
                                    <span className="fw-bolder fs-7 badge badge-primary">
                                        {e?.entity?.establishment?.establishmentKey}
                                    </span>
                                </div>
                                <div className="col-md-4 text-gray-700 fs-6 fw-bolder my-5">
                                    <FormatPrice value={e.amount || 0} />
                                </div>
                            </div>
                        );
                })}

                <div className="row">
                    <div className="col-md-8 text-gray-900 fs-6 fw-bolder my-5 text-sm-end">
                        Totale
                    </div>

                    <div className="col-md-4 text-gray-900 fs-6 fw-bolder my-5">
                        <FormatPrice value={totalPaid} />
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <div>Commentaire :</div>
                <div className="fs-7 text-gray-900">
                    {data[0]?.subscriptionFeesPaymentRef?.comment}{' '}
                </div>
            </div>
        </div>
    );
};
export default ViewRow;
