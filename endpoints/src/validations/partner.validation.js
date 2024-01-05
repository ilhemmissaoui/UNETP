import * as yup from 'yup';

const partnerSchema = yup.object({
    type: yup
        .string()

        .transform((v) => v?.replace(/"/gi, ''))
        .required(),
    name: yup
        .string()
        .transform((v) => v?.replace(/"/gi, ''))
        .required(),
    legalName: yup
        .string()
        .transform((v) => v?.replace(/"/gi, ''))
        .required(),
    address: yup.object({
        address: yup
            .string()
            .transform((v) => v?.replace(/"/gi, ''))
            .required(),
        street: yup
            .string()
            .transform((v) => v?.replace(/"/gi, ''))
            .required(),
        zipCode: yup
            .string()
            .transform((v) => v?.replace(/"/gi, ''))
            .required(),
        state: yup
            .string()
            .transform((v) => v?.replace(/"/gi, ''))
            .required(),
        country: yup
            .string()
            .transform((v) => v?.replace(/"/gi, ''))
            .required()
    }),
    mainContact: yup.object({
        fullName: yup
            .string()
            .transform((v) => v?.replace(/"/gi, ''))
            .required(),
        phoneNumber: yup
            .string()
            .transform((v) => v?.replace(/"/gi, ''))
            .required(),
        email: yup
            .string()
            .transform((v) => v?.replace(/"/gi, ''))
            .email()
            .required(),
        position: yup
            .string()
            .transform((v) => v?.replace(/"/gi, ''))
            .required()
    }),
    bankAccountInfo: yup.object({
        name: yup
            .string()
            .transform((v) => v?.replace(/"/gi, ''))
            .required(),
        iban: yup
            .string()
            .transform((v) => v?.replace(/"/gi, ''))
            .required(),
        swift: yup
            .string()
            .transform((v) => v?.replace(/"/gi, ''))
            .required()
    })
});

export default partnerSchema;
