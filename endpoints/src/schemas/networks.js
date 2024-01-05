import yup from '../lib/yup';
import coordinateSchema from './shared/coordinate';
import functionSchema from './shared/function';
import historySchema from './shared/history';

export const relationships = {
    'membre adhérent': 'Membre adhérent',
    'membre associé': 'Membre associé',
    'membre correspondant': 'Membre correspondant',
    extérieur: 'Extérieur',
    nc: 'N/C'
};
export const establishmentSchema = yup.lazy((value) => {
    if (value.mode === 'search' || typeof value?.id !== 'undefined') {
        return yup.object({
            id: yup
                .number()
                .transform((v, o) => (typeof o === 'number' ? o : o?.value))
                .required()
                .label('Établissement'),
            networkId: yup.string()
        });
    }
    return yup.object({
        establishmentKey: yup.string().required().label('Clé'),
        establishmentNumber: yup.string().required().label('Numéro'),
        organization: yup.object({
            name: yup.string().required().label('Nom')
        })
    });
});
export const globalInfoSchema = yup.object({
    organization: yup.object({
        name: yup.string().label('Nom du réseau').required(),
        description: yup.string().label('Description'),
        coordinates: yup.array(coordinateSchema).required().default([])
    }),
    createdAt: yup
        .date()
        .label('Date de création')
        .transform((e) => {
            const date = new Date(e);
            return date instanceof Date && !Number.isNaN(date) ? date : undefined;
        }),

    establishments: yup.array(establishmentSchema).required().default([])
});
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

export const networkSchemas = [globalInfoSchema, functionsSchema, historiesSchema];
const networkSchema = networkSchemas?.reduce((acc, cv) => acc.concat(cv), yup.object());
export default networkSchema;
