import Head from 'next/head';

import Remider from '../../ui/components/Tables/SubscriptionFee/Remider';
import Layout from '../../ui/layouts';

const Subscription = () => {
    return (
        <Layout>
            <Head>
                <title>Relances initiales | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <Remider />
            </div>
        </Layout>
    );
};

export default Subscription;
