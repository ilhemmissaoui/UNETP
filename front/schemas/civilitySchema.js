import yup from '../lib/yup';

export const genders = {
    M: 'Masculin',
    F: 'Féminin',
    Mixte: 'Mixte'
};

const civilitySchema = yup.object({
    name: yup.string().required().label('Nom'),
    abbreviation: yup.string().required().label('Abbreviation'),
    gender: yup.string().required().oneOf(Object.keys(genders)).label('Genre'),
    rank: yup
        .number()
        .required()
        .label('Ordre')
        .transform((v) => (Number.isNaN(v) ? undefined : v))
});

export default civilitySchema;
