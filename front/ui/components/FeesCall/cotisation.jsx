import React from 'react';
import { useFormContext } from 'react-hook-form';

import { getCurrentYear } from '../../../ui/utils/time';
import Coordinates from './coordinates';
import Form from './Form';
const variablePartsByType = {
    0: {
        labels: ['Nombre Collège', 'Nombre LP', 'Nombre LGT', 'Nombre BTS', 'Nombre Sup + CPGE'],
        multiplierLabels: {
            'Nombre Collège': 'Taux par élève Collège',
            'Nombre LP': 'Taux par élève LP',
            'Nombre LGT': 'Taux par élève LGT',
            'Nombre BTS': 'Taux par élève BTS',
            'Nombre Sup + CPGE': 'Taux par élève Sup + CPGE'
        },
        value: [
            'collegeContractStudentsCount',
            'lpContractStudentsCount',
            'lgtContractStudentsCount',
            'btsContractStudentsCount',
            'supContractStudentsCount'
        ],
        multiplierAmount: {
            collegeContractStudentsCount: 'schoolContractAmount',
            lpContractStudentsCount: 'lpContractAmount',
            lgtContractStudentsCount: 'lgtContractAmount',
            btsContractStudentsCount: 'btsContractAmount',
            supContractStudentsCount: 'scSup'
        },
        fixedPart: 'fixedPart034'
    },
    1: {
        labels: ["Nombre d'apprentis"],
        value: ['cfaUfaApprenticesCount'],
        multiplierLabels: { "Nombre d'apprentis": 'Taux par apprenti' },
        multiplierAmount: {
            cfaUfaApprenticesCount: 'cfaUfa'
        },
        sector: 'CFA/UFA',
        fixedPart: 'fixedPart12'
    },
    2: {
        labels: ["Nombre d'heures stagiaire"],
        value: ['cfpCfcInternsHoursCount'],
        multiplierLabels: { "Nombre d'heures stagiaire": 'Taux pour 1000h' },
        multiplierAmount: {
            cfpCfcInternsHoursCount: 'cfpCfc'
        },
        sector: 'CFP/CFC',
        fixedPart: 'fixedPart12'
    },
    3: {
        labels: ["Nombre d'apprentis"],
        value: ['cfaUfaApprenticesCount'],
        multiplierLabels: { "Nombre d'apprentis": 'Taux par apprenti' },
        multiplierAmount: {
            cfaUfaApprenticesCount: 'cfaUfa'
        },
        sector: 'CFA/UFA',
        fixedPart: 'fixedPart034'
    },

    4: {
        labels: ["Nombre d'heures stagiaire "],
        multiplierLabels: { "Nombre d'heures stagiaire": 'Taux pour 1000h' },
        value: ['cfpCfcInternsHoursCount'],
        multiplierAmount: {
            cfpCfcInternsHoursCount: 'cfpCfc'
        },
        sector: 'CFP/CFC',
        fixedPart: 'fixedPart034'
    }
};
const Cotisation = ({ data }) => {
    const currentYear = getCurrentYear();
    const updateFrom = useFormContext();
    const { watch, setValue } = updateFrom;
    const [
        cfaUfaApprenticesCount,
        cfpCfcInternsHoursCount,
        collegeContractStudentsCount,
        lpContractStudentsCount,
        lgtContractStudentsCount,
        supContractStudentsCount,
        btsContractStudentsCount
    ] = watch([
        `capacityHistories.${data?.index}.cfaUfaApprenticesCount`,
        `capacityHistories.${data?.index}.cfpCfcInternsHoursCount`,
        `capacityHistories.${data?.index}.collegeContractStudentsCount`,
        `capacityHistories.${data?.index}.lpContractStudentsCount`,
        `capacityHistories.${data?.index}.lgtContractStudentsCount`,
        `capacityHistories.${data?.index}.supContractStudentsCount`,
        `capacityHistories.${data?.index}.btsContractStudentsCount`
    ]);
    const subscriptionfee = data.subscriptionFees[0];
    const subscriptionParam = subscriptionfee?.subscriptionParam;
    const organizationId = data?.id;
    const key = parseInt(`${data.establishment?.establishmentKey}`.split('').pop());
    setValue(`capacityHistories.${data?.index}.keyForm`, key);

    setValue(`capacityHistories.${data?.index}.year`, currentYear);

    setValue(`capacityHistories.${data?.index}.organizationId`, organizationId);

    const variablePart = variablePartsByType[key];
    const fixedPartAmount =
        subscriptionfee?.fixedPartAmount !== null
            ? subscriptionfee?.fixedPartAmount
            : subscriptionParam[variablePart.fixedPart];
    const { customAmount } = subscriptionfee || {};
    const capacityHistory = data.capacityHistories;

    const {
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
        employerCollegeOperation,
        fixedPart12,
        cfaUfa,
        cfpCfc
    } = subscriptionParam || {};
    if (key === 0) {
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

        const amountPart0 =
            (totalUnderContract || 0) + (studentEmployerPrice || 0) + (totlaWithoutContract || 0);

        const totalPart0 =
            (totalUnderContract || 0) +
            (studentEmployerPrice || 0) +
            (totlaWithoutContract || 0) +
            (subscriptionfee?.fixedPartAmount === null || !subscriptionfee?.fixedPartAmount
                ? parseFloat(fixedPart034 || 0)
                : parseFloat(subscriptionfee?.fixedPartAmount || 0));

        return (
            <>
                <Form
                    index={data?.index}
                    totalPart={customAmount !== null ? customAmount : totalPart0}
                    amountPart={amountPart0}
                    customAmount={customAmount}
                    fixedPartAmount={fixedPartAmount}
                    keyEtab={key}
                    subscriptionParam={subscriptionParam}
                    variablePart={variablePart}
                />
                <Coordinates data={data} />
            </>
        );
    } else if (key === 1 || key === 3) {
        const totalApprentices = parseFloat(cfaUfa || 0) * parseFloat(cfaUfaApprenticesCount || 0);
        const amountPart13 = totalApprentices;
        const totalPart13 =
            (subscriptionfee?.fixedPartAmount === null || !subscriptionfee?.fixedPartAmount
                ? parseFloat(fixedPart12 || 0)
                : parseFloat(subscriptionfee?.fixedPartAmount || 0)) + parseFloat(totalApprentices);
        return (
            <>
                <Form
                    index={data?.index}
                    customAmount={customAmount}
                    fixedPartAmount={fixedPartAmount}
                    keyEtab={key}
                    subscriptionParam={subscriptionParam}
                    variablePart={variablePart}
                    amountPart={amountPart13}
                    totalPart={customAmount !== null ? customAmount : totalPart13}
                />

                <Coordinates data={data} />
            </>
        );
    } else if (key === 2 || key === 4) {
        const totalHours =
            (parseFloat(cfpCfcInternsHoursCount || 0) * parseFloat(cfpCfc || 0)) / 1000;
        const amountPart24 = totalHours;
        const totalPart24 =
            totalHours +
            (subscriptionfee?.fixedPartAmount === null || !subscriptionfee?.fixedPartAmount
                ? parseFloat(fixedPart12 || 0)
                : parseFloat(data?.fixedPartAmount || 0));
        return (
            <>
                <Form
                    index={data?.index}
                    customAmount={customAmount}
                    fixedPartAmount={fixedPartAmount}
                    keyEtab={key}
                    subscriptionParam={subscriptionParam}
                    variablePart={variablePart}
                    amountPart={amountPart24}
                    totalPart={customAmount !== null ? customAmount : totalPart24}
                />
                <Coordinates data={data} />{' '}
            </>
        );
    }
};
export default Cotisation;
