export const amountCalculator = (capacityHistory, subscriptionFeesParams, establishmentKey) => {
    const key = parseInt(establishmentKey.split('').pop());
    let total = 0;
    const {
        fixedPart034,
        schoolContractAmount,
        lpContractAmount,
        lgtContractAmount,
        btsContractAmount,
        scSup,
        fixedPart12,
        employerCollegeOperation,
        cfaUfa,
        cfpCfc,
        lpWithoutContract,
        ltWithoutContract,
        btsWithoutContract,
        supWithoutContract
    } = subscriptionFeesParams;
    const {
        collegeContractStudentsCount,
        lpContractStudentsCount,
        lgtContractStudentsCount,
        btsContractStudentsCount,
        supContractStudentsCount,
        studentEmployerCount,
        cfaUfaApprenticesCount,
        cfpCfcInternsHoursCount,
        withoutContractBtsStudentsCount,
        withoutContractLpStudentsCount,
        withoutContractLgtStudentsCount,
        withoutContractSupStudentsCount
    } = capacityHistory;
    if (key === 0) {
        total =
            parseFloat(fixedPart034 || 0) +
            parseFloat(collegeContractStudentsCount || 0) * parseFloat(schoolContractAmount || 0) +
            parseFloat(lpContractStudentsCount || 0) * parseFloat(lpContractAmount || 0) +
            parseFloat(lgtContractStudentsCount || 0) * parseFloat(lgtContractAmount || 0) +
            parseFloat(btsContractStudentsCount || 0) * parseFloat(btsContractAmount || 0) +
            parseFloat(supContractStudentsCount || 0) * parseFloat(scSup || 0) +
            parseFloat(withoutContractLpStudentsCount || 0) * parseFloat(lpWithoutContract || 0) +
            parseFloat(withoutContractLgtStudentsCount || 0) * parseFloat(ltWithoutContract || 0) +
            parseFloat(withoutContractBtsStudentsCount || 0) * parseFloat(btsWithoutContract || 0) +
            parseFloat(withoutContractSupStudentsCount || 0) * parseFloat(supWithoutContract || 0);
    } else if (key === 1) {
        total =
            parseFloat(fixedPart12 || 0) +
            parseFloat(cfaUfaApprenticesCount || 0) * parseFloat(cfaUfa || 0);
    } else if (key === 2) {
        total =
            parseFloat(fixedPart12 || 0) +
            (parseFloat(cfpCfcInternsHoursCount || 0) * parseFloat(cfpCfc || 0)) / 1000;
    } else if (key === 3) {
        total =
            parseFloat(fixedPart034 || 0) +
            parseFloat(cfaUfaApprenticesCount || 0) * parseFloat(cfaUfa || 0) +
            parseFloat(studentEmployerCount || 0) * parseFloat(employerCollegeOperation || 0);
    } else if (key === 4) {
        total =
            parseFloat(fixedPart034 || 0) +
            parseFloat(cfpCfcInternsHoursCount || 0) * parseFloat(cfpCfc || 0);
    }
    return total;
};
