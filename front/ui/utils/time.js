import moment from 'moment';
export const getCurrentYear = () =>
    moment().month() < 9
        ? `${moment().subtract(1, 'year').year()}-${moment().year()}`
        : `${moment().year()}-${moment().add(1, 'year').year()}`;
