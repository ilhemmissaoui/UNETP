import { subject } from '@casl/ability';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useToast from '../../hooks/use-toast';
import settings from '../../settings';
import withAbility from '../../ui/components/GUARDS';
import DTRow from '../../ui/components/payedSubscriptionFee/DTRow';
import { FormatPrice } from '../../ui/utils/currency';
import { getCurrentYear } from '../../ui/utils/time';

const { endpointUrl } = settings;
const PaidSubscriptionFee = () => {
    const { setToast } = useToast();
    const { query } = useRouter();
    const currentYear = getCurrentYear();

    const [data, setData] = useState();

    const fetchSubscriptionFees = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/subscription-fees/${query?.id}`);
            setData(data);
        } catch (e) {
            setToast('Erreur lors de la récupération de cotisations');
        }
    };

    useEffect(() => {
        fetchSubscriptionFees();
    }, []);
    // const type = parseInt(data?.establishment?.establishmentKey?.split('').pop()) || 0;
    const test = data?.organization?.name;
    const firstName = data?.organization?.functions[0].user?.firstName;
    const lastName = data?.organization?.functions[0].user?.lastName;
    const mail = data?.organization?.coordinates[0].email;
    const voiceLabel = data?.organization?.coordinates[0].voiceLabel;
    const zipCode = data?.organization?.coordinates[0].zipCode;
    const city = data?.organization?.coordinates[0].city;
    const phoneNumber = data?.organization?.coordinates[0].phoneNumber;
    const fax = data?.organization?.coordinates[0].fax;
    const totalPaid = data?.subscriptionPayments?.find(
        (e) => e?.subscriptionId === parseInt(query?.id)
    )?.amount;

    // const totalPaid = data?.subscriptionPayments?.map((e) => e?.amount);
    console.log(totalPaid);

    return data ? (
        <>
            <div className="container-fluid">
                {' '}
                <div className="card">
                    <div className="col-12 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="h3 text-center align-items-center py-20">
                                    Justificatif de cotisation {currentYear}
                                </div>

                                <div className="h5 align-items-center">Cher(e) collégue : </div>
                                <div className="m-0">
                                    <div className="fw-bold fs-5 text-gray-800 mb-8">
                                        Nous vous confirmons que vos cotisations UNETP{' '}
                                        <strong>{currentYear} </strong> sont réglées.
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="fw-semibold fs-5 text-gray-600 mb-1">
                                            <strong>
                                                {' '}
                                                Cotisation de l&apos;établissement :
                                                <div className="ffw-bold fs-5 text-dark mb-1">
                                                    {test}
                                                </div>
                                            </strong>

                                            <div className="fw-bold fs-5 text-gray-800">
                                                Année :{' '}
                                                <div className="fw-bold fs-5 text-gray-600">
                                                    {currentYear}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fw-bold fs-5 text-gray-800 py-5">
                                        Montant payé :
                                        <FormatPrice value={totalPaid || 0} />{' '}
                                    </div>
                                    <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                                        <div className="flex-shrink-0">
                                            <div className="m-0  ps-20">
                                                <div className="m-0 py-5 ps-20">
                                                    <table className="table table-row-dashed table-row-gray-300  ps-5">
                                                        <thead>
                                                            <tr className="fs-5 fw-bolder border-0 text-gray-400">
                                                                <th>Montant</th>
                                                                <th>Solde</th>
                                                                <th>Détail</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="text-gray-800 fw-bolder mb-1 fs-6 ">
                                                            <DTRow data={data} />
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>{' '}
                                        </div>{' '}
                                    </div>

                                    <div className="py-5 col-sm-6   me-5">
                                        <strong>
                                            <div className="ffw-bold fs-5 text-dark mb-1">
                                                Le service comptabilité
                                            </div>
                                        </strong>
                                        <div className="fw-semibold fs-5 text-gray-600 mb-1">
                                            <strong>
                                                {firstName} {lastName}
                                                <div className="ffw-bold fs-5 text-dark mb-1">
                                                    {test}
                                                </div>
                                            </strong>

                                            <div className="fw-bold fs-5 text-gray-800">{mail}</div>

                                            <div className=" fs-5 ">
                                                {voiceLabel} <br />
                                                {zipCode} {city}
                                            </div>
                                        </div>
                                        <div className="separator my-3" />

                                        <span className="pe-5 ">
                                            <i className="fa fa-phone text-dark fs-5" />{' '}
                                            {phoneNumber}
                                        </span>
                                        <span>
                                            {' '}
                                            <i className="fa fa-fax text-dark fs-5" /> {fax}
                                        </span>
                                    </div>
                                </div>
                            </div>{' '}
                        </div>
                    </div>
                </div>{' '}
            </div>
        </>
    ) : null;
};
export default withAbility(PaidSubscriptionFee, (query) => ({
    I: 'view',
    this: subject('subscriptionFee', { id: parseInt(query?.id) })
}));
