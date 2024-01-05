import PhoneNumberFormat from './PhoneNumberFormat';
const Link = ({ data, type }) => {
    const types = {
        phone: 'tel:',
        mail: 'mailto:',
        link: ''
    };
    return (
        <a
            target={type === 'phone' ? '_self' : '_blank'}
            href={`${types[type]}${data}`}
            className="fw-bolder"
            rel="noreferrer">
            {type === 'phone' ? <PhoneNumberFormat data={data} /> : data}
        </a>
    );
};

export default Link;
