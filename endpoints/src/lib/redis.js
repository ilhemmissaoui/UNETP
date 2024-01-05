import Redis from 'ioredis';

import config from '../config/secrets';

let standaloneClient;
let client;
let subscriber;

export { client };
const createRedisClient = () => {
    if (!standaloneClient) standaloneClient = new Redis(config.redis);
    return standaloneClient;
};

export const createRedisBullClient = (type, redisOpts) => {
    switch (type) {
        case 'client':
            if (!client) {
                client = new Redis(config.redis, redisOpts);
            }
            return client;
        case 'subscriber':
            if (!subscriber) {
                subscriber = new Redis(config.redis, { ...redisOpts, maxRetriesPerRequest: null });
            }
            return subscriber;
        case 'bclient':
            return new Redis(config.redis, { ...redisOpts, maxRetriesPerRequest: null });
        default:
            throw new Error('Unexpected connection type: ', type);
    }
};
export default createRedisClient;
