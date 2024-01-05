import yup from '../lib/yup';

const GuardianshipSchema = yup.object({
    label: yup.string().required().label('Libellé')
});

export default GuardianshipSchema;
