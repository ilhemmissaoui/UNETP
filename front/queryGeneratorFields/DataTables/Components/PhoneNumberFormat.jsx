import NumberFormat from 'react-number-format';
const PhoneNumberFormat = ({ data }) => (
    <NumberFormat displayType="text" format="## ## ## ## ##" value={data ? data : '-'} />
);
export default PhoneNumberFormat;
