import Badge from './Badge';
const BooleanFormat = ({ size = 'sm', data }) => {
    const variant = data ? 'light-success' : 'light-danger';
    return <Badge variant={variant} size={size} data={data ? `oui` : `non`} />;
};
export default BooleanFormat;
