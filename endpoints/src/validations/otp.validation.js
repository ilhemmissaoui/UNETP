import * as yup from 'yup';

export const otpSendSchema = yup.object({
    phoneNumber: yup
        .string()
        .transform((v) =>
            v
                ?.split(' ')
                .filter((e) => !!e?.trim().length)
                .join('')
                .replaceAll('x', '')
        )
        .length(10)
        .required()
        .label('numéro de téléphone ')
        .nullable()
});
export const otpVerifySchema = otpSendSchema.concat(
    yup.object({
        otp: yup.string().required()
    })
);
