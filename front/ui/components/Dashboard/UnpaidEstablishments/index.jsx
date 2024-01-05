import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import useToast from '../../../../hooks/use-toast';
import settings from '../../../../settings';
import { Ability } from '../../GUARDS';

const { endpointUrl } = settings;

import EstablishmentItem from './EstablishmentItem';

const UnpaidEstablishments = () => {
    const { setToast } = useToast();
    const [data, setData] = useState([]);
    const fetchEstablishments = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/users/unpaid-establishments`);
            setData(data);
        } catch (e) {
            console.log(e);
            setToast('Erreur lors de la récupération de cotisations');
        }
    };
    useEffect(() => {
        fetchEstablishments();
    }, []);
    return (
        <div className="col-12 pb-10">
            <div className="card shadow-sm ">
                <div className="card-header">
                    <div className="card-title">Structures déclarées :</div>
                </div>
                <div className="card-body">
                    {!data.length
                        ? "Il n'y a aucune structure déclarée."
                        : data
                              ?.filter((fn) => fn?.organization?.subscriptionFees?.length)
                              .map((fn) => (
                                  <div className="mb-4" key={fn?.id}>
                                      <EstablishmentItem data={fn} key={fn?.organization?.id} />
                                      {fn?.organization?.subscriptionFees?.map((e) => (
                                          <Ability I="pay" an="subscriptionFee" key={e.id}>
                                              <div className="d-flex align-items-center ps-15 mb-n2 ">
                                                  <span className="btn btn-link fw-bold fs-6 text-gray-700 text-hover-primary d-block">
                                                      <i className="fa fa-arrow-right fs-4 text-hover-primary mb-1" />
                                                  </span>
                                                  <Link
                                                      href={`/appel-a-cotisation/${fn?.organization?.establishment?.estalishmentKey}`}>
                                                      <a
                                                          className="text-gray-600 fw-semibold"
                                                          style={{ color: '#9e1360' }}>
                                                          <span>
                                                              Gestion de l`&apos;appel à cotisation.{' '}
                                                          </span>{' '}
                                                          <span className="text-primary fw-bolder">
                                                              {e?.subscriptionParam?.year}
                                                          </span>
                                                      </a>
                                                  </Link>
                                              </div>
                                          </Ability>
                                      ))}
                                      <div className="separator separator-dashed mt-5" />
                                  </div>
                              ))}
                </div>
            </div>
        </div>
    );
};

export default UnpaidEstablishments;
