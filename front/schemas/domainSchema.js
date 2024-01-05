import yup from '../lib/yup';

const domainSchema = yup.object({
    label: yup.string().required().label('Libellé'),
    code: yup.string().required().label('Code')
});
export default domainSchema;
