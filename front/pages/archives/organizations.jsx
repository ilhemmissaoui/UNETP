import Head from 'next/head';

import Organization from '../../ui/components/Tables/Archive/organizations/index';
import Layout from '../../ui/layouts';

const Archives = () => {
    return (
        <Layout>
            <Head>
                <title>Liste des organisations | {process.env.platformName} </title>
            </Head>

            <div className="container-fluid">
                <Organization />
            </div>
        </Layout>
    );
};
export default Archives;
