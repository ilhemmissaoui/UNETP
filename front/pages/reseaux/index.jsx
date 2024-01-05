import Head from 'next/head';

import withAbility from '../../ui/components/GUARDS';
import NetworksList from '../../ui/components/Tables/Networks';
import Layout from '../../ui/layouts';

const Networks = () => {
    return (
        <Layout>
            <Head>
                <title>Gestion des réseaux | {process.env.platformName} </title>
            </Head>

            <div className="container-fluid">
                <NetworksList />
            </div>
        </Layout>
    );
};

export default withAbility(Networks, { a: 'network', I: 'list' });
