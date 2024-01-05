const RequestView = ({ data }) => {
    return (
        <>
            {' '}
            Une <strong>demande de modification </strong> a été faite sur cet établissement.
            L&apos;enregistrement de cet établissement <br />
            sera vérouillé tant que vous ne l&apos;aurez pas traité. Vous pouvez voir ci-dessous la
            liste des champs de <br />
            l&apos;établissement qui font l&apos;objet d&apos;une demande de modification.
            <br />
            <br />
            Pour chaque champ les actions possibles sont: <br />
            <lu>
                <li>
                    <strong>appliquer: </strong> reporte la modification dans l&apos;onglet
                    correspondant.
                </li>
                <li>
                    {' '}
                    <strong>ignorer: </strong> ne pas tenir compte de la demande.
                </li>
            </lu>
            si vous vous tromper dans le choix d&apos;une actions
            <div>{data?.json}</div>{' '}
        </>
    );
};

export default RequestView;
