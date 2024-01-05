import moment from 'moment';
import React from 'react';

import { useMultiCRUDContext } from '../../../../../hooks/use-crud';
import { FormatPrice } from '../../../../utils/currency';
import OrganizationRow from './components/OrganizationRow';
import UserRow from './components/UserRow';
const paimentEntity = {
    organization: {
        component: OrganizationRow
    },
    user: {
        component: UserRow
    }
};
const ViewRow = ({ data }) => {
    console.log(data);
    const totalPaid = data?.enitiesPayments?.reduce(
        (pv, cv) => pv + parseFloat(cv?.amount || 0),
        0
    );
    const { entities } = useMultiCRUDContext();

    return (
        <div className="fw-bolder fs-6 text-gray-800">
            <div>Référence : {data?.reference} </div>
            <div className="mb-5">
                Montant : <FormatPrice value={totalPaid || 0} />{' '}
            </div>
            <div>Mode de paiement : {data?.paimentType} </div>
            <div>Date de création : {moment(data?.depositDate).format('YYYY-MM-DD')} </div>
            <div className="mb-5">
                Date d&apos;encaissement : {moment(data?.cashedDate).format('YYYY-MM-DD')}{' '}
            </div>
            <div className="mb-5">Détail du paiement :</div>
            <div className="notice bg-light-success border-dashed  border-success rounded border p-3 mb-3">
                <div className="row mt-5">
                    <div className="col-md-4 text-gray-700 fs-6 fw-bolder">Type de cotisation</div>
                    <div className="col-md-4 text-gray-700 fs-6 fw-bolder">Nom</div>
                    <div className="col-md-4 text-gray-700 fs-6 fw-bolder">Versement</div>
                </div>
                {data?.enitiesPayments?.map((e) => {
                    if (e?.type) {
                        const { component: Component } = paimentEntity[e?.type];
                        return (
                            <Component
                                key={e}
                                data={{
                                    ...e,
                                    entity: entities.find((a) => e.entityId === a.id)
                                }}
                            />
                        );
                    }
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
                <div className="fs-7 text-gray-900">{data?.comment} </div>
            </div>
        </div>
    );
};
export default ViewRow;
