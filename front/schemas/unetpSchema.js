import yup from '../lib/yup';
import { coordinateSchema } from './coordinatesSchema';
import functionSchema from './globalFunctionSchema';
import { historySchema } from './historySchema';
export const nameSchema = yup.object({
    name: yup.string().required().label('Nom')
});

export const globalInfoSchema = yup
    .object({
        coordinates: yup.array(coordinateSchema).required().default([])
    })
    .concat(nameSchema);
export const functionsSchema = yup.object({
    organization: yup.object({
        functions: yup.array(functionSchema).required().label('Fonction').default([])
    })
});

export const historiesSchema = yup.object({
    organization: yup.object({
        histories: yup.array(historySchema).required().label('Historique').default([])
    })
});

export const unetpSchemas = [globalInfoSchema, functionsSchema, historiesSchema];
const unetpSchema = unetpSchemas?.reduce((acc, cv) => acc.concat(cv), yup.object());
export default unetpSchema;
