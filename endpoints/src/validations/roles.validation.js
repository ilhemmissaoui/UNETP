import * as yup from 'yup';

const roleSchema = yup.object({
    name: yup.string().required(),
    permissions: yup.array(
        yup.object({
            subject: yup.string().required(),
            read: yup.boolean().required(),
            write: yup.boolean().required(),
            create: yup.boolean().required()
        })
    )
});

export default roleSchema;
