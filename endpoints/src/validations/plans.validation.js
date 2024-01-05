import * as yup from 'yup';

export const planCategorySchema = yup.object({
    name: yup.string().required().trim(),
    eligibility: yup.object({
        minSalary: yup
            .number()
            .positive()
            .required()
            .transform((v) => (Number.isNaN(v) ? undefined : v)),
        maxSalary: yup
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
            .transform((v) => (v ? v / 100 : v)),
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
        maxMonthlyFrequency: yup
            .number()
            .positive()
            .required()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
    }),
    fees: yup.object({
        subscription: yup
            .number()
            .min(0)
            .required()
            .transform((v) => (Number.isNaN(v) ? undefined : v)),
        transaction: yup
            .number()
            .min(0)
            .required()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
    })
});
const planSchema = yup.object({
    name: yup.string().required(),
    setupFees: yup
        .number()
        .min(0)
        .required()
        .transform((v) => (Number.isNaN(v) ? undefined : v)),
    categories: yup.array(planCategorySchema.required()).required().min(1)
});
export const withdrawalRangeCalculation = yup.object({
    minSalary: yup
        .number()
        .positive()
        .required()
        .transform((v) => (Number.isNaN(v) ? undefined : v)),
    maxSalary: yup
        .number()
        .positive()
        .required()
        .transform((v) => (Number.isNaN(v) ? undefined : v))
});
export default planSchema;
