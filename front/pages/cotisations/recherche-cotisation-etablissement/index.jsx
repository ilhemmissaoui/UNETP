import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import useCRUD from '../../../hooks/use-crud';
import {
    archiveOptions,
    filterSubscriptionFeesSchema
} from '../../../schemas/subscriptionFeeSchema';
import withAbility from '../../../ui/components/GUARDS';
import { Ability } from '../../../ui/components/GUARDS';
import Layout from '../../../ui/layouts';
import { getCurrentYear } from '../../../ui/utils/time';

const status = {
    '': 'Tous',
    'Solde initial': 'Solde initial',
    'Solde partiel': 'Solde partiel',
    Soldé: 'Soldé',
    Validé: 'Validé'
};
const SubscriptionFees = ({
    title = 'Bienvenue',
    statement = "Recherche des cotisations d'établissement"
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(filterSubscriptionFeesSchema),
        defaultValues: {
            archived: '0',
            status: '',
            year: getCurrentYear()
        }
    });

    const subscriptionFeeParams = useCRUD({
        pluralName: 'subscription-params',
        singleName: 'subscription-param',
        pageSize: null
    });
    const { push } = useRouter();
    const submit = ({ status, archived, year }) => {
        push(
            `/cotisations/recherche-cotisation-etablissement/details?annee=${year}${
                status ? `&statut=${status}` : ''
            }${archived ? `&archive=${archived}` : ''}`
        );
    };

    return (
        <Layout>
            <Head>
                <title>
                    Recherche des cotisations d&apos;établissement | {process.env.platformName}{' '}
                </title>
            </Head>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <form id="cotisation" onSubmit={handleSubmit(submit)}>
                            <div className="text-center pt-20 my-10">
                                <h2 className="fs-2x fw-bolder mb-10">{title}</h2>
                                <div className="text-gray-400 fs-4 fw-bold mb-10">
                                    {statement}
                                    <br />

                                    <div className="row">
                                        <div className="col-md-4">
                                            {!subscriptionFeeParams.loading && (
                                                <div className="form-group mb-3">
                                                    <label
                                                        htmlFor=""
                                                        className="form-label required">
                                                        Année :
                                                    </label>
                                                    <select
                                                        name="year"
                                                        className={clsx('form-select', {
                                                            'is-invalid': errors?.year
                                                        })}
                                                        {...register('year')}>
                                                        {subscriptionFeeParams.page?.nodes.map(
                                                            (e) => {
                                                                console.log(typeof e.year);
                                                                return (
                                                                    <option
                                                                        key={e.year}
                                                                        value={e.year}>
                                                                        {e.year}
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                    <span className="invalid-feedback">
                                                        {errors?.year?.message}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label htmlFor="" className="form-label required">
                                                    Statut :
                                                </label>
                                                <select
                                                    name="status"
                                                    className="form-select"
                                                    {...register('status')}>
                                                    {Object.entries(status)?.map((e) => (
                                                        <option key={e[0]} value={e[0]}>
                                                            {e[1]}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="invalid-feedback">
                                                    {errors?.status?.message}
                                                </span>
                                            </div>{' '}
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <label htmlFor="" className="form-label required">
                                                    Archives :
                                                </label>
                                                <select
                                                    name="archived"
                                                    className="form-select"
                                                    {...register('archived')}>
                                                    {Object.entries(archiveOptions)?.map(
                                                        ([key, value]) => (
                                                            <option key={key} value={key}>
                                                                {value}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Ability I="list" an="subscriptionFees.byEstablishmentFiltrable">
                                    <button className="btn btn-primary" form="cotisation">
                                        Voir le résultat
                                    </button>
                                </Ability>
                            </div>
                        </form>

                        <div className="text-center px-4">
                            <img
                                className="mw-100 mh-200px"
                                alt=""
                                src="/images/graphics/empty.svg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default withAbility(SubscriptionFees, {
    a: 'subscriptionFees.byEstablishmentFiltrable',
    I: 'list'
});
