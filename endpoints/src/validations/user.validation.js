import * as yup from 'yup';

import User from '../models/User';

export const userSchema = yup.object({
    profile: yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required()
    }),
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
        .required()
        .email()
        .test(async function (email) {
            if (await User.findOne({ email }))
                return this.createError({ message: 'E-mail is already taken.' });
            return true;
        }),
    role: yup.string().required()
});
export const organizationUserSchema = userSchema.concat(
    yup.object({
        department: yup.string().required(),
        position: yup.string().required()
    })
);
const getUsers = {
    query: yup.object({
        name: yup.string(),
        role: yup.string(),
        sortBy: yup.string(),
        limit: yup
            .number()
            .integer()
            .transform((v) => (Number.isNaN(v) ? undefined : v)),
        page: yup
            .number()
            .integer()
            .transform((v) => (Number.isNaN(v) ? undefined : v))
    })
};

const getUser = {
    params: yup.object({
        userId: yup.string()
    })
};

const updateUser = {
    params: yup.object({
        userId: yup.string().required()
    }),
    body: yup.object({
        email: yup.string().email(),
        password: yup.string(),
        name: yup.string()
    })
};

const deleteUser = {
    params: yup.object({
        userId: yup.string()
    })
};
const profileSchema = {
    firstName: yup.string().required().trim(),
    lastName: yup.string().required().trim()
};
export default {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    profileSchema
};
