import Head from 'next/head';

import withAbility from '../../ui/components/GUARDS';
import DiplomasList from '../../ui/components/Tables/Diplomas';
import Layout from '../../ui/layouts';

const Diploma = () => {
    return (
        <Layout>
            <Head>
                <title>Gestion des diplômes | {process.env.platformName} </title>
            </Head>

            <div className="container-fluid">
                <DiplomasList />
            </div>
        </Layout>
    );
};

export default withAbility(Diploma, { a: 'diploma', I: 'list' });
