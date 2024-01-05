import yup from '../lib/yup';

export const status = {
    'Solde initial': 'Solde initial',
    'Solde partiel': 'Solde partiel',
    'Solde négatif (trop perçu)': 'Solde négatif (trop perçu)',
    Soldé: 'Soldé',
    Validé: 'Validé'
};
export const paymentMethods = ['Carte bancaire', 'Chèque', 'Virement'];

export const amountSchema = yup.object({
    customAmount: yup
        .number()
        .label('Montant personnalisé')
        .transform((v) => (isNaN(v) ? undefined : v))
});
export const paymentSchema = yup.object({
    id: yup.string(),
    reference: yup.string().label('Référence'),
    paimentType: yup
        .string()
        .oneOf(paymentMethods)
        .transform((v) => (v === '0' ? undefined : v))
        .required()
        .label('Mode de paiement'),
    depositDate: yup.date().required().label('Date de dépot'),

    cashedDate: yup.string().label("Date d'encaissement"),

    enitiesPayments: yup.array(
        yup.object({
            paymentId: yup.number(),
            type: yup.string().oneOf(['user', 'organization']),
            id: yup.string(),
            amount: yup
                .number()
                .label('Versement')
                .transform((v) => (isNaN(v) ? undefined : v))
        })
    ),

    comment: yup.string().label('Commentaire')
});

export const establishmentSubscriptionFee = yup
    .object({
        id: yup.string().required(),
        status: yup.string().required().label('statut').oneOf(Object.keys(status)),
        paymnets: yup.array(paymentSchema)
    })
    .concat(amountSchema);
export const requestPaymentSchema = yup.array().of(yup.string());

export default establishmentSubscriptionFee;
