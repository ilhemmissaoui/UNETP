import { Sequelize } from 'sequelize';

import config from '../config/secrets';

const { user, password, name, type, host } = config?.db || {};
const sequelize = new Sequelize(name, user, password, {
    host,
    dialect: type,
    logging: true
});

export const connect = async () => {
    try {
        await sequelize.authenticate();
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
};
export const disconnect = async () => {
    await sequelize.close();
};
export default sequelize;
