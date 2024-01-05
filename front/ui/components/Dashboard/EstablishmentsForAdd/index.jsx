import axios from 'axios';
import { useEffect, useState } from 'react';

import useToast from '../../../../hooks/use-toast';
import settings from '../../../../settings';
import EstablishmentItems from './EstablishmentItems';
const { endpointUrl } = settings;

const EstablishmentsList = () => {
    const { setToast } = useToast();
    const [establishmentNames, setEstablishmentNames] = useState([]);

    const fetchEstablishments = async () => {
        try {
            const { data } = await axios.put(
                `${endpointUrl}/establishments/establishments-for-add`
            );
            setEstablishmentNames(data?.establishmentNames);
        } catch (e) {
            setToast('Erreur lors de la récupération de cotisations');
        }
    };
    useEffect(() => {
        fetchEstablishments();
    }, []);

    return (
        <div className="card shadow-sm">
            <div className="card-header">
                <div className="card-title">Structure(s) à ajouter :</div>
            </div>

            <div className="card-body">
                {!establishmentNames.length
                    ? "Il n'y a aucune structure à ajouter ."
                    : establishmentNames.map((e) => (
                          <div className="mb-4" key={e}>
                              <EstablishmentItems data={e} key={e} />
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default EstablishmentsList;
