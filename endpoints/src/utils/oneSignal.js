import * as OneSignal from 'onesignal-node';

import config from '../config/secrets';
import Notification from '../models/Notification';

const { appId, appKey } = config.oneSignal;
const oneSignalClient = new OneSignal.Client(appId, appKey);

export const sendAndSaveNotification = async (config, userId, createdAt = new Date()) => {
    await oneSignalClient.createNotification(config);
    console.log(config);
    await Notification.insert({ ...config, userId, createdAt });
};
export default oneSignalClient;
