const AdditionalInfo = ({ data }) => {
    const guardianships = data?.organization?.guardianships?.map((e) => e?.label)?.join(', ');
    const mixed = data?.mixed;
    const pensions = data?.organization?.pensions?.map((e) => e?.label)?.join(', ');

    return (
        <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 gy-2">
                <thead>
                    <tr className="col-lg-4 fw-bold text-gray-600 fs-6">
                        <th>Tutelle</th>
                        <th>Mixité</th>
                        <th>Pension</th>
                    </tr>
                </thead>

                <tbody className="fw-bolder fs-5">
                    <tr>
                        <td>{guardianships?.length ? guardianships : null}</td>
                        <td>{mixed?.length ? mixed : null}</td>
                        <td>{pensions?.length ? pensions : null}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default AdditionalInfo;
