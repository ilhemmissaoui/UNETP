import moment from 'moment';
export const getCurrentYear = () =>
    moment().month() < 9
        ? `${moment().subtract(1, 'year').year()}-${moment().year()}`
        : `${moment().year()}-${moment().add(1, 'year').year()}`;

export const getLastThreeYears = () => {
    const currentDate = moment();
    let currentYear, secondYear, thirdYear;
    if (currentDate.month() < 9) {
        currentYear = `${moment().subtract(1, 'year').year()}-${moment().year()}`;
        secondYear = `${moment().subtract(2, 'year').year()}-${moment()
            .subtract(1, 'year')
            .year()}`;
        thirdYear = `${moment().subtract(3, 'year').year()}-${moment().subtract(2, 'year').year()}`;
    } else {
        currentYear = `${moment().year()}-${moment().add(1, 'year').year()}`;
        secondYear = `${moment().subtract(1, 'year').year()}-${moment().year()}`;
        thirdYear = `${moment().subtract(2, 'year').year()}-${moment().subtract(1, 'year').year()}`;
    }
    return [currentYear, secondYear, thirdYear];
};
