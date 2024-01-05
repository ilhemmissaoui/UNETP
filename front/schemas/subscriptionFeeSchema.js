import moment from 'moment';

import yup from '../lib/yup';
export const archiveOptions = {
    0: 'Sans les archives',
    1: 'Afficher seulement les archives',
    '': 'Inclure les archives'
};

export const status = {
    'Solde initial': 'Solde initial',
    'Solde partiel': 'Solde partiel',
    'Solde négatif (trop perçu)': 'Solde négatif (trop perçu)',
    Soldé: 'Soldé',
    Validé: 'Validé'
};
export const paymentMethods = {
    creditCard: 'Carte bancaire',
    transfert: 'Virement',
    cheque: 'Chèque'
};

export const filterSubscriptionFeesSchema = yup.object({
    year: yup.string().required().label('Année'),
    status: yup.lazy((value) =>
        value === '' ? yup.string().strip() : yup.string().label('Statut')
    ),
    archived: yup.lazy((value) =>
        value === '' ? yup.string().strip() : yup.string().label('Archives')
    )
});
export const establishmentSearchSchema = yup.object({
    establishmentNumber: yup
        .string()
        .matches(/^\d{6}$/, "Le format de N° d'établissement n'est pas valide")
        .required()
        .label("N° d'établissement")
});
export const annualSubscriptionSchema = yup.object({
    establishmentNumber: yup.string().required().label("Numéro d'etabissement")
});
export const paymentSchema = yup.object({
    id: yup.string(),
    reference: yup.string().label('Référence'),
    paimentType: yup
        .string()
        .oneOf(Object.values(paymentMethods))
        .transform((v) => (v === '0' ? undefined : v))
        .required()
        .label('Mode de paiement'),
    depositDate: yup
        .date()
        .required()
        .label('Date de dépot')
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        }),
    cashedDate: yup
        .date()
        .label("Date d'encaissement")
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        }),
    enitiesPayments: yup.array(
        yup.object({
            paymentId: yup.number(),
            type: yup.string().oneOf(['user', 'organization']),
            paymentRefId: yup.number(),
            subscriptionId: yup.number(),
            amount: yup
                .number()
                .label('Versement')
                .transform((v) => (isNaN(v) ? undefined : v))
        })
    ),

    comment: yup.string().label('Commentaire')
});

export const amountSchema = yup.object({
    customAmount: yup
        .number()
        .label('Montant personnalisé')
        .transform((v) => (isNaN(v) ? undefined : v))
});
export const establishmentSubscriptionFee = yup
    .object({
        id: yup.string().required(),
        status: yup.string().required().label('statut').oneOf(Object.keys(status)),
        payments: yup.array(paymentSchema.clone())
    })
    .concat(amountSchema);
const subscriptionFeeSchema = annualSubscriptionSchema.concat(filterSubscriptionFeesSchema);

export default subscriptionFeeSchema;
