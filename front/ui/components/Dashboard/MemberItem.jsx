import { FormatPrice } from '../../utils/currency';
const SubscriptionFeeByType = {
    0: ({ data }) => {
        const subscriptionFees = data?.organization?.subscriptionFees[0];
        const subscriptionParam = subscriptionFees?.subscriptionParam || {};
        const capacityHistory = data?.organization?.capacityHistories.find(
            (e) => subscriptionParam.year == e.year
        );
        return (
            <>
                <span className="d-block">
                    Part fixe :{' '}
                    <span className="fw-bolder text-primary">
                        <FormatPrice
                            value={
                                isNaN(subscriptionParam?.fixedPartAmount)
                                    ? subscriptionFees?.subscriptionParam?.fixedPart034 || 0
                                    : subscriptionParam?.fixedPartAmount || 0
                            }
                        />
                    </span>{' '}
                </span>
                <span className="d-block">
                    Nombre Collège :{' '}
                    <span className="fw-bolder text-primary">
                        {capacityHistory?.collegeContractStudentsCount || 0} x{' '}
                        {subscriptionParam?.schoolContractAmount || 0} ={' '}
                        <FormatPrice
                            value={
                                capacityHistory?.collegeContractStudentsCount ||
                                0 * subscriptionParam?.schoolContractAmount ||
                                0
                            }
                        />
                    </span>{' '}
                </span>
                <span className="d-block">
                    Nombre LP :{' '}
                    <span className="fw-bolder text-primary">
                        {capacityHistory?.lpContractStudentsCount || 0} x{' '}
                        {subscriptionParam?.lpContractAmount || 0} ={' '}
                        <FormatPrice
                            value={
                                capacityHistory?.lpContractStudentsCount ||
                                0 * subscriptionParam?.lpContractAmount ||
                                0
                            }
                        />
                    </span>{' '}
                </span>
                <span className="d-block">
                    Nombre LGT :{' '}
                    <span className="fw-bolder text-primary">
                        {capacityHistory?.lgtContractStudentsCount || 0} x{' '}
                        {subscriptionParam?.lgtContractAmount || 0} ={' '}
                        <FormatPrice
                            value={
                                capacityHistory?.lgtContractStudentsCount ||
                                0 * subscriptionParam?.lgtContractAmount ||
                                0
                            }
                        />
                    </span>{' '}
                </span>
                <span className="d-block">
                    Nombre BTS :{' '}
                    <span className="fw-bolder text-primary">
                        {capacityHistory?.btsContractStudentsCount || 0} x{' '}
                        {subscriptionParam?.btsContractAmount || 0} ={' '}
                        <FormatPrice
                            value={
                                capacityHistory?.btsContractStudentsCount ||
                                0 * subscriptionParam?.btsContractAmount ||
                                0
                            }
                        />
                    </span>{' '}
                </span>
                <span className="d-block">
                    Nombre Sup + CPGE :{' '}
                    <span className="fw-bolder text-primary">
                        {capacityHistory?.supContractStudentsCount || 0} x{' '}
                        {subscriptionParam?.scSup || 0} ={' '}
                        <FormatPrice
                            value={
                                capacityHistory?.supContractStudentsCount ||
                                0 * subscriptionParam?.scSup ||
                                0
                            }
                        />
                    </span>{' '}
                </span>
                <span className="d-block">
                    Total :{' '}
                    <span className="fw-bolder text-primary">
                        <FormatPrice value={subscriptionFees?.calculatedAmount || 0} />
                    </span>{' '}
                </span>
                {!!subscriptionFees?.customAmount && (
                    <span className="d-block">
                        Montant personnalisé:{' '}
                        <span className="fw-bolder text-primary">
                            <FormatPrice value={subscriptionFees?.customAmount || 0} />
                        </span>{' '}
                    </span>
                )}
            </>
        );
    },
    1: ({ data }) => {
        const subscriptionFees = data?.organization?.subscriptionFees[0];
        const subscriptionParam = subscriptionFees?.subscriptionParam;

        const capacityHistory = data?.organization?.capacityHistories.find(
            (e) => subscriptionParam.year == e.year
        );
        const { fixedPart12, cfaUfa } = subscriptionParam || {};
        const { cfaUfaApprenticesCount } = capacityHistory || {};
        const totalNbrAprenti = parseFloat(cfaUfa) * parseInt(cfaUfaApprenticesCount);
        const total =
            parseInt(
                isNaN(subscriptionParam?.fixedPartAmount)
                    ? fixedPart12 || 0
                    : subscriptionParam?.fixedPartAmount || 0
            ) + parseInt(totalNbrAprenti || 0);
        return (
            <div>
                Part fixe :{' '}
                <span className="fw-bolder text-primary">
                    <FormatPrice
                        value={
                            isNaN(subscriptionParam?.fixedPartAmount)
                                ? fixedPart12 || 0
                                : subscriptionParam?.fixedPartAmount || 0
                        }
                    />{' '}
                </span>
                <br />
                Nombre d&apos;apprentis :{' '}
                <span className="fw-bolder text-primary">
                    {cfaUfaApprenticesCount || 0} x {cfaUfa || 0} ={' '}
                    <FormatPrice value={totalNbrAprenti || 0} />
                </span>{' '}
                <br />
                {subscriptionFees?.customAmount && (
                    <>
                        {' '}
                        Montant personnalisé :
                        <span className="fw-bolder text-primary">
                            <FormatPrice value={subscriptionFees?.customAmount || 0} />{' '}
                        </span>
                    </>
                )}
                Total :
                <strong>
                    {' '}
                    <span className="fw-bolder text-primary">
                        <FormatPrice value={total || 0} />
                    </span>
                </strong>
            </div>
        );
    },
    2: ({ data }) => {
        const subscriptionFees = data?.organization?.subscriptionFees[0];
        const subscriptionParam = subscriptionFees?.subscriptionParam;

        const capacityHistory = data?.organization?.capacityHistories.find(
            (e) => subscriptionParam.year == e.year
        );
        const { fixedPart12, cfpCfc } = subscriptionParam || {};
        const { cfpCfcInternsHoursCount } = capacityHistory || {};
        const totalHours =
            (parseFloat(cfpCfcInternsHoursCount || 0) * parseFloat(cfpCfc || 0)) / 1000;
        const total =
            totalHours +
            parseFloat(
                isNaN(subscriptionParam?.fixedPartAmount)
                    ? fixedPart12 || 0
                    : subscriptionParam?.fixedPartAmount || 0
            );
        return (
            <div>
                Part fixe :{' '}
                <span className="fw-bolder text-primary">
                    <FormatPrice
                        value={
                            isNaN(subscriptionParam?.fixedPartAmount)
                                ? fixedPart12 || 0
                                : subscriptionParam?.fixedPartAmount || 0
                        }
                    />{' '}
                </span>
                <br />
                Nombre d&apos;heures stagiaire :{' '}
                <span className="fw-bolder text-primary">
                    {cfpCfcInternsHoursCount || 0} x {cfpCfc || 0} ={' '}
                    <FormatPrice value={totalHours ? totalHours.toFixed(2) : 0} />
                </span>{' '}
                <br />
                Total :{' '}
                <span className="fw-bolder text-primary">
                    {' '}
                    <FormatPrice value={total.toFixed(2) || 0} />
                </span>
                <br />
                {!!subscriptionFees?.customAmount && (
                    <>
                        <br />
                        Montant personnalisé :{' '}
                        <span className="fw-bolder text-primary">
                            <strong>
                                <FormatPrice value={subscriptionFees?.customAmount || 0} />
                            </strong>
                        </span>
                    </>
                )}
            </div>
        );
    },
    3: (data) => {
        const subscriptionFees = data?.organization?.subscriptionFees[0];
        const subscriptionParam = subscriptionFees?.subscriptionParam;

        const capacityHistory = data?.organization?.capacityHistories.find(
            (e) => subscriptionParam.year == e.year
        );
        const { cfaUfaApprenticesCount, studentEmployerCount } = capacityHistory || {};
        const { cfaUfa, employerCollegeOperation, fixedPart034 } = subscriptionParam || {};
        const totalCfaUfa = (parseFloat(cfaUfaApprenticesCount) || 0) * parseFloat(cfaUfa);
        const totalColEmpOp =
            (parseFloat(studentEmployerCount) || 0) * (parseFloat(employerCollegeOperation) || 0);
        const total =
            (parseFloat(totalCfaUfa) || 0) +
            (parseFloat(totalColEmpOp) || 0) +
            parseFloat(
                isNaN(subscriptionParam?.fixedPartAmount)
                    ? fixedPart034 || 0
                    : subscriptionParam?.fixedPartAmount || 0
            );
        return (
            <div>
                {!!fixedPart034 && (
                    <>
                        Part fixe :{' '}
                        <span className="fw-bolder text-primary">
                            {' '}
                            <FormatPrice
                                value={
                                    isNaN(subscriptionParam?.fixedPartAmount)
                                        ? fixedPart034 || 0
                                        : subscriptionParam?.fixedPartAmount || 0
                                }
                            />{' '}
                        </span>{' '}
                        <br />
                    </>
                )}
                Nombre d&apos;apprentis :{' '}
                <span className="fw-bolder text-primary">
                    {cfaUfaApprenticesCount || 0} x {cfaUfa || 0} ={' '}
                    <FormatPrice value={totalCfaUfa || 0} />
                </span>
                <br />
                {!!studentEmployerCount && (
                    <>
                        Nombre d&apos;élèves en fonctionnement « Collège employeur » :{' '}
                        <span className="fw-bolder text-primary">
                            {' '}
                            {studentEmployerCount || 0} x {employerCollegeOperation || 0} ={' '}
                            <FormatPrice value={totalColEmpOp.toFixed(2) || 0} />
                        </span>{' '}
                        <br />
                    </>
                )}
                Total :{' '}
                <span className="fw-bolder text-primary">
                    <FormatPrice value={total.toFixed(2) || 0} />
                </span>
                <br />
                {!!subscriptionFees?.customAmount && (
                    <>
                        <br />
                        Montant personnalisé :{' '}
                        <span className="fw-bolder text-primary">
                            <strong>
                                <FormatPrice value={subscriptionFees?.customAmount || 0} />
                            </strong>
                        </span>
                    </>
                )}
            </div>
        );
    },
    4: ({ data }) => {
        const subscriptionFees = data?.organization?.subscriptionFees[0];
        const subscriptionParam = subscriptionFees?.subscriptionParam;

        const capacityHistory = data?.organization?.capacityHistories.find(
            (e) => subscriptionParam.year == e.year
        );
        const { cfpCfcInternsHoursCount } = capacityHistory || {};
        const { cfpCfc, fixedPart034 } = subscriptionParam || {};
        const totalcfp = (parseFloat(cfpCfcInternsHoursCount) || 0) * (parseFloat(cfpCfc) || 0);
        const total =
            totalcfp +
            (parseFloat(
                isNaN(subscriptionParam?.fixedPartAmount)
                    ? fixedPart034 || 0
                    : subscriptionParam?.fixedPartAmount || 0
            ) || 0);
        return (
            <div>
                {!!fixedPart034 && (
                    <>
                        Part fixe :{' '}
                        <span className="fw-bolder text-primary">
                            {' '}
                            <FormatPrice
                                value={
                                    isNaN(subscriptionParam?.fixedPartAmount)
                                        ? fixedPart034 || 0
                                        : subscriptionParam?.fixedPartAmount || 0
                                }
                            />{' '}
                        </span>{' '}
                        <br />
                    </>
                )}
                Nombre d&apos;heures stagiaire :{' '}
                <span className="fw-bolder text-primary">
                    {cfpCfcInternsHoursCount || 0} x {cfpCfc || 0} ={' '}
                    <FormatPrice value={totalcfp.toFixed(2) || 0} />
                </span>{' '}
                <br />
                Total :{' '}
                <span className="fw-bolder text-primary">
                    <FormatPrice value={total || 0} />
                </span>{' '}
                <br />
                {!!subscriptionFees?.customAmount && (
                    <>
                        Montant personnalisé :{' '}
                        <span className="fw-bolder text-primary">
                            <strong>
                                <FormatPrice value={subscriptionFees?.customAmount || 0} />
                            </strong>
                        </span>
                    </>
                )}
            </div>
        );
    }
};
const MemeberItem = ({ data }) => {
    const { organization } = data;

    const type = parseInt(organization?.establishment?.establishmentKey?.split('').pop()) || 0;

    const toPayAmount =
        organization?.subscriptionFees?.reduce(
            (acc, cv) =>
                acc + cv?.customAmount
                    ? parseFloat(cv?.customAmount || 0)
                    : parseFloat(cv?.calculatedAmount || 0),
            0
        ) || 0;

    const unpaidAmount =
        toPayAmount -
            organization?.subscriptionFees?.reduce(
                (pv, cv) =>
                    pv +
                    parseFloat(
                        cv?.subscriptionPayments.reduce(
                            (ppv, ccv) => ppv + parseFloat(ccv?.amount || 0),
                            0
                        )
                    ),
                0
            ) || 0;

    const Component = SubscriptionFeeByType[type];
    return (
        <tr>
            <td>{organization?.name}</td>
            <td>
                <FormatPrice value={toPayAmount} />
            </td>
            <td>
                <FormatPrice value={unpaidAmount} />
            </td>
            <td>
                <Component data={data} />
            </td>
        </tr>
    );
};

export default MemeberItem;
