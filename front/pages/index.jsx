import Head from 'next/head';
import Link from 'next/link';

import useAuth from '../hooks/use-auth';
import EstablishmentsForAdd from '../ui/components/Dashboard/EstablishmentsForAdd/index';
import Moderation from '../ui/components/Dashboard/Moderation';
import UnpaidEstablishments from '../ui/components/Dashboard/UnpaidEstablishments';
import UnpaidSubscriptionFees from '../ui/components/Dashboard/UnpaidSubscriptionFees';
import MissingOGECInfoCompletionModal from '../ui/components/Establishments/OGEC/MissingOGECInfoCompletionModal';
import { Ability } from '../ui/components/GUARDS';
import { withAuthenticatedRoute } from '../ui/fragments/AuthenticatedRoute';
import Layout from '../ui/layouts';
const Home = () => {
    const { user } = useAuth();

    return (
        <Layout>
            <Head>
                <title>Accueil | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <div className="col-12 pb-10">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h3 className="card-title align-items-start flex-column">
                                <img src="/images/information.png" alt="logo" className="w-40px" />
                            </h3>

                            <div className="card-toolbar">
                                <Link href="/mes-informations-personnelles" passHref>
                                    <a className="btn btn-sm btn-secondary">
                                        Mes informations personnelles
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="card-body">
                            <p className="fs-5">
                                Cher(e) membre, <br />
                                <br />
                                En quelques clics et minutes, cette application vous permet de
                                modifier votre fiche établissement et de régler vos cotisations.
                                <br /> <br />
                                En effet, vous pouvez :
                                <br />
                                <br />
                                <ol className="fw-1">
                                    <li>
                                        modifier les informations de votre établissement. Elles sont
                                        capitales pour votre Union et pour les personnes qui
                                        recherchent des formations ou des établissements.
                                    </li>
                                    <li>
                                        compléter votre appel de cotisations (formation scolaire,
                                        continue et apprentissage) et régler par télépaiement.
                                    </li>
                                </ol>
                                Bonne navigation.
                            </p>
                        </div>
                    </div>
                </div>
                {user?.role === 100 && <Moderation />}
                <Ability I="pay" an="subscriptionFee">
                    <UnpaidEstablishments />
                </Ability>
                {user?.role !== 100 && <EstablishmentsForAdd />}
                <br />
                <Ability I="pay" an="subscriptionFee">
                    <UnpaidSubscriptionFees />
                </Ability>

                {user?.role === 0 ? (
                    <MissingOGECInfoCompletionModal />
                ) : user?.role === 300 ? (
                    <MissingOGECInfoCompletionModal />
                ) : (
                    ''
                )}
            </div>
        </Layout>
    );
};

export default withAuthenticatedRoute(Home);
