import Head from 'next/head';

import withAbility from '../../../ui/components/GUARDS';
import EstablishmentSearch from '../../../ui/components/Tables/SubscriptionFee/EstablishmentSearch';
import Layout from '../../../ui/layouts';

const SubscriptionFees = () => {
    return (
        <Layout>
            <Head>
                <title>Recherche des cotisations établissement | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <EstablishmentSearch />
            </div>
        </Layout>
    );
};
export default withAbility(SubscriptionFees, {
    a: 'subscriptionFees.byEstablishmentFiltrable',
    I: 'list'
});
