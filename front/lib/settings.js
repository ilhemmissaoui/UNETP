import axios from 'axios';
import React, { createContext, useState } from 'react';

import useToast from '../hooks/use-toast';
import settings from '../settings';

export const SettingsContext = createContext();

const { endpointUrl } = settings;
const Settings = ({ children }) => {
    const [settings, setSettings] = useState();
    const { setToast } = useToast();
    const fetchSettings = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/settings/global`);
            setSettings(data);
        } catch (e) {
            setToast({ message: 'Error while retreving global settings', variant: 'danger' });
        }
    };
    /*     useEffect(() => {
        fetchSettings();
    }, []); */
    return (
        <SettingsContext.Provider value={{ settings, refetch: fetchSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export default Settings;
