import yup from '../lib/yup';

const paymentsSchema = yup.object({
    suscriptionFeesIncluded: yup
        .array()
        .of(yup.string().required())
        .min(1)
        .required()
        .label('cotisation'),
    paymentMethod: yup.string().required().label('mode de paiement')
});
export const transferPaymentSchema = yup.object({
    confirm: yup
        .bool()
        .transform((v) => (v ? v : undefined))
        .required('Veuillez cocher la case de confirmation au préalable.')
});

export default paymentsSchema;
