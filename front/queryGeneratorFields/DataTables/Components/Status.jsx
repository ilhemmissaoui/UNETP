import Badge from './Badge';
const Status = ({ size = 'lg', data }) => {
    const variantsByStatus = {
        'Solde initial': 'danger',
        'Solde partiel': 'danger',
        'Solde négatif (trop perçu)': 'partial',
        Soldé: 'success',
        Validé: 'success'
    };
    return <Badge variant={variantsByStatus[data]} size={size} data={data} />;
};
export default Status;
