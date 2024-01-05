import * as yup from 'yup';

const bulkActionSchema = yup.object({
    ids: yup.array(yup.string().required()).required().min(1)
});

export default bulkActionSchema;
