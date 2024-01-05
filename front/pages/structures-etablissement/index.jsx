import Head from 'next/head';

import withAbility from '../../ui/components/GUARDS';
import EstablishmentsList from '../../ui/components/Tables/Establishments';
import Layout from '../../ui/layouts';

const Establishments = () => {
    return (
        <Layout>
            <Head>
                <title>
                    Gestion des structures d&apos;établissement | {process.env.platformName}
                </title>
            </Head>
            <div className="container-fluid">
                <EstablishmentsList />
            </div>
        </Layout>
    );
};

export default withAbility(Establishments, { a: 'establishment', I: 'list' });
