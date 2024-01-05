import Head from 'next/head';

import withAbility from '../../ui/components/GUARDS';
import AnnualSubscriptionFees from '../../ui/components/Tables/SubscriptionFee/AnnualSubscriptionFees';
import Layout from '../../ui/layouts';

const SubscriptionFees = () => {
    return (
        <Layout>
            <Head>
                <title>Cotisations annuelles (prévisionnel) | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <AnnualSubscriptionFees />
            </div>
        </Layout>
    );
};

export default withAbility(SubscriptionFees, { a: 'subscriptionFees.annualForcast', I: 'list' });
