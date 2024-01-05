import { getCurrentYear } from '../../../../../utils/time';

const byType = {
    0: ({ data }) => {
        const currentYear = getCurrentYear();
        const {
            btsContractStudentsCount,
            collegeContractStudentsCount,
            lpContractStudentsCount,
            lgtContractStudentsCount,
            supContractStudentsCount,
            withoutContractBtsStudentsCount,
            withoutContractLpStudentsCount,
            withoutContractLgtStudentsCount,
            withoutContractSupStudentsCount
        } = data;
        const thisYearTotal =
            collegeContractStudentsCount +
            lpContractStudentsCount +
            lgtContractStudentsCount +
            supContractStudentsCount +
            btsContractStudentsCount;
        const total =
            withoutContractBtsStudentsCount +
            withoutContractLpStudentsCount +
            withoutContractLgtStudentsCount +
            withoutContractSupStudentsCount;
        return data?.year === currentYear ? (
            <div className="fs-5">
                Nombre d&apos;élèves :{' '}
                <span className="fw-bolder text-primary">{thisYearTotal}</span> = Collège(
                {collegeContractStudentsCount || 0}) + LP(
                {lpContractStudentsCount || 0}) + LGT({lgtContractStudentsCount || 0}) + BTS(
                {btsContractStudentsCount || 0}) + Sup & CPGE(
                {supContractStudentsCount || 0})
            </div>
        ) : (
            <>
                <div className="fs-5">
                    Nombre d&apos;élèves sous contrat :{' '}
                    <span className="fw-bolder text-primary">{thisYearTotal}</span> = Collège({}
                    {collegeContractStudentsCount || 0}) + LP({lpContractStudentsCount || 0}) + LGT(
                    {lgtContractStudentsCount || 0}) + BTS({btsContractStudentsCount || 0}) + Sup &
                    CPGE(
                    {supContractStudentsCount || 0})
                </div>
                <div className="fs-5">
                    Nombre d&apos;élèves hors contrat :{' '}
                    <span className="fw-bolder text-primary">{total}</span> = LP(
                    {withoutContractLpStudentsCount || 0}) + LGT(
                    {withoutContractLgtStudentsCount || 0}) + BTS(
                    {withoutContractBtsStudentsCount || 0}) + Sup & CPGE(
                    {withoutContractSupStudentsCount || 0})
                </div>
            </>
        );
    },
    1: ({ data }) => (
        <div className="fs-5">
            Nombre d&apos;apprentis :{' '}
            <span className="fw-bolder text-primary">{data?.cfaUfaApprenticesCount || 0}</span>
        </div>
    ),
    2: ({ data }) => (
        <div className="fs-5">
            Nombre d&apos;heures stagiaire :{' '}
            <span className="fw-bolder text-primary">{data?.internsHoursCount}</span>
        </div>
    ),
    3: ({ data }) => (
        <div className="fs-5">
            Nombre d&apos;apprentis :{' '}
            <span className="fw-bolder text-primary">{data?.cfaUfaApprenticesCount || 0}</span>
        </div>
    ),
    4: ({ data }) => (
        <div className="fs-5">
            Nombre d&apos;heures stagiaire :{' '}
            <span className="fw-bolder text-primary">{data?.cfpCfcInternsHoursCount || 0}</span>
        </div>
    )
};
const Bloc = ({ data, type }) => {
    const Component = byType[type];
    return (
        <div className="mb-3">
            <span className="fw-bolder fs-5 text-info">{data?.year}</span>

            <Component data={data} />
            {!!data?.studentEmployerCount && (
                <div className="fs-5">
                    Nombre d&apos;élèves en fonctionnement « Collège employeur » :{' '}
                    <span className="fw-bolder text-primary">{data?.studentEmployerCount}</span>
                </div>
            )}
        </div>
    );
};

export default Bloc;
