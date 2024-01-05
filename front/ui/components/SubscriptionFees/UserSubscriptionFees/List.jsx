import clsx from 'clsx';

import { FormatPrice } from '../../../utils/currency';
import DTRow from './DTRow';
const headers = [
    () => <th className="min-w-50px">Établissement/personne</th>,
    () => <th className="min-w-50px">Syndicat</th>,
    () => <th className="min-w-50px">Montant</th>,
    () => <th className="min-w-50px">Solde</th>,
    () => <th className="min-w-50px">Statut</th>
];
const colorByStatus = {
    'Solde initial': 'bg-danger ',
    'Solde partiel': 'bg-danger',
    Validé: 'bg-success'
};
const List = ({ data, columnsCount = 6, Row = DTRow, status }) => {
    const totalToPay = data?.reduce(
        (pv, cv) =>
            pv +
            (!isNaN(parseFloat(cv?.customAmount))
                ? parseFloat(cv?.customAmount || 0)
                : parseFloat(cv?.calculatedAmount || 0)),
        0
    );
    const totalPaid = data?.reduce(
        (pv, cv) =>
            pv +
            cv?.subscriptionPayments?.reduce((ppv, ccv) => ppv + parseFloat(ccv.amount || 0), 0),
        0
    );

    const totalUnpaid = (totalToPay || 0) - (totalPaid || 0);
    return (
        <div className="table-responsive">
            <table className="table align-middle fs-9 gy-2 no-footer">
                <thead>
                    <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                        {headers.slice(0, columnsCount).map((Header, i) => (
                            <Header key={i} />
                        ))}
                    </tr>
                </thead>
                <tbody className="text-gray-600 fw-bold">
                    {data?.map((e, i) => (
                        <Row data={e} key={e?.id} i={i} />
                    ))}
                </tbody>
                <tfoot className="notice bg-light-primary border-dashed border-primary rounded border p-3">
                    <tr className="fw-bolder fs-6 text-gray-900 text-center">
                        <th className="text-end" colSpan={2}>
                            Cotisation totale
                        </th>
                        <th>
                            {' '}
                            <FormatPrice value={totalToPay} />
                        </th>
                        <th>
                            {' '}
                            <FormatPrice value={totalUnpaid || 0} />
                        </th>
                        <th>
                            {' '}
                            <span className={clsx(' badge fs-7 fw-bolder', colorByStatus[status])}>
                                {status}
                            </span>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default List;
