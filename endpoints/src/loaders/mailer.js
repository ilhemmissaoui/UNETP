import logger from '../config/logger';
import config from '../config/secrets';
import { transport } from '../lib/email/send';

const mailTransportLoader = async () => {
    try {
        if (config.env !== 'test') {
            await transport.verify();
        }

        return transport;
    } catch (error) {
        logger.warn(
            'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
        );
    }
};

export default mailTransportLoader;
