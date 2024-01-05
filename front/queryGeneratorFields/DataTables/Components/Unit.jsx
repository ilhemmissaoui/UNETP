import Badge from './Badge';
const Unit = ({ size = 'sm', data, unit, variant }) => {
    return <Badge variant={variant} size={size} data={`${data} ${unit}`} />;
};
export default Unit;
