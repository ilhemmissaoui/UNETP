import * as yup from 'yup';

import timeZones from './time_zones_list.json';
const languages = {
    fr: 'French',
    en: 'English',
    ar: 'Arabic'
};
const themes = {
    dark: 'Dark',
    light: 'Light'
};

const settingsSchema = yup.object({
    timezone: yup
        .string()
        .required()
        .oneOf(timeZones.map((e) => e.tzCode))
});
export const adminSettingsSchema = yup.object({
    timezone: yup
        .string()
        .required()
        .oneOf(timeZones.map((e) => e.tzCode)),
    language: yup.string().required().oneOf(Object.keys(languages)),
    theme: yup.string().required().oneOf(Object.keys(themes))
});

export default settingsSchema;
