import nodemailer from 'nodemailer';

import logger from '../config/logger';
import config from '../config/secrets';

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
    transport
        .verify()
        .then(() => logger.info('Connected to email server'))
        .catch(() =>
            logger.warn(
                'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
            )
        );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, html, from) => {
    const msg = { from: from || config.email.from, to, subject, text, html };
    await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
    const subject = 'Reset password';
    // replace this url with the link to the reset password page of your front-end app
    const resetPasswordUrl = `${config?.meta?.frontUrl}/reset-password?token=${token}`;
    const text = `Cher utilisateur,
    Pour réinitialiser votre mot de passe, cliquez sur ce lien: ${resetPasswordUrl}
    Si vous n'avez demandé aucune réinitialisation de mot de passe, ignorez cet e-mail.`;
    await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
    const subject = 'Email Verification';
    // replace this url with the link to the email verification page of your front-end app
    const verificationEmailUrl = `${config?.meta?.frontUrl}/verify-email?token=${token}`;
    const text = `Cher utilisateur,
    Pour vérifier votre email, cliquez sur ce lien : ${verificationEmailUrl}
    Si vous n'avez pas créé de compte, ignorez cet e-mail.`;
    await sendEmail(to, subject, text);
};

const sendEnrollmentEmail = async (to) => {
    const subject = 'Email de connexion';

    const text = `Cher utilisateur,
    Voici votre identifiant et votre mot de passe pour connecter à notre application:`;
    await sendEmail(to, subject, text);
};

export default {
    transport,
    sendEmail,
    sendResetPasswordEmail,
    sendVerificationEmail,
    sendEnrollmentEmail
};
