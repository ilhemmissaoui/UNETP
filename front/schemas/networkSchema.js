import axios from 'axios';
import moment from 'moment';

import yup from '../lib/yup';
import functionSchema from './globalFunctionSchema';
import { historySchema } from './historySchema';
export const relationships = {
    'membre adhérent': 'Membre adhérent',
    'membre associé': 'Membre associé',
    'membre correspondant': 'Membre correspondant',
    extérieur: 'Extérieur',
    nc: 'N/C'
};
import settings from '../settings';

const { endpointUrl } = settings;

const addressTypes = {
    particulier: 'Particulier',
    professionnel: 'Professionnel'
};
const establishmentKeyEndings = ['0', '1', '2', '3', '4'];

export const establishmentSchema = yup.lazy((value) => {
    console.log(value);
    if (value.mode === 'search') {
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
        id: yup.string().strip(),
        establishmentKey: yup
            .string()
            .required()
            .label("Clé de la structure d'établissement")
            .test('isDuplicatedKey', 'ce clé est pris', async function (value) {
                if (value) {
                    let hasDuplicates = true;
                    const { data } = await axios.get(
                        `${endpointUrl}/establishments/availability/by-key/${encodeURIComponent(
                            value
                        )}?exclude=${this.parent.id}`
                    );
                    if (data?.data?.isAvailable) {
                        return hasDuplicates;
                    } else {
                        return !hasDuplicates;
                    }
                }
            })
            .test(
                'endsWithExistingNumber',
                "la clé d'établissement doit se terminer par 0,1,2,3,4 ",
                (v) => {
                    return establishmentKeyEndings.includes(v?.charAt(v.length - 1));
                }
            ),
        establishmentNumber: yup.string().required().label("N° de la structure d'établissement"),
        organization: yup.object({
            name: yup.string().required().label('Nom')
        })
    });
});

export const coordinateSchema = yup.object({
    countryId: yup.string(),
    label: yup.string().required().label('Libellé'),
    phoneNumber: yup
        .string()
        .transform((v) =>
            v
                ? v
                      ?.split(' ')
                      .filter((e) => !!e?.trim().length)
                      .join('')
                      .replaceAll('x', '')
                : undefined
        )
        .length(10)
        .label('numéro de téléphone ')
        .nullable(),

    fax: yup.string().label('Fax'),
    mobileNumber: yup
        .string()
        .transform((v) =>
            v
                ? v
                      ?.split(' ')
                      .filter((e) => !!e?.trim().length)
                      .join('')
                      .replaceAll('x', '')
                : undefined
        )
        .length(10)
        .label('numéro de téléphone ')
        .nullable(),
    email: yup.string().email().label('Email'),
    website: yup.string().label('Site web'),
    addressType: yup.string().required().oneOf(Object.keys(addressTypes)).label('Particulier'),
    recipient: yup.string().label('Destinataire'),
    additionalRecipient: yup.string().label("Complément d'adresse"),
    addressLine1: yup.string().label('Escalier'),
    voiceNumber: yup.string().label('Numéro de voie'),
    voiceLabel: yup.string().label('Libellé de voie'),
    addressLine3: yup.string().label('Boite postale'),
    zipCode: yup.string().label('Code postal'),
    city: yup.string().label('Ville'),
    cedex: yup.string().label('Cedex')
});

export const globalInfoSchema = yup.object({
    organization: yup.object({
        name: yup
            .string()
            .required()
            .label('Nom du réseau')
            .test('isDuplicatedName', 'ce nom est pris', async function (value) {
                if (value) {
                    let hasDuplicates = true;
                    const { data } = await axios.get(
                        `${endpointUrl}/networks/availability/by-name/${encodeURIComponent(
                            value
                        )}?exclude=${this.parent.id}`
                    );
                    if (data?.data?.isAvailable) {
                        return hasDuplicates;
                    } else {
                        return !hasDuplicates;
                    }
                }
            }),
        description: yup.string().label('Description'),
        coordinates: yup.array(coordinateSchema).required().default([])
    }),
    createdAt: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        })
        .label('Date de création'),
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
