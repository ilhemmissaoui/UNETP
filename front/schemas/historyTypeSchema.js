import yup from '../lib/yup';

const historyTypeSchema = yup.object({
    label: yup.string().required().label('Libellé'),
    description: yup.string().label('Description')
});

export default historyTypeSchema;
