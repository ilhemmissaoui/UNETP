import yup from '../lib/yup';

export const SearchPredefinedSchema = yup.object({
    request: yup.string().required().label('requête')
});
