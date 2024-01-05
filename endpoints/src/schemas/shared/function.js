import yup from '../../lib/yup';

export const userSchema = yup.lazy((value) => {
    if (value.mode === 'search' || typeof value?.id !== 'undefined') {
        return yup.object({
            id: yup.string().required().label('Nom')
        });
    }
    return yup.object({
        civilityId: yup.string().required().label('Civilité'),
        firstName: yup.string().required().label('Prénom'),
        lastName: yup.string().required().label('Nom')
    });
});
export const functionSchema = yup.object({
    id: yup.number(),
    labelId: yup.string().required().label('Fonction'),
    startDate: yup
        .date()
        .test(
            'is Inferior',
            'La date de début doit être inférieure ou égale à la date de fin',
            function (v) {
                const endDate = this.parent.endDate;
                if (typeof endDate === 'undefined' || typeof v === 'undefined') {
                    return true;
                } else {
                    return v <= endDate;
                }
            }
        )
        .label('Date de début'),
    endDate: yup
        .date()
        .test(
            'isSuperior',
            'La date de fin doit être supérieure ou égale  à la date de début',
            function (v) {
                console.log('parent =====>', this);
                const startDate = this.parent.startDate;
                if (typeof startDate === 'undefined' || typeof v === 'undefined') {
                    return true;
                } else {
                    return v >= startDate;
                }
            }
        )
        .label('Date de fin'),
    comment: yup.string().label('Commentaire UNETP').nullable(),
    user: userSchema
});
export default functionSchema;
