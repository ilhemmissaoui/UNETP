import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import useToast from '../../../hooks/use-toast';
import settings from '../../../settings';
import { FormatPrice } from '../../utils/currency';
import { getCurrentYear } from '../../utils/time';
import MemeberItem from './MemberItem';

const { endpointUrl } = settings;
const UnpaidSubscriptionFees = () => {
    const { setToast } = useToast();
    const [data, setData] = useState();
    const fetchSubscriptionFees = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/subscription-fees`);
            setData(data);
        } catch (e) {
            console.log(e);
            setToast('Erreur lors de la récupération de cotisations');
        }
    };
    useEffect(() => {
        fetchSubscriptionFees();
    }, []);
    const totalAmount = data?.reduce((pv, cv) => {
        return (
            pv +
            cv?.organization?.subscriptionFees.reduce(
                (ppv, ccv) =>
                    ppv +
                    parseFloat(
                        (ccv?.customAmount ? ccv?.customAmount : ccv?.calculatedAmount) || 0
                    ),
                0
            )
        );
    }, 0);
    const totalUnPaid =
        totalAmount -
        data?.reduce((pv, cv) => {
            return (
                pv +
                cv?.organization?.subscriptionFees.reduce(
                    (ppv, ccv) =>
                        ppv +
                        (ccv?.subscriptionPayments?.reduce(
                            (pppv, cccv) => pppv + parseFloat(cccv.amount || 0),
                            0
                        ) || 0),
                    0,
                    0
                )
            );
        }, 0);
    const currentYear = getCurrentYear();
    return data ? (
        <div className="col-12 mb-3">
            <div className="card">
                <div className="card-header">
                    <div className="card-title">
                        Cotisation(s) pour l&apos;année {currentYear} :
                    </div>
                </div>
                <div className="card-body">
                    <div className="alert alert-dismissible bg-danger d-flex flex-column flex-sm-row w-100 p-5 mb-5">
                        <div className="d-flex flex-column text-light pe-0 pe-sm-10 fw-bolder">
                            <span>
                                Avant de payer, veuillez vérifier et compléter les informations de
                                votre établissement en cliquant sur le lien &apos;Gestion de
                                l&apos;appel à cotisation&apos; ci-dessus.
                                <br />
                                <small className="fw-normal">
                                    NB : Si vous avez plusieurs structures déclarées,
                                    l&apos;opération doit être faite pour chacune d&apos;entre
                                    elles.
                                </small>
                            </span>
                        </div>
                    </div>

                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                            <tr className="fs-7 fw-bolder border-0 text-gray-400">
                                <th></th>
                                <th>Montant</th>
                                <th>Solde</th>
                                <th>Détail</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800 fw-bolder  mb-1 fs-6">
                            {data?.map((e, i) => (
                                <MemeberItem data={e} key={i} />
                            ))}
                            <tr>
                                <td></td>
                                <td>Montant à payer :</td>
                                <td>
                                    <FormatPrice value={totalUnPaid || 0} />{' '}
                                </td>
                                {!!totalUnPaid && (
                                    <td>
                                        <Link
                                            href="/paiement-de-solde"
                                            passHref
                                            className="btn btn-primary btn-sm">
                                            <a className="btn btn-primary mt-10">Payer le solde</a>
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ) : null;
};

export default UnpaidSubscriptionFees;
