import yup from '../lib/yup';

const ojecSchema = yup.object({
    ogecName: yup.string().label('Nom').nullable(),
    ogecAddress: yup.string().label('Code postale').nullable(),
    ogecPhoneNumber: yup
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
        .label('Numéro de téléphone')
        .nullable(),
    ogecEmail: yup.string().email().label('E-mail').nullable(),
    ogecCity: yup.string().label('Ville').nullable(),
    establishmentId: yup.string().required().label('établissement')
});

export default ojecSchema;
