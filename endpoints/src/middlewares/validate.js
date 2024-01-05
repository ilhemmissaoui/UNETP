import httpStatus from 'http-status-codes';
import * as yup from 'yup';

import ApiError from '../utils/apiError';
import pick from '../utils/pick';

const validate = (schema) => async (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    let value;
    try {
        yup.object(validSchema).validateSync(object);
    } catch (e) {
        return next(new ApiError(httpStatus.BAD_REQUEST, e?.message));
    }
    Object.assign(req, value);
    return next();
};

export default validate;
