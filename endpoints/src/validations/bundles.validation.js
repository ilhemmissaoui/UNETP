import * as yup from 'yup';

import Bundle from '../models/Bundle';

const bundleSchema = yup.object({
    name: yup.string().required(),
    variantName: yup.string(),
    variantColor: yup.array(
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
    description: yup.string().required()
});
export const assignBundleSchema = yup.object({
    _id: yup
        .string()
        .required()
        .test('is-valid-id', 'Id is invalid', async (_id) => !!(await Bundle.findOne({ _id })))
});
export default bundleSchema;
