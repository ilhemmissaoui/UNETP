import axios from 'axios';

import yup from '../lib/yup';
import settings from '../settings';
import coordinateSchema from './coordinatesSchema';
import { functionSchema } from './globalFunctionSchema';
import { historySchema } from './historySchema';
const { endpointUrl } = settings;

export const usersSchema = yup.object({
    users: yup.array().of(functionSchema.clone())
});
export const globalInfoSchema = yup.object({
    reference: yup.string().label('référence'),
    coordinates: yup.array().of(coordinateSchema.clone()),
    delegationName: yup
        .string()
        .required()
        .label('Nom de la délégation')
        .test('isDuplicatedName', 'ce nom est pris', async function (value) {
            if (value) {
                let hasDuplicates = true;
                const { data } = await axios.get(
                    `${endpointUrl}/delegations/availability/by-name/${encodeURIComponent(
                        value
                    )}?exclude=${this.parent.organizationId}`
                );
                if (data?.data?.isAvailable) {
                    return hasDuplicates;
                } else {
                    return !hasDuplicates;
                }
            }
        })
});

const relationshipMap = {
    'membre adhérent': 'membre adhérent',
    'membre associé': 'membre associé',
    'membre correspondant': 'membre correspondant',
    extérieur: 'extérieur',
    nc: 'nc'
};
export const archiveOptions = {
    with: 'Inclure les archives',
    without: 'Sans les archives',
    exclusive: 'Afficher seulement les archives'
};

const filterById = yup
    .number()
    .transform((value, originalValue) => (originalValue === 'all' ? undefined : value));
export const filtersSchema = yup.object({
    department: yup.string(),
    organizationType: filterById,
    functionLabel: filterById,
    relationship: yup
        .string()
        .transform((v) => relationshipMap[v])
        .nullable()
    //  isArchived: yup.mixed().transform((v) => archiveOptionsMap[v]) @TODO: fix
});
export const historiesSchema = yup.object({
    histories: yup.array().of(historySchema.clone())
});
export const delegationSchemas = [globalInfoSchema, usersSchema, historiesSchema];
const delegationSchema = delegationSchemas?.reduce((acc, cv) => acc.concat(cv), yup.object());
export default delegationSchema;
