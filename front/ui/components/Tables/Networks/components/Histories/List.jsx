import DTRow from '../../../../SharedComponents/Histories/ViewDTrow';

const headers = [
    () => <th className="min-w-50px">Type </th>,
    () => <th className="min-w-50px">Libellé</th>,
    () => <th className="min-w-50px">Période</th>
];
const List = ({ data, columnsCount = 4 }) => {
    console.log(data);
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

                <tbody className="text-gray-600 fw-bold text-center">
                    {data?.organization?.histories?.map((e) => (
                        <DTRow data={e} key={e._id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;
