import logger from '../config/logger';
import fixturesLoader from '../fixtures';
import dbLoader from './db';
import expressLoader from './express';

const appLoaders = async ({ expressApp }) => {
    await dbLoader();
    logger.info(`🔊 Database Loaded`);

    // await mailTransportLoader();
    // logger.info(`🔊 Connected to email server`);

    await fixturesLoader();
    logger.info(`🔊 Fixtures Loaded`);

    await expressLoader({ app: expressApp });
    logger.info(`🔊 Express Loaded`);
};

export default appLoaders;
