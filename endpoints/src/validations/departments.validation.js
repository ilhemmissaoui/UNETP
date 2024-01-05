import * as yup from 'yup';

const departmentSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required()
});

export default departmentSchema;
