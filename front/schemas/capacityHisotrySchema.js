import yup from '../lib/yup';

export const capacityEntryDefaultSchema = yup.object({
    id: yup.string(),
    year: yup
        .string()
        .required()
        .label('Année')
        .matches(/^\d{4}-\d{4}$/, "Format d'année non valide")
        .test('isYear', "veuillez entrer un intervalle d'un an", (value) => {
            if (value) {
                const years = value?.split('-');
                const firstYear = parseInt(years[0]);
                const lastYear = parseInt(years[1]);
                return years ? lastYear - firstYear === 1 : false;
            }
        })
        .test('isDuplicatedYear', 'Cette année existe déjà', function (value) {
            const { from } = this;

            const { capacityHistories } = from[1]?.value || {};

            const unique = capacityHistories?.find((e) => e.year === value);

            return unique ? true : false;
        })
});

export const capacityEntryEditSchema = yup.lazy((v) => {
    switch (v?.keyForm) {
        case '0':
            return yup
                .object({
                    collegeContractStudentsCount: yup
                        .number()
                        .transform((v) => (Number.isNaN(v) ? undefined : v))
                        .label('Collège'),
                    lpContractStudentsCount: yup
                        .number()
                        .transform((v) => (Number.isNaN(v) ? undefined : v))
                        .label('LP'),
                    lgtContractStudentsCount: yup
                        .number()
                        .transform((v) => (Number.isNaN(v) ? undefined : v))
                        .label('LGT'),
                    btsContractStudentsCount: yup
                        .number()
                        .transform((v) => (Number.isNaN(v) ? undefined : v))
                        .label('BTS'),
                    supContractStudentsCount: yup
                        .number()
                        .transform((v) => (Number.isNaN(v) ? undefined : v))
                        .label('Sup + CPGE')
                })
                .concat(capacityEntryDefaultSchema);
        case '1':
            return yup
                .object({
                    cfaUfaApprenticesCount: yup
                        .number()
                        .transform((v) => (Number.isNaN(v) ? undefined : v))
                        .label('CFA/UFA')
                })
                .concat(capacityEntryDefaultSchema);
        case '2':
            return yup
                .object({
                    cfpCfcInternsHoursCount: yup
                        .number()
                        .transform((v) => (Number.isNaN(v) ? undefined : v))
                        .label('CFP/CFC')
                })
                .concat(capacityEntryDefaultSchema);
        case '3':
            return yup
                .object({
                    cfaUfaApprenticesCount: yup
                        .number()
                        .transform((v) => (Number.isNaN(v) ? undefined : v))
                        .label('CFA/UFA')
                })
                .concat(capacityEntryDefaultSchema);
        case '4':
            return yup
                .object({
                    cfpCfcInternsHoursCount: yup
                        .number()
                        .transform((v) => (Number.isNaN(v) ? undefined : v))
                        .label('CFP/CFC')
                })
                .concat(capacityEntryDefaultSchema);
        default:
            return capacityEntryDefaultSchema;
    }
});

export const multipleCapacityHistory = yup.object({
    capacityHistories: yup.array().of(capacityEntryEditSchema).min(1)
});
export default capacityEntryEditSchema;
