import moment from 'moment';

import yup from '../lib/yup';
export const userSchema = yup.lazy((value) => {
    if (value.mode === 'add') {
        return yup.object({
            civilityId: yup.string().required().label('Civilité'),
            firstName: yup.string().required().label('Prénom'),
            lastName: yup.string().required().label('Nom')
        });
    }
    return yup.object({
        id: yup
            .string()
            .transform((v) => {
                if (typeof v === 'object') {
                    return v?.value.toString();
                }
                return v;
            })
            .required()
            .label('Nom')
    });
});

export const functionBaseSchema = yup.object({
    labelId: yup.string().required().label('Fonction'),
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
        .label('Date de fin'),
    comment: yup.string().label('Commentaire UNETP').nullable()
});
export const functionSchema = yup
    .object({
        user: userSchema
    })
    .concat(functionBaseSchema)
    .test('isDuplicatedYear', 'Cette personne existe déjà', async function (v) {
        var test_bool = false;

        const { from } = this;

        const { users } = from[1]?.value || {};

        // const labelUnique = users?.find((e) => e.labelId === v?.labelId);
        // const userUnique = users?.find((e) => e.user?.id === v?.user?.id);

        var dates = [];

        users?.map((e) => {
            const start = e?.startDate;
            const end = e?.endDate;
            const formatStart = start ? moment(start).format('YYYY-MM-DD') : null;
            const formatEnd = end ? moment(end).format('YYYY-MM-DD') : null;
            dates.push({ formatStart, formatEnd });
        });

        const formatStartDate = v?.startDate ? moment(v?.startDate).format('YYYY-MM-DD') : null;
        const formatEndDate = v?.endDate ? moment(v?.endDate).format('YYYY-MM-DD') : null;
        const current_date = { formatStartDate, formatEndDate };

        if (current_date.formatStartDate && current_date.formatEndDate) {
            console.log('firssssssssst');
            dates.forEach((element) => {
                if (element.formatStart && element.formatEnd) {
                    console.log(element.formatStart, element.formatEnd);
                    if (
                        element?.formatStart == current_date?.formatStartDate &&
                        element?.formatEnd == current_date?.formatEndDate
                    ) {
                        console.log(current_date?.formatStartDate, current_date?.formatEndDate);
                        console.log('the first condition');
                        test_bool = true;
                        console.log(test_bool);
                    }
                }
                // else if (element?.formatStart) {
                //     var momentRange = require('moment-range');
                //     momentRange.extendMoment(moment);

                //     const range = moment.range(
                //         current_date?.formatStartDate,
                //         current_date?.formatEndDate
                //     );
                //     console.log('rangeeeee', range);
                //     if (range.contains(moment(element?.formatStart))) {
                //        console.log('the second condition');
                //         test_bool = true;
                //     }
                // } else {
                //     var momentRanges = require('moment-range');
                //     momentRanges.extendMoment(moment);
                //     const range = moment.range(
                //         current_date?.formatStartDate,
                //         current_date?.formatEndDate
                //     );
                //     if (range.contains(moment(element?.formatEnd))) {
                //         console.log('the third condition');

                //         test_bool = true;
                //     }
                // }
            });
        }
        //  else if (current_date.formatStartDate) {
        //     console.log('secondddddddd');
        //     dates.forEach((element) => {
        //         if (element.formatStart && element.formatEnd) {
        //             var momentRange = require('moment-range');
        //             momentRange.extendMoment(moment);

        //             const range = moment.range(element.formatStart, element.formatEnd);
        //             if (range.contains(moment(current_date.formatStartDate))) {
        //                 console.log('im  heeeeere');
        //                 test_bool = true;
        //             }
        //         } else if (element.formatStart) {
        //             if (current_date.formatStartDate == element.formatStart) {
        //                 console.log('im  heeeeere');

        //                 test_bool = true;
        //             }
        //         } else {
        //             if (current_date.formatStartDate == element.formatEnd) {
        //                 console.log('im  heeeeere');

        //                 test_bool = true;
        //             }
        //         }
        //     });
        // } else {
        //     console.log('thiiiiird');
        //     dates.forEach((element) => {
        //         if (element.formatStart && element.formatEnd) {
        //             var momentRange = require('moment-range');
        //             momentRange.extendMoment(moment);

        //             const range = moment.range(element.formatStart, element.formatEnd);
        //             if (range.contains(moment(current_date.formatEndDate))) {
        //                 console.log('im  heeeeere');

        //                 test_bool = true;
        //             }
        //         } else if (element.formatStart) {
        //             if (current_date.formatEndDate == element.formatStart) {
        //                 console.log('im  heeeeere');

        //                 test_bool = true;
        //             }
        //         } else {
        //             if (current_date.formatEndDate == element.formatEnd) {
        //                 console.log('im  heeeeere');

        //                 test_bool = true;
        //             }
        //         }
        //     });
        // }

        if (test_bool == true) {
            return false;
        } else {
            return true;
        }
    });

export default functionSchema;
