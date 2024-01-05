import nodemailer from 'nodemailer';

import config from '../../config/secrets';

export const transport = nodemailer.createTransport(config?.email?.smtp);

export default transport;
