import * as yup from 'yup';

const requestAdvanceSchema = yup.object({
    amount: yup
        .number()
        .positive()
        .required()
        .transform((v) => (Number.isNaN(v) ? undefined : v)),
    returnInMonths: yup
        .number()
        .min(1)
        .max(6)
        .required()
        .transform((v) => (Number.isNaN(v) ? undefined : v))
});

export const updateAdvanceSchema = yup.object({
    status: yup.string().oneOf(['approved', 'rejected'])
});
export default requestAdvanceSchema;
