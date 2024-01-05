import yup from '../lib/yup';

const academySchema = yup.object({
    name: yup.string().required().label('Nom')
});

export default academySchema;
