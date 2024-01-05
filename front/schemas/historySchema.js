import moment from 'moment';

import yup from '../lib/yup';

export const historySchema = yup.object({
    historyIdType: yup.string().required().label('Type'),
    label: yup.string().required().label('Libellé'),
    date: yup.date().transform((e) => {
        const date = new Date(e);
        return moment(date).isValid() ? date : undefined;
    }),
    userId: yup.string().nullable(),
    startDate: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        })
        .label('Date de début'),
    endDate: yup
        .date()
        .transform((e) => {
            const date = new Date(e);
            return moment(date).isValid() ? date : undefined;
        })
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
        ),
    comment: yup.string().label('Comentaire UNETP').nullable()
});

export default historySchema;
