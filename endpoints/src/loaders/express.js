import compression from 'compression';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
// file config
import httpStatus from 'http-status-codes';
import passport from 'passport';

import morgan from '../config/morgan';
import { jwtStrategy } from '../config/passport';
import config from '../config/secrets';
import authLimiter from '../middlewares/rateLimiter';
// routes
import routes from '../routes/v1';
import ApiError from '../utils/apiError';
// file utils
import { errorConverter, errorHandler } from '../utils/errors';

const expressLoader = ({ app }) => {
    if (config.env !== 'test') {
        app.use(morgan.successHandler);
        app.use(morgan.errorHandler);
    }

    // set security HTTP headers
    app.use(helmet());
    app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

    // parse json request body
    app.use(express.json({ limit: '200mb', extended: true }));
    // parse urlencoded request body
    app.use(express.urlencoded({ limit: '200mb', extended: true, parameterLimit: 50000 }));

    // hide framework name
    app.disable('X-Powered-By');

    // gzip compression
    app.use(compression());

    // enable cors
    app.use(cors());
    app.options('*', cors());

    // jwt authentication
    app.use(passport.initialize());
    passport.use('jwt', jwtStrategy);

    // limit repeated failed requests to auth endpoints
    if (config.env === 'production') {
        app.use('/api/v1/auth', authLimiter);
    }

    // route demo
    app.get('/', (req, res) => {
        res.send('hello world');
    });

    // v1 api routes
    app.use('/api/v1', routes);

    // send back a 404 error for any unknown api request
    app.use((req, res, next) => {
        next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    });

    // convert error to ApiError, if needed
    app.use(errorConverter);

    // handle error
    app.use(errorHandler);

    return app;
};

export default expressLoader;
