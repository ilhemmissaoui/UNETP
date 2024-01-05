import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const generatePassword = (password) => {
    if (!password) password = crypto.randomBytes(10).toString('hex');
    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));
    return { password, hashedPassword };
};
