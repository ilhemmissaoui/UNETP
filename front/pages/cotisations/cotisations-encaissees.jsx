import Head from 'next/head';

import withAbility from '../../ui/components/GUARDS';
import CollectedSubscriptionFees from '../../ui/components/Tables/SubscriptionFee/CollectedSubscriptionFees';
import Layout from '../../ui/layouts';

const SubscriptionFees = () => {
    return (
        <Layout>
            <Head>
                <title>Cotisations annuelles (encaissées) | {process.env.platformName} </title>
            </Head>

            <div className="container-fluid">
                <CollectedSubscriptionFees />
            </div>
        </Layout>
    );
};
export default withAbility(SubscriptionFees, { a: 'subscriptionFees.annualCollected', I: 'list' });
