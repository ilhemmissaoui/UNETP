import express from 'express';

import authController from '../../controllers/auth.controller';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import authValidation from '../../validations/auth.validation';
const router = express.Router();

import Coordinate from '../../models/Coordinate';

// router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post(
    '/refresh-tokens',
    validate(authValidation.refreshTokens),
    authController.refreshTokens
);
router.post(
    '/forgot-password',
    validate(authValidation.forgotPassword),
    authController.forgotPassword
);
router.post(
    '/reset-password',
    validate(authValidation.resetPassword),
    authController.resetPassword
);
router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);
router.post('/personnes/nouveau', auth(), authController.sendEnrollmentEmail);

router.get('/me', auth(), async (req, res) => {
    const { ...other } = req?.user || {};

    const { profile } = req?.user || {};

    const coordinates = await Coordinate.findAll({
        where: { userId: profile?.id }
    });
    other.profile.coordinates = coordinates;
    return res.json(other);
});

router.post(
    '/change-password',
    auth(),
    validate(authValidation.changePassword),
    authController.changePassword
);
router.post(
    '/forgot-password',

    validate(authValidation.forgotPassword),
    authController.forgotPassword
);

export default router;
