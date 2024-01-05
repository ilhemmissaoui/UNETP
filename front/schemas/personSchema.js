import yup from '../lib/yup';

export const civilities = {
    m: 'M.',
    mme: 'Mme.',
    mlle: 'Mlle.',
    fr: 'Fr.',
    sr: 'Sr.',
    pere: 'Pére.',
    mgr: 'Mgr.',
    mere: 'Mére',
    abbe: 'Abbé'
};
export const functions = {
    value: 'Membre du groupe de pilotage du réseau biotechnologie'
};
const personSchema = yup.object({
    function: yup.string().required().oneOf(Object.keys(functions)).label('Fonction'),
    startDate: yup.date().required().label('Date de début'),
    endDate: yup.date().required().label('Date de fin'),
    description: yup.string().required().label('description'),
    civility: yup.string().required().oneOf(Object.keys(civilities)).label('Civilité'),
    lastName: yup.string().required().label('Nom'),
    firstName: yup
        .string()
        .transform((v) => v?.toUpperCase())
        .required()
        .label('Prénom')
});

export const tableSchema = yup.object({
    persons: yup.array(personSchema).label('Personne')
});

export default personSchema;
