import Head from 'next/head';

import withAbility from '../../ui/components/GUARDS';
import Delegations from '../../ui/components/Tables/Delegations';
import Layout from '../../ui/layouts';

const RegionalDelegations = () => {
    return (
        <Layout>
            <Head>
                <title>Gestion des délégations régionales | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <Delegations />
            </div>
        </Layout>
    );
};

export default withAbility(RegionalDelegations, { a: 'delegation', I: 'list' });
