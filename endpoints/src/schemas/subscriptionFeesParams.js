import * as yup from 'yup';

const nextCallTypes = ['Non renseigné', 'Appel programmé', "Appel immédiat (à l'enregistrement)"];

const subscriptionFeeParams = yup.object({
    year: yup
        .string()
        .required()
        .label('Année')
        .test('isYear', "veuillez entrer un intervalle d'un an", (value) => {
            if (value) {
                const years = value?.split('-');
                const firstYear = parseInt(years[0]);
                const lastYear = parseInt(years[1]);
                return years ? lastYear - firstYear === 1 : false;
            }
        }),
    schoolContractAmount: yup
        .number()
        .transform((v) => (isNaN(v) ? undefined : v))
        .required()
        .label('Collége'),
    lpContractAmount: yup
        .number()
        .transform((v) => (isNaN(v) ? undefined : v))
        .required()
        .label('LP'),
    lgtContractAmount: yup
        .number()
        .transform((v) => (isNaN(v) ? undefined : v))
        .required()
        .label('LGT'),
    btsContractAmount: yup
        .number()
        .transform((v) => (isNaN(v) ? undefined : v))
        .required()
        .label('BTS'),
    scSup: yup
        .number()
        .transform((v) => (isNaN(v) ? undefined : v))
        .required()
        .label('Sup + CPGE'),
    cfaUfa: yup
        .number()
        .transform((v) => (isNaN(v) ? undefined : v))
        .required()
        .label('CFA/UFA '),
    cfpCfc: yup
        .number()
        .transform((v) => (isNaN(v) ? undefined : v))
        .required()
        .label('CFP/CFC'),
    fixedPart034: yup
        .number()
        .transform((v) => (isNaN(v) ? undefined : v))
        .required()
        .label('Part fixe'),
    fixedPart12: yup
        .number()
        .transform((v) => (isNaN(v) ? undefined : v))
        .required()
        .label('Part fixe'),

    nextCall: yup.string().required().oneOf(nextCallTypes).label('Prochain Appel'),
    remindDate: yup
        .date()
        .label("Date d'appel")
        .when('nextCall', {
            is: 'Appel programmé',
            then: (schema) => schema.required(),
            otherwise: (schema) => schema
        })
});

export default subscriptionFeeParams;
