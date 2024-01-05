import * as yup from 'yup';

const positionSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required()
});

export default positionSchema;
