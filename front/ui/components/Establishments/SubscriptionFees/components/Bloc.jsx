import { FormatPrice } from '../../../../utils/currency';
import { getCurrentYear } from '../../../../utils/time';
const currentYear = getCurrentYear();
const byType = {
    0: ({ data, capacityHistory }) => {
        const { customAmount, calculatedAmount } = data || {};
        const {
            btsContractStudentsCount,
            collegeContractStudentsCount,
            lpContractStudentsCount,
            lgtContractStudentsCount,
            supContractStudentsCount,
            withoutContractBtsStudentsCount,
            withoutContractLpStudentsCount,
            withoutContractLgtStudentsCount,
            withoutContractSupStudentsCount,
            studentEmployerCount
        } = capacityHistory || {};
        const {
            schoolContractAmount,
            btsContractAmount,
            btsWithoutContract,
            lpContractAmount,
            lpWithoutContract,
            lgtContractAmount,
            fixedPart034,
            scSup,
            supWithoutContract,
            ltWithoutContract,
            employerCollegeOperation
        } = data?.subscriptionParam || {};

        const collageUnderContractPrice =
            (collegeContractStudentsCount || 0) * (schoolContractAmount || 0);
        const lpUnderContractPrice =
            parseFloat(lpContractStudentsCount || 0) * parseFloat(lpContractAmount || 0);
        const lgtUnderContractPrice =
            parseFloat(lgtContractStudentsCount || 0) * parseFloat(lgtContractAmount || 0);
        const btsUnderContractPrice =
            parseFloat(btsContractStudentsCount || 0) * parseFloat(btsContractAmount || 0);
        const supUnderContractPrice =
            parseFloat(supContractStudentsCount || 0) * parseFloat(scSup || 0);
        const studentEmployerPrice =
            parseFloat(studentEmployerCount || 0) * parseFloat(employerCollegeOperation || 0);
        const totalUnderContract =
            (collageUnderContractPrice || 0) +
            (lpUnderContractPrice || 0) +
            (lgtUnderContractPrice || 0) +
            (btsUnderContractPrice || 0) +
            (supUnderContractPrice || 0);

        const lpWitoutContractPrice =
            (withoutContractLpStudentsCount || 0) * (lpWithoutContract || 0);

        const lgtWithoutContractPrice =
            (withoutContractLgtStudentsCount || 0) * (ltWithoutContract || 0);

        const btsWithoutContractPrice =
            (withoutContractBtsStudentsCount || 0) * (btsWithoutContract || 0);

        const supWithoutContractPrice =
            (withoutContractSupStudentsCount || 0) * (supWithoutContract || 0);
        const totlaWithoutContract =
            (lpWitoutContractPrice || 0) +
            (lgtWithoutContractPrice || 0) +
            (btsWithoutContractPrice || 0) +
            (supWithoutContractPrice || 0) +
            (supWithoutContractPrice || 0);
        const total =
            (totalUnderContract || 0) +
            (studentEmployerPrice || 0) +
            (totlaWithoutContract || 0) +
            (data?.fixedPartAmount === null || !data?.fixedPartAmount
                ? parseFloat(fixedPart034 || 0)
                : parseFloat(data?.fixedPartAmount || 0));
        return capacityHistory?.year === currentYear ? (
            <div>
                Part fixe :{' '}
                <span className="fw-bolder text-primary">
                    <FormatPrice
                        value={
                            data?.fixedPartAmount === null || !data?.fixedPartAmount
                                ? parseFloat(fixedPart034 || 0)
                                : parseFloat(data?.fixedPartAmount || 0)
                        }
                    />
                </span>
                <br />
                Nombre Collège :{' '}
                <span className="fw-bolder text-primary">
                    {collegeContractStudentsCount || 0} x {schoolContractAmount} ={' '}
                    <FormatPrice value={collageUnderContractPrice} />{' '}
                </span>{' '}
                <br />
                Nombre LP :{' '}
                <span className="fw-bolder text-primary">
                    {lpContractStudentsCount || 0} x {lpContractAmount || 0}={' '}
                    <FormatPrice value={lpUnderContractPrice} />
                </span>
                <br />
                Nombre LGT :{' '}
                <span className="fw-bolder text-primary">
                    {lgtContractStudentsCount || 0} x {lgtContractAmount || 0}={' '}
                    <FormatPrice value={lgtUnderContractPrice} />
                </span>
                <br />
                Nombre BTS :{' '}
                <span className="fw-bolder text-primary">
                    {btsContractStudentsCount || 0} x {btsContractAmount || 0}={' '}
                    <FormatPrice value={btsUnderContractPrice} />
                </span>
                <br />
                Nombre Sup + CPGE :{' '}
                <span className="fw-bolder text-primary">
                    {supContractStudentsCount || 0} x {scSup || 0}={' '}
                    <FormatPrice value={supUnderContractPrice} />
                </span>
                <br />
                Total :{' '}
                <span className="fw-bolder text-primary">
                    <strong>
                        {' '}
                        <FormatPrice value={calculatedAmount || total || 0} />
                    </strong>
                </span>
            </div>
        ) : (
            <>
                <div>
                    Part fixe :{' '}
                    <span className="fw-bolder text-primary">
                        <FormatPrice
                            value={
                                data?.fixedPartAmount === null || !data?.fixedPartAmount
                                    ? parseFloat(fixedPart034 || 0)
                                    : parseFloat(data?.fixedPartAmount || 0)
                            }
                        />
                    </span>{' '}
                    <br />
                    Nombre SC :{' '}
                    <span className="fw-bolder text-primary">
                        <FormatPrice value={totalUnderContract} />{' '}
                    </span>
                    <br />
                    Nombre HC :{' '}
                    <span className="fw-bolder text-primary">
                        <FormatPrice value={totlaWithoutContract} />
                    </span>{' '}
                    <br />
                    {!!studentEmployerCount && (
                        <>
                            {' '}
                            Nombre d&apos;élèves en fonctionnement « Collège employeur » :{' '}
                            <span className="fw-bolder text-primary">
                                {studentEmployerCount || 0} x {employerCollegeOperation || 0} =
                                <FormatPrice value={studentEmployerPrice} />
                            </span>{' '}
                            <br />
                        </>
                    )}
                    Total :
                    <strong>
                        {' '}
                        <span className="fw-bolder text-primary">
                            <FormatPrice value={total || 0} />{' '}
                        </span>
                    </strong>
                    <br />
                    {customAmount && (
                        <>
                            Calculé à l&apos;issu de l&apos;appel :{' '}
                            <span className="fw-bolder text-primary">
                                {' '}
                                <FormatPrice value={calculatedAmount} />
                            </span>
                            <br /> Montant personnalisé :
                            <span className="fw-bolder text-primary">
                                <FormatPrice value={customAmount || 0} />{' '}
                            </span>
                        </>
                    )}
                </div>
            </>
        );
    },
    1: ({ capacityHistory, data }) => {
        const { customAmount } = data || {};

        const { fixedPart12, cfaUfa } = data?.subscriptionParam || {};
        const { cfaUfaApprenticesCount } = capacityHistory || {};
        const totalApprentices = parseFloat(cfaUfa || 0) * parseFloat(cfaUfaApprenticesCount || 0);
        const total =
            (data?.fixedPartAmount === null || !data?.fixedPartAmount
                ? parseFloat(fixedPart12 || 0)
                : parseFloat(data?.fixedPartAmount || 0)) + parseFloat(totalApprentices);
        return (
            <div>
                Part fixe :{' '}
                <span className="fw-bolder text-primary">
                    <FormatPrice
                        value={
                            data?.fixedPartAmount === null || !data?.fixedPartAmount
                                ? parseFloat(fixedPart12 || 0)
                                : parseFloat(data?.fixedPartAmount || 0)
                        }
                    />{' '}
                </span>
                <br />
                Nombre d&apos;apprentis :{' '}
                <span className="fw-bolder text-primary">
                    {cfaUfaApprenticesCount || 0} x {cfaUfa || 0} ={' '}
                    <FormatPrice value={totalApprentices || 0} />
                </span>{' '}
                <br />
                {customAmount && (
                    <>
                        {' '}
                        Montant personnalisé :{' '}
                        <span className="fw-bolder text-primary">
                            <FormatPrice value={customAmount || 0} />{' '}
                        </span>
                        <br />
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
    2: ({ capacityHistory, data }) => {
        const { customAmount, calculatedAmount } = data || {};

        const { fixedPart12, cfpCfc } = data?.subscriptionParam || {};
        const { cfpCfcInternsHoursCount } = capacityHistory || {};
        const totalHours =
            (parseFloat(cfpCfcInternsHoursCount || 0) * parseFloat(cfpCfc || 0)) / 1000;
        const total =
            totalHours +
            (data?.fixedPartAmount === null || !data?.fixedPartAmount
                ? parseFloat(fixedPart12 || 0)
                : parseFloat(data?.fixedPartAmount || 0));
        return (
            <div>
                Part fixe :{' '}
                <span className="fw-bolder text-primary">
                    <FormatPrice
                        value={
                            data?.fixedPartAmount === null || !data?.fixedPartAmount
                                ? parseFloat(fixedPart12 || 0)
                                : parseFloat(data?.fixedPartAmount || 0)
                        }
                    />{' '}
                </span>
                <br />
                Nombre d&apos;heures stagiaire :{' '}
                <span className="fw-bolder text-primary">
                    {cfpCfcInternsHoursCount || 0} x {cfpCfc || 0} ={' '}
                    <FormatPrice value={totalHours ? totalHours : 0} />
                </span>{' '}
                <br />
                Total :{' '}
                <span className="fw-bolder text-primary">
                    {' '}
                    <FormatPrice value={total || 0} />
                </span>
                <br />
                {!!customAmount && (
                    <>
                        Calculé à l&apos;issu de l&apos;appel :{' '}
                        <span className="fw-bolder text-primary">
                            <FormatPrice value={calculatedAmount || 0} />
                        </span>
                        <br />
                        Montant personnalisé :{' '}
                        <span className="fw-bolder text-primary">
                            <strong>
                                <FormatPrice value={customAmount || 0} />
                            </strong>
                        </span>
                    </>
                )}
            </div>
        );
    },
    3: ({ capacityHistory, data }) => {
        const { customAmount, calculatedAmount } = data || {};
        const { cfaUfaApprenticesCount, studentEmployerCount } = capacityHistory || {};
        const { cfaUfa, employerCollegeOperation, fixedPart034 } = data?.subscriptionParam || {};
        const totalCfaUfa = (parseFloat(cfaUfaApprenticesCount) || 0) * parseFloat(cfaUfa);
        const totalColEmpOp =
            (parseFloat(studentEmployerCount) || 0) * (parseFloat(employerCollegeOperation) || 0);
        const total =
            (parseFloat(totalCfaUfa) || 0) +
            (parseFloat(totalColEmpOp) || 0) +
            (data?.fixedPartAmount === null || !data?.fixedPartAmount
                ? parseFloat(fixedPart034 || 0)
                : parseFloat(data?.fixedPartAmount || 0));
        return (
            <div>
                <>
                    Part fixe :{' '}
                    <span className="fw-bolder text-primary">
                        {' '}
                        <FormatPrice
                            value={
                                data?.fixedPartAmount === null || !data?.fixedPartAmount
                                    ? parseFloat(fixedPart034 || 0)
                                    : parseFloat(data?.fixedPartAmount || 0)
                            }
                        />{' '}
                    </span>{' '}
                    <br />
                </>
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
                            <FormatPrice value={totalColEmpOp || 0} />
                        </span>{' '}
                        <br />
                    </>
                )}
                Total :{' '}
                <span className="fw-bolder text-primary">
                    <FormatPrice value={total || 0} />
                </span>
                <br />
                {!!customAmount && (
                    <>
                        Calculé à l&apos;issu de l&apos;appel :{' '}
                        <span className="fw-bolder text-primary">
                            <FormatPrice value={calculatedAmount || 0} />
                        </span>
                        <br />
                        Montant personnalisé :{' '}
                        <span className="fw-bolder text-primary">
                            <strong>
                                <FormatPrice value={customAmount || 0} />
                            </strong>
                        </span>
                    </>
                )}
            </div>
        );
    },
    4: ({ capacityHistory, data }) => {
        const { customAmount, calculatedAmount } = data || {};
        const { cfpCfcInternsHoursCount } = capacityHistory || {};
        const { cfpCfc, fixedPart034 } = data?.subscriptionParam || {};
        const totalcfp = (parseFloat(cfpCfcInternsHoursCount) || 0) * (parseFloat(cfpCfc) || 0);
        const total =
            totalcfp +
            (data?.fixedPartAmount === null || !data?.fixedPartAmount
                ? parseFloat(fixedPart034 || 0)
                : parseFloat(data?.fixedPartAmount || 0));
        return (
            <div>
                <>
                    Part fixe :{' '}
                    <span className="fw-bolder text-primary">
                        {' '}
                        <FormatPrice
                            value={
                                isNaN(data?.fixedPartAmount)
                                    ? fixedPart034 || 0
                                    : data?.fixedPartAmount || 0
                            }
                        />{' '}
                    </span>{' '}
                    <br />
                </>
                Nombre d&apos;heures stagiaire :{' '}
                <span className="fw-bolder text-primary">
                    {cfpCfcInternsHoursCount || 0} x {cfpCfc || 0} ={' '}
                    <FormatPrice value={totalcfp || 0} />
                </span>{' '}
                <br />
                Total :{' '}
                <span className="fw-bolder text-primary">
                    <FormatPrice value={total || 0} />
                </span>{' '}
                <br />
                {!!customAmount && (
                    <>
                        Calculé à l&apos;issu de l&apos;appel :{' '}
                        <span className="fw-bolder text-primary">
                            <FormatPrice value={calculatedAmount || 0} />
                        </span>
                        <br />
                        Montant personnalisé :{' '}
                        <span className="fw-bolder text-primary">
                            <strong>
                                <FormatPrice value={customAmount || 0} />
                            </strong>
                        </span>
                    </>
                )}
            </div>
        );
    }
};
const Bloc = ({ capacityHistory, type, data }) => {
    const Component = byType[type];
    return (
        <div>
            <Component capacityHistory={capacityHistory} data={data} />
        </div>
    );
};

export default Bloc;
