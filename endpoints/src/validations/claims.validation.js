import * as yup from 'yup';

import ClaimCategorys from '../models/ClaimCategory';

const claimSchema = yup.object({
    description: yup.string().required(),
    category: yup
        .string()
        .required()
        .test(
            'is-valid-type',
            'Type is invalid',
            async (_id) => !!(await ClaimCategorys.findOne({ _id }))
        )
});
export const claimTypeSchema = yup.object({
    title: yup.string().required()
});
export default claimSchema;
