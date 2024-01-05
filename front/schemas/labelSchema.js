import yup from '../lib/yup';

const labelSchema = yup.object({
    label: yup.string().label('Libellé')
});

export default labelSchema;
