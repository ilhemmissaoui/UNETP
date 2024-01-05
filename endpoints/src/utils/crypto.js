import crypto from 'crypto';

const signKey = function (clientKey, message) {
    var hash = crypto.createHmac('sha256', clientKey).update(message).digest('base64');
    return hash;
};
export const calculateSystemPaySignature = ({ fields, key }) => {
    const sortedValues = Object.keys(fields)
        .sort()
        .map((e) => fields[e])
        .join('+');
    return signKey(key, `${sortedValues}+${key}`);
};
