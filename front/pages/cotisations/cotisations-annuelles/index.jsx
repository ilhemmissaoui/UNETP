import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import { establishmentSearchSchema } from '../../../schemas/subscriptionFeeSchema';
import withAbility from '../../../ui/components/GUARDS';
import { Ability } from '../../../ui/components/GUARDS';
import Layout from '../../../ui/layouts';
const SubscriptionFees = ({
    title = 'Bienvenue',
    statement = "Cotisations annuelles par structure d'établissement"
}) => {
    const searchForm = useForm({
        resolver: yupResolver(establishmentSearchSchema)
    });
    const { push } = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = searchForm;
    const handleSearch = ({ establishmentNumber }) => {
        push(`/cotisations/cotisations-annuelles/${establishmentNumber}`);
    };
    return (
        <Layout>
            <Head>
                <title>
                    Cotisations annuelles par structure d&apos;établissement |{' '}
                    {process.env.platformName}{' '}
                </title>
            </Head>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="card text-center pt-20 my-10">
                            <h2 className="fs-2x fw-bolder mb-5">{title}</h2>
                            <p className="text-gray-500 fs-4 fw-bold mb-10">{statement}</p>
                            <form id="search" onSubmit={handleSubmit(handleSearch)}>
                                <div className="form-group col-md-4 mx-auto mb-3">
                                    <label
                                        htmlFor="establishmentNumber"
                                        className="form-label   required">
                                        N° d&apos;établissement :
                                    </label>
                                    <Controller
                                        name="establishmentNumber"
                                        control={control}
                                        render={({ field }) => (
                                            <NumberFormat
                                                allowEmptyFormatting={false}
                                                format="######"
                                                mask="_"
                                                type="text"
                                                className={clsx('form-control form-control-sm', {
                                                    'is-invalid': errors?.establishmentNumber
                                                })}
                                                onChange={({ target: { value } }) => {
                                                    field.onChange(value);
                                                }}
                                                value={field.value}
                                                ref={field.ref}
                                                onBlur={field.onBlur}
                                                {...field}
                                            />
                                        )}
                                    />
                                    <div className="invalid-feedback d-flex">
                                        {errors?.establishmentNumber?.message}
                                    </div>
                                </div>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <Tooltip id="tooltip-edit">
                                            Afficher les cotisations basées sur la clé
                                            d&apos;établissement
                                        </Tooltip>
                                    }>
                                    <Ability I="list" an="subscriptionFees.byEstablishment">
                                        <button className="btn btn-primary btn-sm" form="search">
                                            Voir le résultat
                                        </button>
                                    </Ability>
                                </OverlayTrigger>
                            </form>
                        </div>
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
export default withAbility(SubscriptionFees, { a: 'subscriptionFees.byEstablishment', I: 'list' });
