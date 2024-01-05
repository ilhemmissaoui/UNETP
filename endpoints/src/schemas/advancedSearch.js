import yup from '../lib/yup';

export const regulationType = [undefined, 'Carte bancaire', 'Chèque', 'Virement'];

export const statusOptions = [
    'Solde initial',
    'Solde partiel',
    'Solde négatif (trop perçu)',
    'Soldé',
    'Validé'
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
    board: "Conseil d'administration",
    office: 'Bureau',
    unetp: 'UNETP'
};

export const status = {
    revue: 'Revue',
    nouvelles: 'Nouvelles'
};
export const profile = {
    indifferent: 'indifférent',
    yes: 'oui',
    no: 'non'
};

export const establishmentSchema = yup.object({
    year: yup.string().required().label('Année'),
    types: yup
        .array()
        .of(yup.string().oneOf(Object.keys(optionsEstablishmentType)))
        .label('Type'),
    status: yup.array().of(yup.string().oneOf(statusOptions)).label('Statut')
});

export const headMasterSchema = yup.object({
    profile: yup.string().required().oneOf(Object.keys(profile)).label('Profil'),
    startDate: yup.date().label('Date de début'),
    endDate: yup.date().label('Date de fin')
});

export const groupSchema = yup.object({
    name: yup.string().required().label('Nom')
});

export const userSchema = yup.object({
    name: yup.string().required().label('Nom')
});

export const memberSchema = yup.object({
    organism: yup.string().required().oneOf(Object.keys(organism)).label('Organisme')
});
