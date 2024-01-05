import Head from 'next/head';

import User from '../../ui/components/Tables/Archive/users/index';
import Layout from '../../ui/layouts';

const Archives = () => {
    return (
        <Layout>
            <Head>
                <title>Liste des personnes | {process.env.platformName} </title>
            </Head>

            <div className="container-fluid">
                <User />
            </div>
        </Layout>
    );
};
export default Archives;
