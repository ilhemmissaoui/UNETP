import yup from '../lib/yup';

export const relationships = {
    'membre adhérent': 'Membre adhérent',
    'membre associé': 'Membre associé',
    'membre correspondant': 'Membre correspondant',
    extérieur: 'Extérieur',
    autre: 'Autre'
};
const addressTypes = {
    particulier: 'Particulier',
    professionnel: 'Professionnel'
};
export const allowedYears = [
    '1998-1999',
    '1999-2000',
    '2000-2001',
    '2001-2002',
    '2002-2003',
    '2003-2004',
    '2004-2005',
    '2005-2006',
    '2006-2007',
    '2007-2008',
    '2008-2009',
    '2009-2010',
    '2010-2011',
    '2011-2012'
];

export const coordinateSchema = yup.object({
    id: yup.number(),
    countryId: yup.string(),
    label: yup.string().required().label('Libellé'),
    phoneNumber: yup
        .string()
        .transform((v) =>
            v
                ? v
                      ?.split(' ')
                      .filter((e) => !!e?.trim().length)
                      .join('')
                      .replaceAll('x', '')
                : undefined
        )
        .length(10)
        .label('numéro de téléphone')
        .nullable(),
    email: yup.string().email().label('Email'),
    website: yup.string().label('Site web'),
    addressType: yup.string().required().oneOf(Object.keys(addressTypes)).label('Particulier'),
    recipient: yup.string().label('Destinataire'),
    additionalRecipient: yup.string().label("Complément d'adresse"),
    addressLine1: yup.string().label('Escalier'),
    voiceNumber: yup.string().label('Numéro de voie'),
    voiceLabel: yup.string().label('Libellé de voie'),
    addressLine3: yup.string().label('Boite postale'),
    zipCode: yup.string().label('Code postal'),
    city: yup.string().label('Ville'),
    cedex: yup.string().label('Cedex')
});
export const functionSchema = yup.object({
    id: yup.number(),
    type: yup.number().label('Type').strip(),
    organizationId: yup.string().label('Organisme'),
    labelId: yup.number().required().label('Fonction'),
    startDate: yup.date().label('Date de début'),
    endDate: yup.date().label('Date de fin'),
    comment: yup.string().label('Commentaire UNETP')
});
export const historySchema = yup.object({
    id: yup.number(),
    historyIdType: yup.string().label('Type'),
    label: yup.string().required().label('Libellé'),
    date: yup.date().label('Date'),
    startDate: yup.date().label('Date de début'),
    endDate: yup.date().label('Date de fin'),
    comment: yup.string().label('Commentaire UNETP')
});
export const globalInfoSchema = yup.object({
    relationship: yup.string().oneOf(Object.keys(relationships)).required(),
    civilityId: yup.string().required().label('Civilité'),
    lastName: yup.string().required().label('Nom'),
    firstName: yup
        .string()
        .required()
        .label('Prénom')
        .transform((v) => v?.toUpperCase()),
    dob: yup.date().label('Date de naissance'),
    comment: yup.string().label('Commentaire UNETP'),
    coordinates: yup.array(coordinateSchema).required().label('coordonnées')
});

export const profileSchema = yup.object({
    civilityId: yup.number().required().label('civilité'),
    lastName: yup.string().required().label('nom'),
    firstName: yup.string().required().label('prénom'),
    relationship: yup
        .string()
        .required()
        .oneOf(Object.keys(relationships))
        .label('relation UNETP')
        .transform((v) => (v?.length ? v : undefined)),
    dob: yup.date().required().label('Date de naissance'),
    comment: yup.string().label('commentaires UNETP'),
    coordinates: yup.array(coordinateSchema).required().label('coordonnée')
});

export const functionsSchema = yup.object({
    functions: yup.array(functionSchema).required().label('Fonction'),
    isOldHeadMaster: yup.boolean().required().label("Ancien chef d'etablissement")
});

export const historiesSchema = yup.object({
    histories: yup.array(historySchema).required().label('Historique')
});
export const roles = {
    100: {
        label: 'Administrateur',
        badge: 'Personnel UNETP',
        description: "Consulte et modifie l'ensemble des données."
    },
    0: {
        label: 'Lecteur',
        badge: 'Personnel UNETP',
        description: "Consulte l'ensemble des données."
    },
    20: {
        label: 'Membre UNETP',
        description: 'Modifie ses données personnelles.'
    },
    300: {
        label: 'Gestionnaire',
        description: ' Visualise ses données personnelles et paye les cotisations.'
    }
};
const accessSchema = yup.object({
    sendEnrollmentEmail: yup.boolean().required().label('Email'),
    password: yup.string().label('Nouveau mot de passe'),
    confirmPassword: yup.string().label('Confirmez le mot de passe'),
    role: yup
        .number()
        .oneOf(Object.keys(roles).map((e) => parseInt(e)))
        .label('Profile'),
    isDisabled: yup.boolean().required().default(false).label('Rendre inactif'),
    accessComment: yup.string().label('Commentaire UNETP')
});
export const subscriptionFeeSchema = yup.object({
    id: yup.string(),
    subscriptionParam: yup.object({
        year: yup.string().required().oneOf(allowedYears).label('Cotisation')
    }),
    calculatedAmount: yup
        .number()
        .required()
        .transform((v) => (isNaN(v) ? undefined : v))
        .label('Montant')
});
export const subscriptionFeesSchema = yup.object({
    subscriptionFees: yup.array(subscriptionFeeSchema)
});

const userSchema = globalInfoSchema
    .concat(functionsSchema)
    .concat(historiesSchema)
    .concat(accessSchema)
    .concat(subscriptionFeesSchema);
export default userSchema;
