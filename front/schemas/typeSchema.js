import yup from '../lib/yup';

const typeSchema = yup.object({
    label: yup.string().required().label('Libellé'),
    code: yup.string().required().label('Code')
});
export default typeSchema;
