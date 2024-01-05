import yup from '../lib/yup';

const labelSchema = yup.object({
    label: yup.string().required().label('Libellé')
});

export default labelSchema;
