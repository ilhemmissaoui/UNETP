import Head from 'next/head';

import Memeber from '../../ui/components/SubscriptionFeePayment';
import Layout from '../../ui/layouts';
const SoldPayment = () => {
    return (
        <Layout>
            <Head>
                <title>Paiement de solde | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <Memeber />
            </div>
        </Layout>
    );
};

export default SoldPayment;
