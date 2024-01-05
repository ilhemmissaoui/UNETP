import { useContext } from 'react';

import { AuthContext } from '../lib/auth';

const useAuth = () => {
    const { user, token, login, loginAsAdmin, isAuthenticated, loading, logout, gatherUserInfo } =
        useContext(AuthContext);
    return { user, token, login, loginAsAdmin, isAuthenticated, loading, logout, gatherUserInfo };
};

export default useAuth;
