import httpStatus from 'http-status-codes';
import passport from 'passport';

import provideAbility from '../acs';
import ApiError from '../utils/apiError';

const verifyCallback =
    (req, resolve, reject, abilities = []) =>
    async (err, user, info) => {
        let _abilities = abilities;
        if (err || info || !user) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        req.user = await provideAbility(user);
        if (!Array.isArray(_abilities)) {
            _abilities = [_abilities];
        }
        if (!_abilities?.length) {
            return resolve();
        }
        const abilityResult = _abilities?.map((e) =>
            req.user?.backAbility?.can(e.action, e.subject)
        );
        if (abilityResult?.includes(false))
            return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));

        resolve();
    };
const rolesVerifyCallback =
    (req, resolve, reject, roles = []) =>
    async (err, user, info) => {
        if (err || info || !user) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        req.user = await provideAbility(user);
        if (!roles?.length) {
            return resolve();
        }
        const roleFound = roles?.find((e) => req.user?.role === e);
        if (!roleFound) return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));

        resolve();
    };

const auth = (abilities) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate(
            'jwt',
            { session: false },
            verifyCallback(req, resolve, reject, abilities)
        )(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};
export const roleAuth = (roles) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate(
            'jwt',
            { session: false },
            rolesVerifyCallback(req, resolve, reject, roles)
        )(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};

export default auth;
