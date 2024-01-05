import * as yup from 'yup';

import Package from '../models/Package';

export const financialTermsSchema = yup.object({
    bank: yup.string().required(),
    eligibility: yup.object({
        minSalary: yup
            .number()
            .positive()
            .required()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
    }),
    advance: yup.object({
        maxPercentageOfSalary: yup
            .number()
            .min(0)
            .max(100)
            .required()
            .transform((v) => (Number.isNaN(v) ? undefined : v)),
        maxAmount: yup
            .number()
            .positive()
            .required()
            .transform((v) => (Number.isNaN(v) ? undefined : v)),
        minAmount: yup
            .number()
            .positive()
            .required()
            .transform((v) => (Number.isNaN(v) ? undefined : v)),
        installmentsCount: yup
            .number()
            .positive()
            .required()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
    }),
    fees: yup.object({
        subscription: yup
            .number()
            .positive()
            .required()
            .transform((v) => (Number.isNaN(v) ? undefined : v)),
        transaction: yup
            .number()
            .positive()
            .required()
            .transform((v) => (Number.isNaN(v) ? undefined : v)),
        appliedFrom: yup
            .number()
            .positive()
            .required()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
    }),
    tos: yup.string().required()
});

const takafulTermsSchema = yup.object({
    billingCycle: yup
        .number()
        .positive()
        .required()
        .transform((v) => (Number.isNaN(v) ? undefined : v)),
    price: yup
        .number()
        .positive()
        .required()
        .transform((v) => (Number.isNaN(v) ? undefined : v)),
    shortDescription: yup.string().required(),
    tos: yup.string().required(),
    insuranceProvider: yup.string().required()
});
const packageSchema = yup.object({
    name: yup
        .string()
        .required()
        .transform((v) => v?.replace(/"|\\/gi, '')),
    provider: yup.string(),
    color: yup.array(
        yup.object({
            color: yup
                .string()
                .required()
                .matches(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, {
                    message: "This isn't a valid color"
                }),
            offset: yup
                .number()
                .min(0)
                .max(1)
                .required()
                .transform((v) => (Number.isNaN(v) ? undefined : v))
        })
    ),
    takafulTerms: takafulTermsSchema,
    financialTerms: financialTermsSchema,
    features: yup
        .string()
        .required()
        .transform((v) => {
            return v;
        })
});
export const assignPackageSchema = yup.object({
    _id: yup
        .string()
        .required()
        .test('is-valid-id', 'Id is invalid', async (_id) => !!(await Package.findOne({ _id })))
});
export default packageSchema;
