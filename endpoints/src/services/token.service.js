import jwt from 'jsonwebtoken';
import moment from 'moment';

import config from '../config/secrets';
import { tokenTypes } from '../config/tokens';
import Access from '../models/Access';
import Coordinate from '../models/Coordinate';
import User from '../models/User';

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type
    };
    return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token) => {
    const payload = jwt.verify(token, config.jwt.secret);
    // const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
    // if (!tokenDoc) {
    //     throw new Error('Token not found');
    // }
    // return tokenDoc;
    console.log(payload);
    return payload;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
    // await saveToken(refreshToken, user._id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate()
        }
    };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (username) => {
    const user = await Access.findOne({
        where: {
            username
        },
        include: {
            model: User,
            include: Coordinate
        }
    });
    if (!user) {
        return null;
    }
    const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
    const plainUser = user.get({ plain: true });
    const resetPasswordToken = generateToken(plainUser?.id, expires, tokenTypes.RESET_PASSWORD);
    console.log(plainUser.user.coordinates.find((e) => e.email?.length)?.email);
    const email = plainUser.user.coordinates.find((e) => e.email?.length)?.email;
    if (email)
        return {
            resetPasswordToken,
            email
        };
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user) => {
    const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
    const verifyEmailToken = generateToken(user._id, expires, tokenTypes.VERIFY_EMAIL);

    return verifyEmailToken;
};

export default {
    generateToken,
    verifyToken,
    generateAuthTokens,
    generateResetPasswordToken,
    generateVerifyEmailToken
};
