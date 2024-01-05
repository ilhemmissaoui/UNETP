import yup from '../lib/yup';

const requestSchema = yup.object({
    label: yup.string().required().label('Libellé de la requête'),
    result: yup.string().required().label('Résultats'),
    request: yup.string().required().label('Requête HQL')
});

export default requestSchema;
