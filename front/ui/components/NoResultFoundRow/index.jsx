import React from 'react';

const NoResultFoundRow = ({ colSpan = '1' }) => {
    return (
        <tr>
            <td colSpan={colSpan} className="text-center text-muted">
                <i className="far fa-sad-cry pr-2 fa-2x" />
                <span className="d-flex align-items-center justify-content-center pt-2">
                    Aucun résultat correspondant à vos critères de recherche
                </span>
            </td>
        </tr>
    );
};

export default NoResultFoundRow;
