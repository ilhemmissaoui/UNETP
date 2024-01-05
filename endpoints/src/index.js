import express from 'express';

import logger from './config/logger';
import config from './config/secrets';
import Queues from './lib/queues';
import appLoader from './loaders';
async function startServer() {
    const app = express();

    await appLoader({ expressApp: app });

    const server = app.listen(config.port, () => {
        logger.info(
            `🔊 Server on listening at http://localhost:${config.port} in ${config.env} mode`
        );
        if (process.send) {
            process.send(`Server running at http://localhost:${config.port}`);
        }
    });

    const exitHandler = () => {
        if (server) {
            server.close();
        } else {
            process.exit(1);
        }
    };

    const unexpectedErrorHandler = (error) => {
        logger.error(error);
        exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);

    process.on('SIGTERM', () => {
        logger.info('SIGTERM received');
        if (server) {
            server.close();
        }
    });
    Queues.mail.run();
}
startServer();
