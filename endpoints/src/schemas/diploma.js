import yup from '../lib/yup';

export const diplomaTypeSchema = yup.object({
    label: yup.string().required().label('Libellé'),
    code: yup.string().required().label('Code')
});

export const diplomaFunctionSchema = yup.object({
    label: yup.string().required().label('Libellé'),
    code: yup.string().required().label('Code')
});

export const diplomaDomainSchema = yup.object({
    label: yup.string().required().label('Libellé'),
    code: yup.string().required().label('Code')
});

export const diplomaGroupSchema = yup.object({
    label: yup.string().required().label('Libellé'),
    code: yup.string().required().label('Code')
});

export const diplomaSubGroupSchema = yup.object({
    label: yup.string().required().label('Libellé'),
    code: yup.string().required().label('Code')
});
export const diplomaGradeSchema = yup.object({
    label: yup.string().required().label('Libellé'),
    code: yup.string().required().label('Code')
});

export const diplomaSpecialtySchema = yup.object({
    label: yup.string().required().label('Libellé'),
    code: yup.string().required().label('Code')
});
