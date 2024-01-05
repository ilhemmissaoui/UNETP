import yup from '../lib/yup';

const reminderSchema = yup.object({
    from: yup.string().email().label("E-mail de l'expéditeur").required(),
    label: yup.string().required().label("Nom de l'expéditeur"),
    subject: yup.string().required().label('Sujet'),
    model: yup.string().required().label('message')
});

export default reminderSchema;
