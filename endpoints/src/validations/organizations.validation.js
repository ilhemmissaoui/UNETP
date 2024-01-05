import * as yup from 'yup';

import User from '../models/User';

export const legalStatusList = {
    SARL: 'Société à responsabilité limitée',
    SUARL: 'Société unipersonnelle à responsabilité limitée',
    SA: 'Société anonyme',
    SCA: 'Société en commandite par actions'
};
export const organizationUpdateSchema = yup.object({
    name: yup.string().required(),
    legalStatus: yup.string().required(),
    industry: yup.string().required(),
    employeesNumber: yup
        .number()
        .positive()
        .required()
        .transform((v) => (Number.isNaN(v) ? undefined : v)),
    headOffice: yup.object({
        address: yup.string(),
        state: yup.string(),
        city: yup.string(),
        zipCode: yup.string(),
        country: yup.string().required()
    }),
    profile: yup.object({
        civility: yup.string().oneOf(['mr', 'ms']).required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        phoneNumber: yup
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
            .label('numéro de téléphone ')
            .nullable(),

        address: yup.string(),
        state: yup.string(),
        city: yup.string(),
        zipCode: yup.string(),
        country: yup.string(),
        email: yup.string().email()
    }),
    legalName: yup.string().required(),

    vat: yup.number().transform((v) => (Number.isNaN(v) ? undefined : v)),
    commercialRegistrationNumber: yup.string(),
    packages: yup.array().required().min(1)
});
const organizationSchema = organizationUpdateSchema.concat(
    yup.object({
        email: yup
            .string()
            .email()
            .required()
            .test(async function (email) {
                if (await User.findOne({ email }))
                    return this.createError({ message: 'E-mail is already taken.' });
                return true;
            })
    })
);

export default organizationSchema;
