import yup from '../lib/yup';

const pensionSchema = yup.object({
    label: yup.string().required().label('Libellé')
});

export default pensionSchema;
