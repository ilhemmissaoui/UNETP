import { compareSync } from 'bcrypt';

import Access from '../models/Access';

export const isPasswordMatch = (password, hashedPassword) => {
    return compareSync(password, hashedPassword);
};
export const getUniqueUsername = async ({ firstName, lastName }) => {
    const baseLogin = `${lastName}${firstName?.length ? `${firstName}.` : ''}`.toLowerCase();
    let count = await Access.count({ where: { username: baseLogin } });
    let username;
    let i = 1;
    if (!count) return baseLogin;
    while (count) {
        username = `${baseLogin}.${i}`;
        count = await Access.count({ where: { username } });
        i++;
    }
    return username;
};
