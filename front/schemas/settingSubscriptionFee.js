import axios from 'axios';
import moment from 'moment';

import yup from '../lib/yup';
import settings from '../settings/index';
const { endpointUrl } = settings;
export const years = {
    one: '1998-1999',
    two: '1999-2000',
    three: '2000-2001',
    four: '2001-2002',
    five: '2002-2003',
    six: '2003-2004',
    seven: '2004-2005',
    eight: '2005-2006',
    nine: '2006-2007',
    ten: '2007-2008',
    eleven: '2008-2009',
    twelve: '2009-2010',
    thirteen: '2010-2011',
    fourteen: '2011-2012'
};
const nextCallTypes = ['Non renseigné', 'Appel programmé', "Appel immédiat (à l'enregistrement)"];

const settingSubsciptionFeeSchema = yup.object({
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
        })
        .test('isExists', 'Cette anné est déja existant', async (value) => {
            const { data } = await axios.get(`${endpointUrl}/subscription-params?year=${value}`);
            return !data?.nodes?.length > 0;
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
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        })
        .when('nextCall', {
            is: 'Appel programmé',
            then: (schema) => schema.required(),
            otherwise: (schema) => schema
        })
});

export default settingSubsciptionFeeSchema;
