import yup from '../lib/yup';

const productSchema = yup.object().shape({
    name: yup.string().required().label('Nom'),
    price: yup.number().positive().required().label('Prix')
});

export default productSchema;
