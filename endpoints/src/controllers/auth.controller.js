import { hashSync } from 'bcrypt';
import httpStatus from 'http-status-codes';

import { translateRoleToAbilities } from '../acs';
import roles from '../acs/roles';
import sequelize from '../db';
import Access from '../models/Access';
import Civility from '../models/Civility';
import User from '../models/User';
import { authService, emailService, tokenService } from '../services';
import ApiError from '../utils/apiError';
import { isPasswordMatch } from '../utils/auth';
import catchAsync from '../utils/catchAsync';

const login = catchAsync(async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Access.findOne({
            where: {
                username
            }
        });
        if (!user || !(await isPasswordMatch(password, user.password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Erreur d'authentification");
        }
        if (user?.role === null || user.isDisabled)
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Utilisateur non autorisé');
        const tokens = await tokenService.generateAuthTokens(user);
        const profile = await User.findOne({
            where: { accessId: user.id },
            include: Civility
        });

        const role = Object.values(roles).find((e) => e.roleId === user?.role);
        const abilities = (await translateRoleToAbilities(role, profile?.id)).flat();
        const obj = {
            user: {
                username: user.username,
                profile,
                ability: abilities,
                role: user?.role
            },
            tokens
        };
        res.send(obj);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});

const logout = catchAsync(async (req, res) => {
    // const { refreshToken, deviceId } = req.body;
    // const { user } = await authService.logout(refreshToken);
    // const { devices } = await User.findOne({ _id: user });
    // if (user && deviceId) {
    //     User.update(
    //         { _id: user },
    //         {
    //             $set: {
    //                 devices: devices.filter((e) => e.deviceId !== deviceId)
    //             }
    //         }
    //     );
    // }
    res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
    const info = await tokenService.generateResetPasswordToken(req.body.username);
    if (info) {
        const { resetPasswordToken, email } = info;

        await emailService.sendResetPasswordEmail(email, resetPasswordToken);
    }
    res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const sendEnrollmentEmail = catchAsync(async (req, res) => {
    const verifyEmailToken = await tokenService.generateEnrollmentEmailToken(req.user);
    await emailService.sendEnrollmentEmail(req.user.email, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
    await authService.verifyEmail(req.query.token);
    res.status(httpStatus.NO_CONTENT).send();
});
const changePassword = catchAsync(async (req, res) => {
    const { oldPassword, newPassword } = req?.body || {};
    const { password } = req?.user || {};
    const t = await sequelize.transaction();
    try {
        if (!isPasswordMatch(oldPassword, password)) {
            throw new ApiError(
                httpStatus.FORBIDDEN,
                "Votre ancien mot de passe n'est pas conforme avec votre mot de passe actuel"
            );
        } else if (oldPassword === newPassword) {
            throw new ApiError(
                httpStatus.FORBIDDEN,
                'Vous ne pouvez pas utiliser le même mot de passe'
            );
        }

        let newPass = hashSync(newPassword, 8);
        await Access.update(
            {
                password: newPass
            },
            { where: { id: req?.user?.id } },
            { transaction: t }
        );
        await t.commit();
        res.status(httpStatus.NO_CONTENT).send();
    } catch (e) {
        await t.rollback();
        res.status(500).json({
            errCode: null,
            data: {
                message: e.message
            }
        });
    }
});

export default {
    // register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
    changePassword,
    sendEnrollmentEmail
};
