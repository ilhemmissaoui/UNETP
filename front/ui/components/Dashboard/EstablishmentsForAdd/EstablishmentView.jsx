const DTRow = () => {
    return (
        <>
            <div className="notice bg-light-success rounded border-success border border-dashed p-4 mb-3">
                <div className="flex-shrink-0 mb-3">
                    <span className="text-dark fs-5 fw-bolder">
                        Je déclare, dès à présent, le centre de formation et m&apos;engage à régler
                        la cotisation s&apos;y rapportant
                    </span>
                </div>
            </div>

            <div className="separator my-5" />

            <div className="notice  bg-light rounded border p-5">
                <div className="flex-shrink-0 mb-3 text-gray-800 fs-6">
                    <div className="mb-2">
                        <label className="form-label">Nom du centre de formation :</label>
                    </div>

                    <div className="mb-1">
                        <label className="form-label">Numéro académique :</label>
                    </div>
                </div>
            </div>

            <div className="mb-3 mt-2">
                <div className="mb-3">
                    <label className="fs-5 fw-bold">Coordonnées :</label>
                </div>

                <div className="notice  bg-light rounded border p-7 mb-2">
                    <div className="flex-shrink-0 mb-3 text-gray-800 fs-6">
                        <div className="mb-3">
                            <label className="form-label">Téléphone :</label>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">E-mail :</label>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Site web :</label>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Adresse :</label>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">BP :</label>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Code postal :</label>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Ville :</label>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Nom & prénom du responsable du Centre :
                            </label>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Nombre d&apos;apprentis :</label>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Diplômes délivrés :</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DTRow;
