import * as yup from 'yup';

const contentSchema = yup.object({
    model: yup.string().required()
});

export default contentSchema;
