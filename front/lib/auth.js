import { Ability } from '@casl/ability';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { createContext, useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import useToast from '../hooks/use-toast';
import settings from '../settings';
import { AbilityContext } from './ability';

export const AuthContext = createContext();

const { endpointUrl } = settings;
const defaultSettings = {
    prefix: 'unt_'
};
const Auth = ({ children, settings = defaultSettings }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const { setToast } = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState();
    const { push, pathname } = useRouter();
    const { prefix } = settings;
    const withPrefix = (key) => `${prefix}${key}`;

    const setGlobalToken = (token) => {
        axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`
        };
    };

    const logout = (withToast = true) => {
        push('/login').then(() => {
            setIsAuthenticated(false);
            axios.defaults.headers.common = {};
            delete localStorage[withPrefix('tokens')];
            setLoading(true);
            setUser();
            setToken();
            setLoading(false);
            if (withToast)
                setToast({
                    message: 'Vous avez été déconnecté(e) avec succès',
                    variant: 'success'
                });
        });
    };
    const gatherUserInfo = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/auth/me`);
            setUser(data);
            setIsAuthenticated(true);
            if (pathname === '/login') await push(`/`);
        } catch (e) {
            delete localStorage[withPrefix('token')];
            setToast({
                message: 'Votre session a expiré. Veuillez vous reconnecter',
                variant: 'warning'
            });
            await push('/login');
        }
    };
    useEffect(() => {
        const authenticate = async () => {
            if (typeof window !== 'undefined') {
                const tokens = localStorage[withPrefix('tokens')];
                if (tokens?.length) {
                    const { access } = JSON.parse(tokens);
                    try {
                        setGlobalToken(access?.token);
                        setToken(access?.token);
                        await gatherUserInfo();
                    } catch (e) {
                        delete localStorage[withPrefix('tokens')];
                        setUser();
                        setToken();
                        await push('/login');
                        setLoading(false);
                    }
                } else {
                    if (!['/login', '/forgot-password'].includes(pathname)) await push('/login');
                }
                setLoading(false);
            }
        };
        authenticate();
    }, []);
    const login = async ({ username, password }) => {
        try {
            const { data } = await axios.post(`${endpointUrl}/auth/login`, {
                username,
                password
            });
            localStorage[withPrefix('tokens')] = JSON.stringify(data?.tokens);
            setGlobalToken(data?.tokens?.access?.token);
            setLoading(true);
            setUser(data?.user);
            setLoading(false);
            setIsAuthenticated(true);
        } catch (e) {
            console.error(e);
            throw e;
        }
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                isAuthenticated,
                loading,
                logout,
                gatherUserInfo
            }}>
            <AbilityContext.Provider value={new Ability(user?.ability || [])}>
                {!loading ? (
                    children
                ) : (
                    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                        <Spinner animation="grow">
                            <span className="visually-hidden">Chargement...</span>
                        </Spinner>
                    </div>
                )}
            </AbilityContext.Provider>
        </AuthContext.Provider>
    );
};

export default Auth;
