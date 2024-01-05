import Queue from 'bull';
import nodemailer from 'nodemailer';

import config from '../../config/secrets';
import RelaunchHistory from '../../models/RelaunchHistory';
import { createRedisBullClient } from '../redis';
const transport = nodemailer.createTransport(config.email.smtp);

const MailQueue = new Queue('MailQueue', {
    createClient: createRedisBullClient
});

const runMailQueue = async () => {
    if (config.env === 'development') await MailQueue.empty();
    MailQueue.process(async function (job, done) {
        const { msg, establishmentId } = job.data;
        try {
            await transport.sendMail(msg);
            await RelaunchHistory.create({
                establishmentId,
                subject: msg.subject,
                content: JSON.stringify(msg),
                sendDate: new Date(),
                status: true
            });
            setTimeout(() => done(), config.email.delay);
        } catch (e) {
            console.log(e);
            await RelaunchHistory.create({
                establishmentId,
                subject: msg.subject,
                content: JSON.stringify(msg),
                sendDate: new Date(),
                status: false
            });
            setTimeout(
                () => done(new Error(`failed to send mail with error ${e}`)),
                config.email.delay
            );
        }
    });
};
export default {
    mail: {
        queue: MailQueue,
        add: (data) =>
            MailQueue.add(data, {
                removeOnComplete: true
            }),
        run: runMailQueue
    }
};
