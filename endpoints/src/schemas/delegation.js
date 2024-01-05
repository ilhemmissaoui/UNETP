import yup from '../lib/yup';
import { coordinateSchema } from './shared/coordinate';
import { functionSchema } from './shared/function';
import { historySchema } from './shared/history';

export const usersSchema = yup.object({
    users: yup.array().of(functionSchema.clone()).default([])
});
export const globalInfoSchema = yup.object({
    delegationName: yup.string().required().label('Nom de la délégation'),
    reference: yup.string().label('référence'),
    coordinates: yup.array().of(coordinateSchema.clone()).default([])
});

export const archiveOptions = {
    with: 'Inclure les archives',
    without: 'Sans les archives',
    exclusive: 'Afficher seulement les archives'
};

const filterById = yup.number();
export const filtersSchema = yup.object({
    department: yup.string(),
    organizationType: filterById,
    functionLabel: filterById,
    relationship: yup.string().nullable()
});
export const historiesSchema = yup.object({
    histories: yup.array().of(historySchema.clone()).default([])
});
export const delegationSchemas = [globalInfoSchema, usersSchema, historiesSchema];
const delegationSchema = delegationSchemas?.reduce((acc, cv) => acc.concat(cv), yup.object());
export default delegationSchema;
