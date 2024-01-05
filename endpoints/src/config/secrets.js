import dotenv from 'dotenv';
import path from 'path';
import * as yup from 'yup';

if (process.env.NODE_ENV === 'development')
    dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = yup
    .object()
    .shape({
        NODE_ENV: yup.string().oneOf(['production', 'development', 'test']).required(),
        ENDPOINT_PORT: yup.number().default(3000),
        DB_USER: yup.string().required(),
        DB_PASSWORD: yup.string().required(),
        DB_NAME: yup.string().required(),
        DB_TYPE: yup.string().required(),
        DB_HOST: yup.string().required(),
        JWT_SECRET: yup.string().required().label('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: yup
            .number()
            .default(30)
            .label('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: yup
            .number()
            .default(30)
            .label('days after which refresh tokens expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: yup
            .number()
            .default(10)
            .label('minutes after which reset password token expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: yup
            .number()
            .default(10)
            .label('minutes after which verify email token expires'),
        SMTP_HOST: yup.string().label('server that will send the emails'),
        SMTP_PORT: yup.number().label('port to connect to the email server'),
        SMTP_USERNAME: yup.string().label('username for email server'),
        SMTP_PASSWORD: yup.string().label('password for email server'),
        EMAIL_FROM: yup.string().label('the from field in the emails sent by the app'),
        ONE_SIGNAL_APP_ID: yup.string().label('One Signal app id'),
        ONE_SIGNAL_APP_KEY: yup.string().label('One Signal app key'),
        REDIS_URL: yup.string().required().label('Redis Url'),
        CRONICLE_URL: yup.string().required().label('Cronicle Url'),
        CRONICLE_API_KEY: yup.string().required().label('Cronicle API KEY'),
        ENDPOINT_URL: yup.string().required().label('Base Url'),
        FRONT_URL: yup.string().required(),
        AVATARS_PATH: yup.string().required(),
        MAIL_QUEUE_DELAY_TIME: yup
            .number()
            .required()
            .min(0)
            .default(1000)
            .label('Delay between sending mails in miliseconds')
    })
    .unknown();

const envVars = envVarsSchema.validateSync(process.env);

const config = {
    env: envVars.NODE_ENV,
    port: envVars.ENDPOINT_PORT,
    db: {
        user: envVars.DB_USER,
        password: envVars.DB_PASSWORD,
        name: envVars.DB_NAME,
        type: envVars.DB_TYPE,
        host: envVars.DB_HOST
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD
            }
        },
        from: envVars.EMAIL_FROM,
        delay: envVars.MAIL_QUEUE_DELAY_TIME
    },
    oneSignal: {
        appId: envVars.ONE_SIGNAL_APP_ID,
        appKey: envVars.ONE_SIGNAL_APP_KEY
    },
    redis: envVars.REDIS_URL,
    cronicle: {
        url: envVars.CRONICLE_URL,
        apiKey: envVars.CRONICLE_API_KEY
    },
    baseUrl: envVars.ENDPOINT_URL,
    meta: {
        frontUrl: envVars.FRONT_URL
    },
    avatarsPath: envVars.AVATARS_PATH
};

export default config;
