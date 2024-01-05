const EstablishmentHeader = ({ data }) => {
    const city =
        data?.organization?.coordinates.find((e) => e?.isDefault)?.city ||
        data?.organization?.coordinates[0]?.city;

    return (
        <div className="d-flex flex-column w-100">
            <div>
                <div className="d-flex align-items-center">
                    <span>{data?.organization?.name}</span>
                    {data?.organization?.establishment?.department?.departmentCode && (
                        <span className="ms-2 badge badge-info badge-outline">
                            {data?.organization?.establishment?.department?.departmentCode}
                        </span>
                    )}
                    {city && (
                        <span className="ms-2 badge badge-secondary badge-outline">{city}</span>
                    )}
                </div>
                <span className="badge badge-primary badge-lg">
                    {data?.organization?.establishment?.establishmentKey}
                </span>
            </div>
        </div>
    );
};
export default EstablishmentHeader;
