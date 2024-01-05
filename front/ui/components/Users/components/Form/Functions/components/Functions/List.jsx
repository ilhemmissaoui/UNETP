import DTRow from './DTRow';

const headers = [
    () => <th className="min-w-50px">Fonction </th>,
    () => <th className="min-w-50px">Organisme</th>,
    () => <th className="min-w-50px">Période</th>,
    () => (
        <th className="min-w-50px">
            <i className="fa fa-bolt"></i>
        </th>
    )
];
const List = ({ data, columnsCount = 5, Row = DTRow, customHeaders }) => {
    return (
        <div className="table-responsive">
            <table className="table align-middle fs-9 gy-2 no-footer">
                <thead>
                    <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                        {(customHeaders ? customHeaders : headers)
                            .slice(0, columnsCount)
                            .map((Header, i) => (
                                <Header key={i} />
                            ))}
                    </tr>
                </thead>
                <tbody className="text-gray-600 fw-bold">
                    {data?.map((e) => (
                        <Row data={e} key={e.id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;
