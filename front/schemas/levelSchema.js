import yup from '../lib/yup';

const levelSchema = yup.object({
    label: yup.string().required().label('Libellé'),
    code: yup.string().required().label('Code')
});
export default levelSchema;
