import yup from '../lib/yup';

const requestSchema = yup.object({
    label: yup.string().required().label('Libellé de la requête'),
    request: yup.string().required().label('Requête SQL'),
    mode: yup.string().label('Mode'),
    tree: yup.string().label('tree'),
    fieldSelected: yup
        .array()
        .required()
        .of(yup.string().transform((v) => (typeof v === 'string' ? v : v?.value)))
        .label('')
        .default(['*'])
});

export default requestSchema;
