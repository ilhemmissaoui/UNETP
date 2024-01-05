import DTRow from './DTRow';

const headers = [
    () => <th className="min-w-50px">Nom</th>,
    () => <th className="min-w-50px">N° etablissement</th>,
    () => <th className="min-w-50px">Clé</th>,
    () => (
        <th className="min-w-50px">
            <i className="fa fa-bolt"></i>
        </th>
    )
];

const List = ({ data, Row = DTRow, columnsCount = 4 }) => {
    return (
        <div className="table-responsive">
            <table className="table align-middle fs-9 gy-2 no-footer">
                <thead>
                    <tr className="fw-bolder fs-7 text-gray-800 text-center border-1 bg-light">
                        {headers.slice(0, columnsCount).map((Header) => (
                            <Header key />
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
