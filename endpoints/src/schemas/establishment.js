import moment from 'moment';

import yup from '../lib/yup';
import Organization from '../models/Organization';
import coordinateSchema from './shared/coordinate';
import functionSchema from './shared/function';
import historySchema from './shared/history';

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
const establishmentKeyEndings = ['0', '1', '2', '3', '4'];

export const pensionTypes = ['1/2 Pens', 'Ext', 'Int', 'Int(externé)', 'Int filles', 'Int Garçon'];
const capacityHitoryTypes = {
    0: yup.object({
        collegeContractStudentsCount: yup
            .number()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
            .label('Collège'),
        lpContractStudentsCount: yup
            .number()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
            .label('LP'),
        lgtContractStudentsCount: yup
            .number()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
            .label('LGT'),
        btsContractStudentsCount: yup
            .number()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
            .label('BTS'),
        supContractStudentsCount: yup
            .number()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
            .label('Sup + CPGE')
    }),
    1: yup.object({
        cfaUfaApprenticesCount: yup
            .number()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
            .label('CFA/UFA')
    }),
    2: yup.object({
        cfpCfcInternsHoursCount: yup
            .number()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
            .label('CFP/CFC')
    }),
    3: yup.object({
        cfaUfaApprenticesCount: yup
            .number()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
            .label('CFA/UFA')
    }),
    4: yup.object({
        cfpCfcInternsHoursCount: yup
            .number()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
            .label('CFP/CFC')
    })
};

export const childEstablishmentSchema = yup.lazy((value) => {
    if (value.mode === 'search' || typeof value?.id !== 'undefined') {
        return yup.object({
            id: yup
                .number()
                .transform((v, o) => (typeof o === 'number' ? o : o?.value))
                .required()
                .label('Établissement')
        });
    }
    return yup.object({
        establishmentKey: yup
            .string()
            .required()
            .test(
                'endsWithExistingNumber',
                "la clé d'établissement doit se terminer par 0,1,2,3,4 ",
                (v) => {
                    return establishmentKeyEndings.includes(v?.charAt(v.length - 1));
                }
            )
            .label('Clé'),
        establishmentNumber: yup.string().required().label('Numéro'),
        organization: yup.object({
            name: yup.string().required().label('Nom')
        }),
        id: yup.string().strip()
    });
});

export const memberType = ['membre associé', 'membre adhérent', 'non membre', '0'];
export const labelSchema = yup.number().required().label('label');
export const capacityEntryDefaultSchema = yup.object({
    id: yup.string(),
    year: yup
        .string()
        .required()
        .label('Année')
        .matches(/^\d{4}-\d{4}$/, "Format d'année non valide")
        .test('isYear', "veuillez entrer un intervalle d'un an", (value) => {
            let years = value.split('-');
            let firstYear = parseInt(years[0]);
            let lastYear = parseInt(years[1]);
            return lastYear - firstYear == 1;
        })
});

const ogecItem = yup.object({
    establishmentId: yup.string(),
    ogecName: yup.string().label('Nom').required(),
    ogecAddress: yup.string().label('Code postal').required(),
    ogecPhoneNumber: yup
        .string()
        .transform((v) =>
            v
                ?.split(' ')
                .filter((e) => !!e?.trim().length)
                .join('')
                .replaceAll('x', '')
        )
        .length(10)
        .label('Numéro de téléphone')
        .required()
        .nullable(),
    ogecEmail: yup.string().email().required().label('E-mail'),
    ogecCity: yup.string().required().label('Ville'),
    commentaire: yup.string()
});
export const updateOgec = yup.array().of(ogecItem).min(1);

export const globalInfoDefaultSchema = yup.object({
    members: yup.string().label('Membres').oneOf(memberType),
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
        name: yup
            .string()
            .required()
            .label("Nom de la structure d'établissement")
            .test('isDuplicatedName', 'ce nom est pris', async (value) => {
                let hasDuplicates = true;
                const data = await Organization.findOne({ where: { name: value } });
                if (data?.length) {
                    return !hasDuplicates;
                } else {
                    return hasDuplicates;
                }
            })
    }),
    departmentId: yup.string().label('Département'),
    ogecName: yup.string().label('Nom').required().nullable(),
    ogecAddress: yup.string().label('Code postale').required().nullable(),
    ogecPhoneNumber: yup
        .string()
        .transform((v) =>
            v
                ?.split(' ')
                .filter((e) => !!e?.trim().length)
                .join('')
                .replaceAll('x', '')
        )
        .length(10)
        .required()
        .label('Numéro de téléphone')
        .nullable(),
    ogecEmail: yup.string().email().required().label('E-mail').nullable(),
    ogecCity: yup.string().label('Ville').required().nullable(),
    academyId: yup.string().label('Académie'),
    delegationId: yup.string().label('Délégation régionale'),
    numAcadLP: yup.string().label('N° académique LP'),
    numAcadLT: yup.string().label('N° académique LT'),
    numAcadCFA: yup.string().label('N° académique CFA'),
    numExistanceCFP: yup.string().label('N° académique CFP'),
    labels: yup.array().of(labelSchema).default([]),
    accessDate: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return date instanceof Date && !Number.isNaN(date) ? date : undefined;
        })
        .label("Date d'adhésion"),
    coordinates: yup.array().of(coordinateSchema).default([]),
    mixed: yup.string().required().oneOf(Object.keys(mixedTypes)),
    guardianships: yup.array().of(yup.number().label('Tutelle')).default([]),
    pensions: yup.array().of(yup.number().label('Pension')).default([]),
    parings: yup.array().of(yup.number().label('Pays')).default([]),
    partners: yup.array().of(yup.number().label('Pays')).default([]),
    parentEstablishementId: yup.string().label('Etablissement de rattachement (parent)'),
    childEstablishments: yup.array().of(childEstablishmentSchema).default([]),
    privateComment: yup.string().label('Commentaires UNETP confidentiel'),
    comments: yup.string().label('Commentaires publiés sur le site Internet')
});

export const globalInfoDefaultAdminSchema = yup.object({
    members: yup.string().label('Membres').oneOf(memberType),
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
        name: yup
            .string()
            .required()
            .label("Nom de la structure d'établissement")
            .test('isDuplicatedName', 'ce nom est pris', async (value) => {
                let hasDuplicates = true;
                const data = await Organization.findOne({ where: { name: value } });
                if (data?.length) {
                    return !hasDuplicates;
                } else {
                    return hasDuplicates;
                }
            })
    }),
    departmentId: yup.string().label('Département'),
    ogecName: yup.string().label('Nom').nullable(),
    ogecAddress: yup.string().label('Code postale').nullable(),
    ogecPhoneNumber: yup
        .string()
        .transform((v) =>
            v
                ?.split(' ')
                .filter((e) => !!e?.trim().length)
                .join('')
                .replaceAll('x', '')
        )
        .length(10)
        .label('Numéro de téléphone')
        .nullable(),
    ogecEmail: yup.string().email().label('E-mail').nullable(),
    ogecCity: yup.string().label('Ville').nullable(),
    academyId: yup.string().label('Académie'),
    delegationId: yup.string().label('Délégation régionale'),
    numAcadLP: yup.string().label('N° académique LP'),
    numAcadLT: yup.string().label('N° académique LT'),
    numAcadCFA: yup.string().label('N° académique CFA'),
    numExistanceCFP: yup.string().label('N° académique CFP'),
    labels: yup.array().of(labelSchema).default([]),
    accessDate: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return date instanceof Date && !Number.isNaN(date) ? date : undefined;
        })
        .label("Date d'adhésion"),
    coordinates: yup.array().of(coordinateSchema).default([]),
    mixed: yup.string().required().oneOf(Object.keys(mixedTypes)),
    guardianships: yup.array().of(yup.number().label('Tutelle')).default([]),
    pensions: yup.array().of(yup.number().label('Pension')).default([]),
    parings: yup.array().of(yup.number().label('Pays')).default([]),
    partners: yup.array().of(yup.number().label('Pays')).default([]),
    parentEstablishementId: yup.string().label('Etablissement de rattachement (parent)'),
    childEstablishments: yup.array().of(childEstablishmentSchema).default([]),
    privateComment: yup.string().label('Commentaires UNETP confidentiel'),
    comments: yup.string().label('Commentaires publiés sur le site Internet')
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
export const subscriptionFeesSchema = yup.object({
    subscriptionFees: yup.array().of(subscriptionFeeSchema).default([])
});
export const historiesSchema = yup.object({
    histories: yup.array().of(historySchema.clone()).default([])
});
export const diplomaSchema = yup.object({
    id: yup.string().label('id'),
    diplomaId: yup.string().required().label('Diplôme'),
    complement: yup.string().label('Complément').nullable()
});

export const diplomasSchema = yup.object({
    diplomas: yup.array().of(diplomaSchema).default([])
});

export const establishmentSchemas = [globalInfoSchema, functionsSchema, historiesSchema];
export const establishmentSchema = establishmentSchemas?.reduce(
    (acc, cv) => acc.concat(cv),
    yup.object()
);

export const establishmentAdminSchemas = [globalInfoAdminSchema, functionsSchema, historiesSchema];
export const establishmentAdminSchema = establishmentAdminSchemas?.reduce(
    (acc, cv) => acc.concat(cv),
    yup.object()
);

export const editEstablishmentSchemas = [diplomasSchema, subscriptionFeesSchema];
export const editEstablishmentSchema = editEstablishmentSchemas?.reduce(
    (acc, cv) => acc.concat(cv),
    yup.object()
);
export const editEstablissmentSchemas = [diplomasSchema, subscriptionFeesSchema];
export const editEstablishementSchema = yup?.lazy((v) => {
    const key = v?.establishmentKey?.charAt(v?.establishmentKey?.length - 1);
    const baseSchema = establishmentSchema.concat(
        editEstablissmentSchemas.reduce((acc, cv) => acc.concat(cv), yup.object())
    );
    return key
        ? baseSchema.concat(
              yup.object({
                  capacityHistories: yup.array(
                      capacityEntryDefaultSchema.concat(capacityHitoryTypes[key])
                  )
              })
          )
        : baseSchema;
});

export const editEstablishementAdminSchema = yup?.lazy((v) => {
    const key = v?.establishmentKey?.charAt(v?.establishmentKey?.length - 1);
    const baseSchema = establishmentAdminSchema.concat(
        editEstablissmentSchemas.reduce((acc, cv) => acc.concat(cv), yup.object())
    );
    return key
        ? baseSchema.concat(
              yup.object({
                  capacityHistories: yup.array(
                      capacityEntryDefaultSchema.concat(capacityHitoryTypes[key])
                  )
              })
          )
        : baseSchema;
});
export default establishmentSchema;
