import Head from 'next/head';

import withAbility from '../../ui/components/GUARDS';
import UsersList from '../../ui/components/Users/index';
import Layout from '../../ui/layouts';

const Users = () => {
    return (
        <Layout>
            <Head>
                <title>Gestion des personnes | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <UsersList />
            </div>
        </Layout>
    );
};

export default withAbility(Users, { a: 'user', I: 'list' });
