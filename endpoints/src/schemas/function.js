import yup from '../lib/yup';

const functionSchema = yup.object({
    name: yup.string().required().label('Libellé'),
    code: yup.number().required().label('Code')
});

export default functionSchema;
