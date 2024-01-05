import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import Access from '../models/Access';
import Civility from '../models/Civility';
import User from '../models/User';
// import User from '../models/User';
import { tokenTypes } from './constants';
import config from './secrets';

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error('Invalid token type');
        }

        const userData = (
            await Access.findOne({
                where: { id: payload.sub },
                include: { model: User, include: Civility }
            })
        ).get({ plain: true });
        userData.profile = userData?.user;
        delete userData.user;
        if (!userData) {
            done(null, false);
        }

        done(null, userData);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };
