const OrganizationHeader = ({ data }) => {
    return (
        <div className="d-flex flex-column w-100">
            <div>
                <div className="d-flex align-items-center">
                    <span>{data?.organization?.name}</span>
                </div>
            </div>
        </div>
    );
};
export default OrganizationHeader;
