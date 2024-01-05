import yup from '../lib/yup';

const typeSchema = yup.object({
    name: yup.string().required().label('Libellé'),
    code: yup.number().required().label('Code')
});

export default typeSchema;
