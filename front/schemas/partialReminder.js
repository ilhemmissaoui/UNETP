import yup from '../lib/yup';

const partialReminderSchema = yup.object({
    recipient: yup.string().required().label('Destinataire'),
    subject: yup.string().required().label('Sujet'),
    partialModel: yup.string().required().label('message')
});

export default partialReminderSchema;
