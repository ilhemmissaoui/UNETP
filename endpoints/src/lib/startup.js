import '../fixtures';

import logger from './logger';

const handleProcessEvents = () => {
    try {
        process.on('uncaughtException', (error) => {
            logger.error(error);
            console.warn(error);
        });

        process.on('uncaughtException', async (error) => {
            logger.error(error);
            console.warn(error);
        });

        process.on('unhandledRejection', async (error) => {
            logger.error(error);
            console.warn(error);
        });
    } catch (exception) {
        throw new Error(`[startup.handleProcessEvents] ${exception.message || exception}`);
    }
};

const startup = async (options, { resolve, reject }) => {
    try {
        handleProcessEvents();
        resolve();
    } catch (exception) {
        reject(`[startup] ${exception.message}`);
    }
};

export default (options) =>
    new Promise((resolve, reject) => {
        startup(options, { resolve, reject });
    });
