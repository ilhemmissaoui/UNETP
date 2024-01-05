import { useRouter } from 'next/router';

import { Can } from '../../../lib/ability';
import NotFound from '../../../pages/404';
export const Ability = ({ children, fallback: FallBack, ...props }) => {
    return (
        <Can passThrough {...props}>
            {(allowed) => (allowed ? children : FallBack ? <FallBack /> : null)}
        </Can>
    );
};

const withAbility = (Component, ability) => (props) => {
    const { query } = useRouter();
    return (
        <Ability fallback={NotFound} {...(typeof ability == 'function' ? ability(query) : ability)}>
            <Component {...props} />
        </Ability>
    );
};
export default withAbility;
