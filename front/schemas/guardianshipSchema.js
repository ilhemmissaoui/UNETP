import yup from '../lib/yup';

const guardianshipSchema = yup.object({
    label: yup.string().required().label('Libellé')
});

export default guardianshipSchema;
