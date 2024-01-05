import * as yup from 'yup';
import zxcvbn from 'zxcvbn';

import { password } from './custom.validation';

const register = {
    body: yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().test('is-valid-password', password),
        name: yup.string().required()
    })
};

const login = {
    body: yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
        deviceId: yup.string(),
        pushToken: yup.string()
    })
};

const adminLogin = {
    body: yup.object({
        email: yup.string().required(),
        password: yup.string().required()
    })
};
const logout = {
    body: yup.object({
        refreshToken: yup.string().required(),
        deviceId: yup.string()
    })
};

const refreshTokens = {
    body: yup.object({
        refreshToken: yup.string().required()
    })
};

const forgotPassword = {
    body: yup.object({
        username: yup.string().required()
    })
};

const resetPassword = {
    query: yup.object({
        token: yup.string().required()
    }),
    body: yup.object({
        password: yup.string().required().test('is-valid-password', password)
    })
};

const verifyEmail = {
    query: yup.object({
        token: yup.string().required()
    })
};

const changePassword = {
    body: yup.object({
        oldPassword: yup.string().required(),
        newPassword: yup
            .string()
            .required()
            .label('nouveau mot de passe')
            .test(
                'isValid',
                'Un mot de passe doit contenir au minimum 8 caractères  ou plus avec un mélange de lettres, de chiffres et de & symboles.',
                function (value) {
                    var pwd = zxcvbn(value.toString());
                    return pwd?.score >= 3;
                }
            )
    })
};

export default {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    verifyEmail,
    adminLogin,
    changePassword
};
