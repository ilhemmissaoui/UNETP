import moment from 'moment';
import zxcvbn from 'zxcvbn';

import yup from '../lib/yup';
import coordinateSchema from './coordinatesSchema';
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

export const relationships = {
    'membre adhérent': 'Membre adhérent',
    'membre associé': 'Membre associé',
    'membre correspondant': 'Membre correspondant',
    extérieur: 'Extérieur',
    autre: 'Autre'
};

export const subscriptionFeeSchema = yup.object({
    id: yup.string(),
    subscriptionParam: yup.object({
        year: yup.string().required().oneOf(allowedYears).label('cotisation')
    }),
    calculatedAmount: yup
        .number()
        .required()
        .transform((v) => (isNaN(v) ? undefined : v))
        .label('montant')
});

export const subscriptionFeesSchema = yup.object({
    subscriptionFees: yup.array(subscriptionFeeSchema)
});

const startEndSchema = yup.object({
    startDate: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        })

        .test(
            'is Inferior',
            'La date de début doit être inférieure ou égale à la date de fin',
            function (v) {
                const endDate = this.parent.endDate;
                if (typeof endDate === 'undefined' || typeof v === 'undefined') {
                    return true;
                } else {
                    return v <= endDate;
                }
            }
        )
        .label('date de début'),
    endDate: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        })
        .test(
            'isSuperior',
            'La date de fin doit être supérieure ou égale  à la date de début',
            function (v) {
                const startDate = this.parent.startDate;
                if (typeof startDate === 'undefined' || typeof v === 'undefined') {
                    return true;
                } else {
                    return v >= startDate;
                }
            }
        )
        .label('date de fin')
});
export const functionSchema = yup
    .object({
        type: yup
            .number()
            .required()
            .label('type')
            .transform((v) => (Number.isNaN(v) ? undefined : v)),
        labelId: yup
            .number()
            .required()
            .label('fonction')
            .transform((v) => (Number.isNaN(v) ? undefined : v)),
        organizationId: yup
            .string()
            .label('organisme')
            .transform((v) => (typeof v === 'string' ? v : String(v.value)))
            .when('type', {
                is: (v) => [1, 2, 3, 4, 5, 6].includes(parseInt(v)),
                then: (schema) => schema.required(),
                otherwise: (schema) => schema.strip()
            }),
        organization: yup
            .object({
                name: yup.string()
            })
            .nullable(),
        comment: yup.string().label('commentaire UNETP')
    })
    .concat(startEndSchema);
export const historySchema = yup
    .object({
        historyIdType: yup.string().required().label('type'),
        label: yup.string().required().label('libellé'),
        date: yup.date().transform((e) => {
            const date = new Date(e);
            return date instanceof Date && !Number.isNaN(date) ? date : undefined;
        }),
        comment: yup.string().label('comentaire UNETP')
    })
    .concat(startEndSchema);
export const globalInfoSchema = yup.object({
    relationship: yup
        .string()
        .required()
        .oneOf(Object.keys(relationships))
        .label('relation UNETP')
        .transform((v) => (v?.length ? v : undefined)),
    civilityId: yup.number().required().label('civilité'),
    lastName: yup.string().required().label('nom'),
    firstName: yup.string().required().label('prénom'),
    dob: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        })
        .label('date de naissance')
        .max(moment().subtract(18, 'years').toDate()),
    comment: yup.string().label('commentaires UNETP'),
    coordinates: yup.array(coordinateSchema).required().label('coordonnée')
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
    dob: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        })
        .label('date de naissance')
        .required()
        .max(moment().subtract(18, 'years').toDate()),
    comment: yup.string().label('commentaires UNETP'),
    coordinates: yup.array(coordinateSchema).required().label('coordonnée')
});

export const functionsSchema = yup.object({
    functions: yup.array(functionSchema).required().default([]).label('fonction'),
    isOldHeadMaster: yup.boolean().required().default(false).label("ancien chef d'etablissement")
});

export const historiesSchema = yup.object({
    histories: yup.array(historySchema).required().default([]).label('historique')
});
export const roles = [
    {
        label: 'Administrateur',
        badge: 'Personnel UNETP',
        description: "Consulte et modifie l'ensemble des données.",
        id: 100
    },
    {
        label: 'Lecteur',
        badge: 'Personnel UNETP',
        description: "Consulte l'ensemble des données.",
        id: 20
    },
    {
        label: 'Membre UNETP',
        description: 'Modifie ses données personnelles.',
        id: 0
    },
    {
        label: 'Gestionnaire',
        description: ' Visualise ses données personnelles et paye les cotisations.',
        id: 300
    }
];
// const accessSchema = yup.object({
//     sendEnrollmentEmail: yup.boolean().required().default(false).label('email'),
//     oldPassowrd: yup.string().label('ancient mot de passe'),
//     password: yup.string().label('nouveau mot de passe'),
//     confirmPassword: yup
//         .string()
//         .oneOf([yup.ref('password'), null], 'Le mot de passe ne correspond pas')
//         .label('confirmez le mot de passe'),
//     role: yup
//         .number()
//         .oneOf(roles.map((e) => e.id))
//         .label('profile')
//         .default(0),
//     isDisabled: yup.boolean().required().default(false).label('rendre inactif'),
//     accessComment: yup.string().label('commentaire UNETP')
// });

export const accessAccountSchema = yup.object({
    sendEnrollmentEmail: yup.boolean().required().default(false).label('email'),
    password: yup.string().label('nouveau mot de passe'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Le mot de passe ne correspond pas')
        .label('confirmez le mot de passe'),
    role: yup
        .number()
        .oneOf(roles.map((e) => e.id))
        .label('profile')
        .default(0),
    isDisabled: yup.boolean().required().default(false).label('rendre inactif'),
    accessComment: yup.string().label('commentaire UNETP')
});
export const loginSchema = yup.object({
    username: yup.string().trim().required().label('identifiant'),
    password: yup.string().required().label('mot de passe')
});
export const forgotPasswordSchema = yup.object({
    username: yup.string().required().label('identifiant')
});

export const resetPasswordSchema = yup.object({
    password: yup.string().required().label('mot de passe'),
    confirmPassword: yup
        .string()
        .required()
        .oneOf([null, yup.ref('password')])
        .label('Confirmez mot de passe')
});

export const changePasswordSchema = yup.object({
    oldPassword: yup.string().required().label('mot de passe'),
    newPassword: yup
        .string()
        .required()
        .label('nouveau mot de passe')
        .test(
            'isValid',
            'Un mot de passe doit contenir au minimum 8 caractères  ou plus avec un mélange de lettres, de chiffres et de & symboles.',
            function (value) {
                var pwd = zxcvbn(value.toString());
                return pwd?.score >= 3;
            }
        ),

    confirmPassword: yup
        .string()
        .required()
        .oneOf([null, yup.ref('newPassword')], 'le mot de passe ne correspond pas')
        .label('confirmez mot de passe')
});

const relationshipMap = {
    'membre adhérent': 'membre adhérent',
    'membre associé': 'membre associé',
    'membre correspondant': 'membre correspondant',
    extérieur: 'extérieur',
    nc: 'nc'
};
export const archiveOptions = {
    with: 'Inclure les archives',
    without: 'Sans les archives',
    exclusive: 'Afficher seulement les archives'
};
export const status = {
    refused: 'réfusé',
    pending: 'en attente',
    approved: 'accepté'
};
const archiveOptionsMap = {
    without: false,
    exclusive: true
};

const filterById = yup
    .number()
    .transform((value, originalValue) => (originalValue === 'all' ? undefined : value));
export const filtersSchema = yup.object({
    firstName: yup.string().trim(),
    // department: yup.string().trim(),
    department: yup
        .string()
        .trim()
        .transform((v) => {
            return v?.length > 0 ? v : undefined;
        })
        .trim(),
    organizationType: filterById,
    functionLabel: filterById,
    relationship: yup
        .string()
        .transform((v) => relationshipMap[v])
        .nullable(),
    isArchived: yup.mixed().transform((v) => archiveOptionsMap[v])
});
export const emailingSchema = yup.object({
    from: yup.string().email().required().label("e-mail de l'expéditeur"),
    subject: yup.string().required().label('sujet du mail'),
    content: yup.string().required().label('message')
});
//cotisationSchema
export const userSchemas = [
    globalInfoSchema,
    functionsSchema,
    historiesSchema,
    // accessSchema,
    accessAccountSchema
];
const userSchema = userSchemas?.reduce((acc, cv) => acc.concat(cv), yup.object());
export const editUserSchemas = [...userSchemas, subscriptionFeesSchema];
export const editUserSchema = editUserSchemas?.reduce((acc, cv) => acc.concat(cv), yup.object());
export default userSchema;
