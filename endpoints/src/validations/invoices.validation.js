import moment from 'moment';
import * as yup from 'yup';

const invoiceSchema = yup.object({
    organization: yup.string().required(),
    dueAt: yup
        .date()
        .min(new Date())
        .required()
        .default(() => moment().add(30, 'days').toDate()),
    amount: yup
        .number()
        .required()
        .positive()
        .transform((v) => (Number.isNaN(v) ? undefined : v))
});

export default invoiceSchema;
