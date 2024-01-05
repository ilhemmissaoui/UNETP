import moment from 'moment';

const Period = ({ startDate, endDate, date }) => {
    if (date) {
        return (
            <span className="badge badge-light fw-bolder">
                <span className="me-1">Date: </span> {moment(date)?.format('DD/MM/YYYY')}
            </span>
        );
    } else {
        return (
            <span className="badge badge-light fw-bolder">
                {startDate && (
                    <>
                        <span className="me-1">Date début:</span>{' '}
                        {moment(startDate)?.format('DD/MM/YYYY')}
                    </>
                )}
                {startDate && endDate && <span className="mx-2"> - </span>}
                {endDate && (
                    <>
                        <span className="me-1">Date fin:</span>{' '}
                        {moment(endDate)?.format('DD/MM/YYYY')}
                    </>
                )}
            </span>
        );
    }
};

export default Period;
