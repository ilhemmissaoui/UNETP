import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import withAbility from '../../ui/components/GUARDS';
import Academies from '../../ui/components/Tables/Academies';
import Civility from '../../ui/components/Tables/Civilities';
import Diplomas from '../../ui/components/Tables/DiplomaConfiguration';
import Labels from '../../ui/components/Tables/EstablishmentLabels';
import Functions from '../../ui/components/Tables/Functions';
import Guardianships from '../../ui/components/Tables/Guardianships';
import HistoryTypes from '../../ui/components/Tables/HistoryTypes';
import Pensions from '../../ui/components/Tables/Pensions';
import SubscriptionFees from '../../ui/components/Tables/SubscriptionFees';
import Layout from '../../ui/layouts';

const addTabs = [
    {
        slug: 'gestion-fonctions',
        label: 'Gestion des fonctions',
        component: Functions
    },
    {
        slug: 'gestion-civilites',
        label: 'Gestion des civilités',
        component: Civility
    },
    {
        slug: 'gestion-academies',
        label: 'Gestion des académies',
        component: Academies
    },
    {
        slug: 'gestion-labels-etablissements',
        label: "Gestion des labels d'établissements",
        component: Labels
    },
    {
        slug: 'gestion-des-diplomes',
        label: 'Gestion des diplômes',
        component: Diplomas
    },
    {
        slug: 'gestion-des-pensions',
        label: 'Gestion des pensions',
        component: Pensions
    },
    {
        slug: 'gestion-des-tutelles',
        label: 'Gestion des tutelles',
        component: Guardianships
    },
    {
        slug: 'gestion-types-historiques',
        label: "Gestion des types d'historiques",
        component: HistoryTypes
    },
    {
        slug: 'gestion-annees-cotisation',
        label: 'Gestion des années de cotisation',
        component: SubscriptionFees
    }
];

const Configuration = () => {
    const { query } = useRouter();
    const { component: Component } = addTabs.find((e) => e.slug === query?.slug) || {};
    return (
        <Layout>
            <Head>
                <title>Configuration | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex align-items-end">
                            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fw-bolder">
                                {addTabs.map((e) => (
                                    <li className="nav-item" key={e}>
                                        <Link href={`/configuration/${e.slug}`} passHref>
                                            <a
                                                className={clsx(
                                                    'nav-link nav-link text-active-primary',
                                                    {
                                                        active: query?.slug === e.slug
                                                    }
                                                )}>
                                                {e.label}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {Component && <Component />}
                </div>
            </div>
        </Layout>
    );
};

export default withAbility(Configuration, { a: 'configuration', I: 'list' });

export function getStaticProps() {
    return {
        props: {}
    };
}
export function getStaticPaths() {
    return {
        paths: addTabs?.map((e) => ({ params: { slug: e.slug } })),
        fallback: false // false or 'blocking'
    };
}
