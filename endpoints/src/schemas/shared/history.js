import yup from '../../lib/yup';

export const historySchema = yup.object({
    id: yup.number(),
    userId: yup.string().nullable(),
    historyIdType: yup.string().required().label('Type'),
    label: yup.string().required().label('Libellé'),
    date: yup.date().transform((v) => (typeof v === 'undefined' ? null : v)),
    startDate: yup
        .date()
        .label('Date de début')
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
        .transform((v) => (typeof v === 'undefined' ? null : v)),

    endDate: yup
        .date()
        .label('Date de fin')
        .test(
            'isSuperior',
            'La date de fin doit être supérieure ou égale  à la date de début',
            function (v) {
                const startDate = this.parent.startDate;
                if (typeof startDate === 'undefined' || typeof v === 'undefined') {
                    return true;
                } else {
                    return v >= startDate;
                }
            }
        )
        .transform((v) => (typeof v === 'undefined' ? null : v)),
    comment: yup.string().label('Comentaire UNETP').nullable()
});

export default historySchema;
