import yup from '../lib/yup';

export const SearchTrashSchema = yup.object({
    elementType: yup.string().label("types d'éléments").required(),
    name: yup.string().label('nom')
});
