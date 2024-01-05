const Badge = ({ variant = 'primary', size = 'lg', data, textColor }) => {
    return (
        <span
            className={`
            badge badge-${variant} badge-${size} ${textColor ? `text-${textColor}` : ''}`}>
            {data}
        </span>
    );
};
export default Badge;
