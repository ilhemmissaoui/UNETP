import bcrypt from 'bcrypt';
import httpStatus from 'http-status-codes';

import { tokenTypes } from '../config/tokens';
import Access from '../models/Access';
import ApiError from '../utils/apiError';
import { isPasswordMatch } from '../utils/auth';
import tokenService from './token.service';
import userService from './user.service';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithLoginAndPassword = async (login, password) => {
    const user = await Access.findOne({
        where: {
            login
        }
    });

    if (!user || !(await isPasswordMatch(password, user.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Erreur d'authentification");
    }
    return user;
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
    try {
        const resetPasswordTokenDoc = await tokenService.verifyToken(
            resetPasswordToken,
            tokenTypes.RESET_PASSWORD
        );
        const user = await Access.findOne({ where: { id: resetPasswordTokenDoc?.sub } });
        if (!user) {
            throw new Error();
        }
        const hashedPassword = bcrypt.hashSync(newPassword, 8);
        await user.update({ password: hashedPassword });
    } catch (error) {
        console.log(error);
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
    }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyEmailTokenDoc = await tokenService.verifyToken(
            verifyEmailToken,
            tokenTypes.VERIFY_EMAIL
        );
        const user = await userService.getUserById(verifyEmailTokenDoc.user);
        if (!user) {
            throw new Error();
        }
        // await Token.remove({ user: user._id, type: tokenTypes.VERIFY_EMAIL });
        await userService.updateUserById(user._id, { isEmailVerified: true });
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
    }
};

export default {
    loginUserWithLoginAndPassword,
    resetPassword,
    verifyEmail
};
