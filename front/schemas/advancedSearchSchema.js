import moment from 'moment';

import yup from '../lib/yup';
export const statusOptions = [
    'Solde initial',
    'Solde partiel',
    'Solde négatif (trop perçu)',
    'Soldé',
    'Validé'
];
export const coordianteLabelOption = [
    { value: 'Email revue', label: 'Revue' },
    { value: 'Email nouvelles', label: 'Nouvelles' }
];
export const optionsEstablishmentType = [
    { value: '0', label: 'Etablissement (LPP et/ou LTP)' },
    { value: '1', label: 'CFA/UFA/SA rattaché à un établissement' },
    { value: '2', label: 'CFC/CFP rattaché à un établissement' },
    { value: '3', label: 'CFA indépendant' },
    { value: '4', label: 'CFC/CFP indépendant' }
];
export const archiveOptions = {
    with: 'Inclure les archives',
    without: 'Sans les archives',
    exclusive: 'Afficher seulement les archives'
};
export const archiveOptionsMap = {
    without: false,
    exclusive: true
};
export const organism = {
    1: 'UNETP',
    2: "Conseil d'administration",
    3: 'Bureau du CA'
};

export const regulationType = {
    Indifférent: undefined,
    'Carte bancaire': 'Carte bancaire',
    Chèque: 'Chèque',
    Virement: 'Virement'
};

export const role = {
    indifferent: 'indifférent',
    with: 'oui',
    without: 'non'
};
const roleMap = {
    indifferent: undefined,
    with: true,
    without: false
};

export const accountantSchema = yup.object({
    name: yup.string().label('Nom'),
    isArchived: yup.mixed().transform((v) => archiveOptionsMap[v])
});

export const establishmentSchema = yup.object({
    year: yup.string().required().label('Année'),
    types: yup
        .array()
        .of(yup.string().transform((v) => (typeof v === 'string' ? v : v?.value)))
        .label('Type'),
    status: yup
        .array()
        .of(
            yup
                .string()
                .oneOf(statusOptions)
                .transform((v) => (typeof v === 'string' ? v : v?.value))
        )
        .label('Statut')
});

export const establishmentRegulationSchema = yup.object({
    regulationType: yup
        .mixed()
        .transform((v) => regulationType[v])
        .label('Règlement')
});

export const delegateSchema = yup.object({
    excludeDeputy: yup.boolean().label('Sans Délégué académique adjoint')
});
export const diplomasSchema = yup.object({});
export const headMasterSchema = yup.object({
    role: yup.boolean().transform((v) => roleMap[v]),
    startDate: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        })
        .label('Date de début'),
    endDate: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        })
        .test('isGreater', 'la date de fin doit être supérieure à la date de début', function (v) {
            const startDate = this.parent.startDate;
            if (typeof startDate === 'undefined' || typeof v === 'undefined') return true;
            else return v >= startDate;
        })
        .label('Date de fin')
});

export const groupSchema = yup.object({
    labels: yup
        .array()
        .of(yup.string().transform((v) => (typeof v === 'string' ? v : v.value)))
        .label('Statut Email'),
    name: yup.string().label('Nom')
});

export const userSchema = yup.object({
    labels: yup
        .array()
        .of(yup.string().transform((v) => (typeof v === 'string' ? v : v.value)))
        .label('Statut Email'),
    name: yup.string().label('Nom').trim()
});
export const memberSchema = yup.object({
    organizationTypeId: yup.string().required().oneOf(Object.keys(organism)).label('Organisme')
});
export const advancedSearchSchemas = [
    accountantSchema,
    establishmentSchema,
    headMasterSchema,
    groupSchema,
    userSchema,
    establishmentRegulationSchema,
    memberSchema
];
const advancedSearchSchema = advancedSearchSchemas?.reduce(
    (acc, cv) => acc.concat(cv),
    yup.object()
);

export default advancedSearchSchema;
