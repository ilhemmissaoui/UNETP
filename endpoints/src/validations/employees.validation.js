import * as yup from 'yup';

import Department from '../models/Department';
import Position from '../models/Position';
import User from '../models/User';
export const step1 = yup.object({
    profile: yup.object({
        lastName: yup.string().required(),
        firstName: yup.string().required()
    }),
    nationalId: yup.string().required(),
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
    email: yup
        .string()
        .email()
        .required()
        .test(async function (email) {
            if (await User.findOne({ email }))
                return this.createError({ message: 'E-mail is already taken.' });
            return true;
        }),
    secondaryPhoneNumber: yup.string(),
    position: yup.string().required(),
    departement: yup.string().required(),
    hiredAt: yup.date().required()
});

export const step2 = yup.object({
    salary: yup
        .number()
        .required()
        .transform((v) => (Number.isNaN(v) ? undefined : v)),
    isAutomaticApproval: yup.boolean().required(),
    type: yup.string().transform((e) => (e ? 'bankTransfer' : 'e-dinar')),
    nameOnBankAccount: yup.string().required(),
    iban: yup.string().required(),
    bank: yup.string().required()
});

const employeeSchema = step1.concat(step2);

export const importEmployeeSchema = yup
    .object({
        profile: yup.object({
            lastName: yup.string().required(),
            firstName: yup.string().required()
        }),
        nationalId: yup.string().required(),
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
        email: yup.string().email().required(),
        secondaryPhoneNumber: yup.string(),
        position: yup
            .string()
            .required('Invalid position')
            .test(async (name) => {
                return !!(await Position.findOne({ name }));
            }),
        departement: yup
            .string()
            .required('Invalid departement')
            .test(async (name) => {
                return !!(await Department.findOne({ name }));
            }),
        hiredAt: yup.date().required()
    })
    .concat(step2);
export const employeeRegisterRequest = yup.object({
    profile: yup.object({
        lastName: yup.string().required(),
        firstName: yup.string().required()
    }),
    company: yup.string().required(),
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

    email: yup.string().email().required()
});

export default employeeSchema;
