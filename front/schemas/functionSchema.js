import yup from '../lib/yup';

export const enuml = {
    exchangeOffice: 'ExchangeOffice',
    boardOfDirectors: 'BoardOfDirectors',
    deligation: 'Deligation',
    establishment: 'Establishment',
    notDisclosed: 'NotDisclosed',
    network: 'Network',
    UNETP: 'UNETP'
};
const functionSchema = yup.object({
    organizationTypeId: yup.string().required().label("Type d'organisme"),
    singularMaleName: yup.string().required().label('Intitulé masculin'),
    singularFemaleName: yup.string().required().label('Intitulé féminin'),
    pluralMaleName: yup.string().required().label('Intitulé masculin pluriel'),
    pluralFemaleName: yup.string().required().label('Intitulé féminin pluriel'),
    description: yup.string().label('Description'),
    isHeadMaster: yup.boolean().required().label("Chef d'établissement")
});

export const filterSchema = yup.object({
    organizationTypeId: yup.string().transform((v) => (v?.length > 0 ? v : undefined))
});

export default functionSchema;
