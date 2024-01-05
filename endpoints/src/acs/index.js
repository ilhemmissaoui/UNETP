import { Ability } from '@casl/ability';

import ROLES from './roles';

export const translateRoleToAbilities = ({ permissions = [] }, userId) => {
    return Promise.all(
        permissions.map(async ({ subject, conditions = {}, ...actions }) => {
            return Promise.all(
                Object.entries(actions)
                    .filter((e) => e[1])
                    .map(async (e) => {
                        const action = e[0];
                        if (typeof conditions[action] == 'function') {
                            const _conditions = await conditions[action](userId);
                            return { subject: subject, action, conditions: _conditions };
                        }
                        return { subject: subject, action };
                    })
            );
        })
    );
};
const provideAbility = async (user) => {
    const role = Object.values(ROLES).find((e) => e.roleId === user?.role);
    const abilities = (await translateRoleToAbilities(role, user?.profile?.id)).flat();
    user.backAbility = new Ability(abilities);
    user.ability = abilities;
    return user;
};

export default provideAbility;
