import yup from '../lib/yup';

const requestSchema = yup.object({
    label: yup.string().required().label('Libellé de la requête'),
    request: yup.string().required().label('Requête HQL'),
    mode: yup.string().label('Mode'),
    tree: yup.string().label('tree'),
    fieldSelected: yup.array().required().of(yup.string()).label('').default(['*'])
});

export default requestSchema;
