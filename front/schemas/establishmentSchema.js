import axios from 'axios';
import moment from 'moment';

import yup from '../lib/yup';
import settings from '../settings/index';
import { capacityEntryDefaultSchema, capacityEntryEditSchema } from './capacityHisotrySchema';
import coordinateSchema from './coordinatesSchema';
import functionSchema from './globalFunctionSchema';
import historySchema from './historySchema';

export const addressTypes = {
    particulier: 'Particulier',
    professionnel: 'Professionnel'
};

export const mixedTypes = {
    nc: '- Sélectionner -',
    mixte: 'Mixte',
    fille: 'Fille',
    garçon: 'Garçon'
};
const { endpointUrl } = settings;

const establishmentKeyEndings = ['0', '1', '2', '3', '4'];

export const pensionTypes = ['1/2 Pens', 'Ext', 'Int', 'Int(externé)', 'Int filles', 'Int Garçon'];

export const childEstablishmentSchema = yup.lazy((value) => {
    if (value.mode === 'search') {
        return yup.object({
            id: yup
                .number()
                .transform((v, o) => (typeof o === 'number' ? o : o?.value))
                .required()
                .label('Établissement')
        });
    }
    return yup.object({
        id: yup.string().strip(),
        establishmentKey: yup
            .string()
            .test(
                'endsWithExistingNumber',
                "la clé d'établissement doit se terminer par 0,1,2,3,4 ",
                (v) => {
                    return establishmentKeyEndings.includes(v?.charAt(v.length - 1));
                }
            )
            .required()
            .label("Clé de la structure d'établissement"),
        establishmentNumber: yup.string().required().label("N° de la structure d'établissement"),
        organization: yup.object({
            name: yup.string().required().label('Nom')
        })
    });
});
export const displayMemberType = {
    'membre associé': 'associé',
    'membre adhérent': 'adhérent',
    'non membre': 'non membre'
};
export const memberType = {
    0: '- Sélectionner -',
    ...displayMemberType
};
export const labelSchema = yup
    .number()
    .required()
    .transform((v, o) => (typeof o === 'number' ? o : o?.value))
    .label('label');

export const archiveOptions = {
    with: 'Inclure les archives',
    without: 'Sans les archives',
    exclusive: 'Afficher seulement les archives'
};

//maping
const archiveByType = {
    with: undefined,
    without: 0,
    exclusive: 1
};
const filterArchive = yup.number().transform((value, originalValue) => {
    return archiveByType[originalValue];
});
export const filtersSchema = yup.object({
    name: yup
        .string()
        .trim()
        .transform((v) => {
            return v?.length > 0 ? encodeURIComponent(v) : undefined;
        }),
    establishmentKey: yup
        .string()
        .trim()
        .transform((v) => {
            return v?.length > 0 ? v : undefined;
        }),
    establishmentNumber: yup
        .string()
        .trim()
        .transform((v) => {
            return v?.length > 0 ? v : undefined;
        })
        .trim(),
    departmentId: yup.string().trim(),
    isArchived: filterArchive,
    city: yup
        .string()
        .trim()
        .transform((v) => {
            return v?.length > 0 ? encodeURIComponent(v) : undefined;
        })
});
export const globalInfoDefaultSchema = yup.object({
    id: yup.string(),
    members: yup.string().label('Membres').oneOf(Object.keys(memberType)),
    establishmentKey: yup
        .string()
        .required()
        .label("Clé de la structure d'établissement")
        .test('isDuplicatedKey', 'ce clé est pris', async function (value) {
            if (value) {
                let hasDuplicates = true;
                const { data } = await axios.get(
                    `${endpointUrl}/establishments/availability/by-key/${encodeURIComponent(
                        value
                    )}?exclude=${this.parent.id}`
                );
                if (data?.data?.isAvailable) {
                    return hasDuplicates;
                } else {
                    return !hasDuplicates;
                }
            }
        })
        .test(
            'endsWithExistingNumber',
            "la clé d'établissement doit se terminer par 0,1,2,3,4 ",
            (v) => {
                return establishmentKeyEndings.includes(v?.charAt(v.length - 1));
            }
        ),
    establishmentNumber: yup.string().required().label("N° de la structure d'établissement"),
    organization: yup.object({
        name: yup
            .string()
            .required()
            .label("Nom de la structure d'établissement")
            .test('isDuplicatedName', 'ce nom est pris', async function (value) {
                if (value) {
                    let hasDuplicates = true;
                    const { data } = await axios.get(
                        `${endpointUrl}/establishments/availability/by-name/${encodeURIComponent(
                            value
                        )}?exclude=${this.parent.id}`
                    );
                    if (data?.data?.isAvailable) {
                        return hasDuplicates;
                    } else {
                        return !hasDuplicates;
                    }
                }
            })
    }),
    departmentId: yup
        .string()
        .transform((value) => {
            if (value === '0') {
                return undefined;
            }
            return value;
        })
        .label('Département'),
    academyId: yup
        .string()
        .transform((value) => {
            if (value === '0') {
                return undefined;
            }
            return value;
        })
        .label('Académie'),
    delegationId: yup
        .string()
        .transform((value) => {
            if (value === '0') {
                return undefined;
            }
            return value;
        })
        .label('Délégation régionale'),
    ogecName: yup.string().required().label('Nom').nullable(),
    ogecAddress: yup.string().required().label('Code postale').nullable(),
    ogecPhoneNumber: yup
        .string()
        .transform((v) => {
            const val = v
                ?.split(' ')
                .filter((e) => !!e?.trim().length)
                .join('')
                .replaceAll('x', '');
            console.log(v);
            return val;
        })
        .length(10)
        .required()
        .label('Numéro de téléphone')
        .nullable(),
    ogecEmail: yup.string().email().label('E-mail').required().nullable(),
    ogecCity: yup.string().label('Ville').required().nullable(),
    numAcadLP: yup.string().label('N° académique LP'),
    numAcadLT: yup.string().label('N° académique LT'),
    numAcadCFA: yup.string().label('N° académique CFA'),
    numExistanceCFP: yup.string().label('N° académique CFP'),
    labels: yup.array().of(labelSchema).default([]),
    accessDate: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        })
        .label("Date d'adhésion"),
    coordinates: yup.array().of(coordinateSchema).default([]),
    mixed: yup
        .string()
        .required()
        .transform((v) => (v ? v : 'nc'))
        .oneOf(Object.keys(mixedTypes))
        .nullable(),
    guardianships: yup
        .array()
        .of(
            yup
                .number()
                .transform((v, o) => (typeof o === 'number' ? o : o?.value))
                .label('Tutelle')
        )
        .default([]),
    pensions: yup
        .array()
        .of(
            yup
                .number()
                .transform((v, o) => (typeof o === 'number' ? o : o?.value))
                .label('Pension')
        )
        .default([]),
    parings: yup
        .array()
        .of(
            yup
                .number()
                .transform((v, o) => (typeof o === 'number' ? o : o?.value))
                .label('Pays')
        )
        .default([]),
    partners: yup
        .array()
        .of(
            yup
                .number()
                .transform((v, o) => (typeof o === 'number' ? o : o?.value))
                .label('Pays')
        )
        .default([]),
    parentEstablishementId: yup.string().label('Etablissement de rattachement (parent)'),
    childEstablishments: yup.array().of(childEstablishmentSchema).default([]),
    privateComment: yup.string().label('Commentaires UNETP confidentiel').nullable(),
    comments: yup.string().label('Commentaires publiés sur le site Internet').nullable(),
    reAddedAt: yup
        .array(yup.date().required())
        .required()
        .transform((v) => v.filter((e) => e instanceof Date && !Number.isNaN(e)))
        .default([]),
    resignation: yup
        .array(yup.date().required())
        .required()
        .transform((v) => v.filter((e) => e instanceof Date && !Number.isNaN(e)))
        .default([])
});

export const globalInfoDefaultAdminSchema = yup.object({
    id: yup.string(),
    members: yup.string().label('Membres').oneOf(Object.keys(memberType)),
    establishmentKey: yup
        .string()
        .required()
        .label("Clé de la structure d'établissement")
        .test('isDuplicatedKey', 'ce clé est pris', async function (value) {
            if (value) {
                let hasDuplicates = true;
                const { data } = await axios.get(
                    `${endpointUrl}/establishments/availability/by-key/${encodeURIComponent(
                        value
                    )}?exclude=${this.parent.id}`
                );
                if (data?.data?.isAvailable) {
                    return hasDuplicates;
                } else {
                    return !hasDuplicates;
                }
            }
        })
        .test(
            'endsWithExistingNumber',
            "la clé d'établissement doit se terminer par 0,1,2,3,4 ",
            (v) => {
                return establishmentKeyEndings.includes(v?.charAt(v.length - 1));
            }
        ),
    establishmentNumber: yup.string().required().label("N° de la structure d'établissement"),
    organization: yup.object({
        name: yup
            .string()
            .required()
            .label("Nom de la structure d'établissement")
            .test('isDuplicatedName', 'ce nom est pris', async function (value) {
                if (value) {
                    let hasDuplicates = true;
                    const { data } = await axios.get(
                        `${endpointUrl}/establishments/availability/by-name/${encodeURIComponent(
                            value
                        )}?exclude=${this.parent.id}`
                    );
                    if (data?.data?.isAvailable) {
                        return hasDuplicates;
                    } else {
                        return !hasDuplicates;
                    }
                }
            })
    }),
    departmentId: yup
        .string()
        .transform((value) => {
            if (value === '0') {
                return undefined;
            }
            return value;
        })
        .label('Département'),
    academyId: yup
        .string()
        .transform((value) => {
            if (value === '0') {
                return undefined;
            }
            return value;
        })
        .label('Académie'),
    delegationId: yup
        .string()
        .transform((value) => {
            if (value === '0') {
                return undefined;
            }
            return value;
        })
        .label('Délégation régionale'),
    ogecName: yup.string().label('Nom').nullable(),
    ogecAddress: yup.string().label('Code postale').nullable(),
    ogecPhoneNumber: yup
        .string()
        .transform((v) => {
            const val = v
                ?.split(' ')
                .filter((e) => !!e?.trim().length)
                .join('')
                .replaceAll('x', '');
            return val;
        })
        .length(10)
        .label('Numéro de téléphone')
        .nullable(),
    ogecEmail: yup.string().email().label('E-mail').nullable(),
    ogecCity: yup.string().label('Ville').nullable(),
    numAcadLP: yup.string().label('N° académique LP'),
    numAcadLT: yup.string().label('N° académique LT'),
    numAcadCFA: yup.string().label('N° académique CFA'),
    numExistanceCFP: yup.string().label('N° académique CFP'),
    labels: yup.array().of(labelSchema).default([]),
    accessDate: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        })
        .label("Date d'adhésion"),
    coordinates: yup.array().of(coordinateSchema).default([]),
    mixed: yup
        .string()
        .required()
        .transform((v) => (v ? v : 'nc'))
        .oneOf(Object.keys(mixedTypes))
        .nullable(),
    guardianships: yup
        .array()
        .of(
            yup
                .number()
                .transform((v, o) => (typeof o === 'number' ? o : o?.value))
                .label('Tutelle')
        )
        .default([]),
    pensions: yup
        .array()
        .of(
            yup
                .number()
                .transform((v, o) => (typeof o === 'number' ? o : o?.value))
                .label('Pension')
        )
        .default([]),
    parings: yup
        .array()
        .of(
            yup
                .number()
                .transform((v, o) => (typeof o === 'number' ? o : o?.value))
                .label('Pays')
        )
        .default([]),
    partners: yup
        .array()
        .of(
            yup
                .number()
                .transform((v, o) => (typeof o === 'number' ? o : o?.value))
                .label('Pays')
        )
        .default([]),
    parentEstablishementId: yup.string().label('Etablissement de rattachement (parent)'),
    childEstablishments: yup.array().of(childEstablishmentSchema).default([]),
    privateComment: yup.string().label('Commentaires UNETP confidentiel').nullable(),
    comments: yup.string().label('Commentaires publiés sur le site Internet').nullable(),
    reAddedAt: yup
        .array(yup.date().required())
        .required()
        .transform((v) => v.filter((e) => e instanceof Date && !Number.isNaN(e)))
        .default([]),
    resignation: yup
        .array(yup.date().required())
        .required()
        .transform((v) => v.filter((e) => e instanceof Date && !Number.isNaN(e)))
        .default([])
});
export const globalInfoSchema = yup
    .object({
        capacityHistories: yup.array(capacityEntryDefaultSchema)
    })
    .concat(globalInfoDefaultSchema.clone());

export const globalInfoAdminSchema = yup
    .object({
        capacityHistories: yup.array(capacityEntryDefaultSchema)
    })
    .concat(globalInfoDefaultAdminSchema.clone());

export const globalInfoEditSchema = yup
    .object({
        capacityHistories: yup.array(capacityEntryEditSchema)
    })
    .concat(globalInfoDefaultSchema.clone());

export const globalInfoEditAdminSchema = yup
    .object({
        capacityHistories: yup.array(capacityEntryEditSchema)
    })
    .concat(globalInfoDefaultAdminSchema.clone());

export const functionsSchema = yup.object({
    users: yup
        .array()
        .of(functionSchema.clone())
        .default([])

        .test('isDuplicated', 'cette fonction existe deja', async function (v) {
            let hasDuplicates = true;
            let test_bool = false;

            const user = v.map((e) => e.user.id);
            const label = v.map((e) => e.labelId);

            var dates = [];

            v.map((e) => {
                const startDate = e?.startDate;
                const endDate = e?.endDate;
                const formatStartDate = startDate ? moment(startDate).format('YYYY-MM-DD') : null;
                const formatEndDate = endDate ? moment(endDate).format('YYYY-MM-DD') : null;
                dates.push({ formatStartDate, formatEndDate });
            });

            dates.forEach((element, index1) => {
                if (element.formatStartDate && element.formatEndDate) {
                    dates.forEach((element2, index2) => {
                        if (index1 != index2) {
                            if (element2.formatStartDate && element2.formatEndDate) {
                                if (
                                    element2.formatStartDate == element.formatStartDate &&
                                    element2.formatEndDate == element.formatEndDate
                                )
                                    test_bool = true;
                            } else if (element2.formatStartDate) {
                                var momentRange = require('moment-range');
                                momentRange.extendMoment(moment);

                                const range = moment.range(
                                    element.formatStartDate,
                                    element.formatEndDate
                                );
                                if (range.contains(moment(element2.formatStartDate))) {
                                    test_bool = true;
                                }
                            } else {
                                var momentRanges = require('moment-range');
                                momentRanges.extendMoment(moment);
                                const range = moment.range(
                                    element.formatStartDate,
                                    element.formatEndDate
                                );
                                if (range.contains(moment(element2.formatEndDate))) {
                                    test_bool = true;
                                }
                            }
                        }
                    });
                } else if (element.formatStartDate) {
                    dates.forEach((element2, index2) => {
                        if (index1 != index2) {
                            if (element2.formatStartDate && element2.formatEndDate) {
                                var momentRange = require('moment-range');
                                momentRange.extendMoment(moment);

                                const range = moment.range(
                                    element2.formatStartDate,
                                    element2.formatEndDate
                                );
                                if (range.contains(moment(element.formatStartDate))) {
                                    test_bool = true;
                                }
                                //stop the log //
                            } else if (element2.formatStartDate) {
                                if (element.formatStartDate == element2.formatStartDate) {
                                    test_bool = true;
                                }
                            } else {
                                if (element.formatStartDate == element2.formatEndDate) {
                                    test_bool = true;
                                }
                            }
                        }
                    });
                } else {
                    dates.forEach((element2, index2) => {
                        if (index1 != index2) {
                            if (element2.formatStartDate && element2.formatEndDate) {
                                var momentRange = require('moment-range');
                                momentRange.extendMoment(moment);

                                const range = moment.range(
                                    element2.formatStartDate,
                                    element2.formatEndDate
                                );
                                if (range.contains(moment(element.formatEndDate))) {
                                    test_bool = true;
                                }
                            } else if (element2.formatStartDate) {
                                if (element.formatEndDate == element2.formatStartDate) {
                                    test_bool = true;
                                }
                            } else {
                                if (element.formatEndDate == element2.formatEndDate) {
                                    test_bool = true;
                                }
                            }
                        }
                    });
                }
            });

            const toFindDuplicateFunction = (label) =>
                label.filter((item, index) => label.indexOf(item) !== index);
            const duplicateFunction = toFindDuplicateFunction(label);

            const toFindDuplicates = (user) =>
                user.filter((item, index) => user.indexOf(item) !== index);
            const duplicateElements = toFindDuplicates(user);

            if (duplicateElements?.length && duplicateFunction && test_bool) {
                return !hasDuplicates;
            } else {
                return hasDuplicates;
            }
        })

        .required()
});
export const subscriptionFeeSchema = yup.object({
    id: yup.number(),
    year: yup.string().required().label('Année de cotisation')
});

export const historiesSchema = yup.object({
    histories: yup.array().of(historySchema.clone()).default([])
});

export const editdiplomaSchema = yup.object({
    complement: yup.string().label('Complément').nullable()
});
export const diplomaSchema = yup.object({
    id: yup.string(),
    diplomaId: yup
        .string()
        .transform((v, o) => (typeof o === 'object' ? o?.value?.toString() : o.toString()))
        .required()
        .label('Diplôme'),
    complement: yup.string().label('Complément').nullable()
});

export const diplomasSchema = yup.object({
    diplomas: yup.array().of(diplomaSchema).default([])
});

export const subscriptionFeesSchema = yup.object({
    subscriptionFees: yup.array().of(subscriptionFeeSchema).default([])
});
export const etablissmentSchemas = [globalInfoSchema, functionsSchema, historiesSchema];
const etablissmentSchema = etablissmentSchemas?.reduce((acc, cv) => acc.concat(cv), yup.object());

export const etablissmentAdminSchemas = [globalInfoAdminSchema, functionsSchema, historiesSchema];
export const etablissmentAdminSchema = etablissmentAdminSchemas?.reduce(
    (acc, cv) => acc.concat(cv),
    yup.object()
);

export const editEstablissmentSchemas = [
    globalInfoEditSchema,
    functionsSchema,
    historiesSchema,
    diplomasSchema,
    subscriptionFeesSchema
];

export const editEstablishementAdminSchemas = [
    globalInfoEditAdminSchema,
    functionsSchema,
    historiesSchema,
    diplomasSchema,
    subscriptionFeesSchema
];
export const editEstablishementSchema = editEstablissmentSchemas?.reduce(
    (acc, cv) => acc.concat(cv),
    yup.object()
);

export const editEstablishementAdminSchema = editEstablishementAdminSchemas?.reduce(
    (acc, cv) => acc.concat(cv),
    yup.object()
);
export default etablissmentSchema;
