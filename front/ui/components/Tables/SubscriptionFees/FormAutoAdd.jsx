const FormAutoAdd = ({ lastYear }) => {
    let years = lastYear?.split('-');

    return (
        <>
            <div className="notice bg-light rounded border p-7 mb-3">
                <div className="flex-shrink-0 text-gray-800 fs-5 fw-bolder">
                    <div className="h3">Créer automatiquement les cotisations d&apos;une année</div>
                    <span>
                        Vous pouvez en cliquant sur le bouton ci dessous créer automatiquement les
                        cotisation d&apos;une année pour les structures d&apos;établissements.{' '}
                        <br />
                        Par exemple, en octobre {years[0]}, vous pouvez créer les années de
                        cotisation {lastYear}. A la création, ces cotisations seront placées à
                        l&apos;état &quot;Solde initial&quot;.
                        <br /> Remarque : les établissements archivés ne sont pas concernés.
                    </span>
                </div>
            </div>
        </>
    );
};

export default FormAutoAdd;
