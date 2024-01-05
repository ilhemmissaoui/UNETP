import yup from '../lib/yup';

const ojecSchema = yup.lazy(() => {
    return yup.object({
        ogecName: yup.string().required().label('Nom').nullable(),
        ogecAddress: yup.string().required().label('Code postale').nullable(),
        ogecPhoneNumber: yup
            .string()
            .transform((v) =>
                v
                    ?.split(' ')
                    .filter((e) => !!e?.trim().length)
                    .join('')
                    .replaceAll('x', '')
            )
            .length(10)
            .required()
            .label('Numéro de téléphone')
            .nullable(),
        ogecEmail: yup.string().email().label('E-mail').required().nullable(),
        ogecCity: yup.string().label('Ville').required().nullable(),
        establishmentId: yup.string().required().label('établissement')
    });
});

export default ojecSchema;
