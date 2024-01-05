import moment from 'moment';

import Badge from './Badge';
const DateTimeFormat = ({ variant = 'light', size = 'lg', data, isDateTime = false }) => {
    return (
        <div className="fw-bolder">
            <Badge
                variant={variant}
                size={size}
                data={
                    data ? moment(data).format(isDateTime ? 'YYYY/MM/DD  HH:mm' : 'YYYY/MM/DD') : ''
                }
            />{' '}
        </div>
    );
};
export default DateTimeFormat;
