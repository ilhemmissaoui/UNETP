import DTRow from './DTRow';

const headers = [
    () => <th className="min-w-50px">Cotisation </th>,
    () => <th className="min-w-50px">Statut</th>,
    () => <th className="min-w-50px">Montant </th>,
    () => (
        <th className="text-center">
            <i className="fa fa-bolt"></i>
        </th>
    )
];
const List = ({ data, columnsCount = 5, Row = DTRow, establishmentKey, capacityHistories }) => {
    return (
        <>
            <div className="table-responsive">
                <table className="table align-middle fs-9 gy-2 no-footer">
                    <thead>
                        <tr className="fw-bolder fs-7 text-gray-800  bg-light text-center">
                            {headers.slice(0, columnsCount).map((Header, i) => (
                                <Header key={i} />
                            ))}
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 fw-bold text-center">
                        {data?.organization?.subscriptionFees?.map((e) => (
                            <Row
                                establishmentKey={establishmentKey}
                                data={e}
                                capacityHistories={capacityHistories}
                                key={e.id}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default List;
