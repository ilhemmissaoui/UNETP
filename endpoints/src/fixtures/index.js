import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

import User from '../models/Access';

export default async () => {
    const defaultPassword = bcrypt.hashSync('password', parseInt(process.env.BCRYPT_SALT));

    await User.update(
        {
            password: defaultPassword
        },
        {
            where: {
                id: {
                    [Op.gte]: 0
                }
            }
        }
    );
};
