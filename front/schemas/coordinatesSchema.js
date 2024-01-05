import yup from '../lib/yup';

const addressTypes = {
    particulier: 'Particulier',
    professionnel: 'Professionnel'
};
export const coordinateSchema = yup.object({
    countryId: yup.string().label('Pays').nullable(),
    label: yup.string().required().label('Libellé').nullable(),
    phoneNumber: yup
        .string()
        .transform((v) =>
            v
                ? v
                      .split('')
                      .filter((e) => !!e?.trim().length)
                      .join('')
                      .replaceAll('x', '')
                : undefined
        )
        .length(10)
        .label('numéro de téléphone')
        .nullable(),

    fax: yup.string().label('Fax').nullable(),
    mobileNumber: yup
        .string()
        .transform((v) =>
            v
                ? v
                      .split(' ')
                      .filter((e) => !!e?.trim().length)
                      .join('')
                      .replaceAll('x', '')
                : undefined
        )
        .length(10)
        .label('numéro de téléphone')
        .nullable(),

    email: yup.string().email().label('Email').nullable(),
    website: yup.string().label('Site web').nullable(),
    addressType: yup.string().required().oneOf(Object.keys(addressTypes)).nullable(),
    recipient: yup.string().label('Destinataire').nullable(),
    additionalRecipient: yup.string().label("Complément d'adresse").nullable(),
    addressLine1: yup.string().label('Escalier').nullable(),
    voiceNumber: yup.string().label('Numéro de voie').nullable(),
    voiceLabel: yup.string().label('Libellé de voie').nullable(),
    addressLine3: yup.string().label('Boite postale').nullable(),
    zipCode: yup.string().label('Code postal').nullable(),
    city: yup.string().label('Ville').nullable(),
    cedex: yup.string().label('Cedex').nullable()
});
export default coordinateSchema;
