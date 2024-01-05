import Head from 'next/head';
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner';

import withAbility from '../../../ui/components/GUARDS';
import EstablishmentStructure from '../../../ui/components/Tables/SubscriptionFee/EstablishmentStructure';
import Layout from '../../../ui/layouts';

const Subscription = () => {
    const { query } = useRouter();
    return (
        <Layout>
            <Head>
                <title>
                    {' '}
                    Cotisations annuelles par structure d&apos;établissement |{' '}
                    {process.env.platformName}{' '}
                </title>
            </Head>

            <div className="container-fluid">
                {query?.id ? (
                    <EstablishmentStructure />
                ) : (
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Spinner animation="border" />
                    </div>
                )}
            </div>
        </Layout>
    );
};
export default withAbility(Subscription, { a: 'subscriptionFees.byEstablishment', I: 'list' });
