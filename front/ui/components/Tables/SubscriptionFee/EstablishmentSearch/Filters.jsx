import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import useCRUD, { useCRUDContext } from '../../../../../hooks/use-crud';
import {
    archiveOptions,
    filterSubscriptionFeesSchema
} from '../../../../../schemas/subscriptionFeeSchema';
const status = {
    '': 'Tous',
    'Solde initial': 'Solde initial',
    'Solde partiel': 'Solde partiel',
    Soldé: 'Soldé',
    Validé: 'Validé'
};
const Filters = () => {
    const { query, replace } = useRouter();
    const crud = useCRUDContext();
    const { handleFilters } = crud;
    const subscriptionFeeParams = useCRUD({
        pluralName: 'subscription-params',
        singleName: 'subscription-param',
        pageSize: null,
        defaultSort: {
            field: 'year',
            direction: 'DESC'
        }
    });
    const searchForm = useForm({
        resolver: yupResolver(filterSubscriptionFeesSchema),
        defaultValues: { archived: query.archive, status: query.statut, year: query.annee }
    });
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors }
    } = searchForm;

    const submit = async (data) => {
        replace(
            `/cotisations/recherche-cotisation-etablissement/details?annee=${data?.year}${
                data?.status ? `&statut=${data?.status}` : ''
            }${data?.archived ? `&archive=${data?.archived}` : ''}`
        );
        handleFilters(data);
    };
    useEffect(() => {
        const subscription = watch(handleSubmit(submit));
        return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);
    return (
        <form id="refetch" className="p-4 w-300px">
            <br />
            {!subscriptionFeeParams.loading && (
                <div className=" col-md-12 form-group mb-3">
                    <label htmlFor="" className="form-label required">
                        Année :
                    </label>
                    <select
                        name="year"
                        className={clsx('form-select', {
                            'is-invalid': errors?.year
                        })}
                        {...register('year')}>
                        {subscriptionFeeParams.page?.nodes.map((e) => {
                            return (
                                <option key={e.id} value={e.year}>
                                    {e.year}
                                </option>
                            );
                        })}
                    </select>
                    <span className="invalid-feedback">{errors?.year?.message}</span>
                </div>
            )}
            <div className="col-md-12">
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label required">
                        Statut :
                    </label>
                    <select name="status" className="form-select" {...register('status')}>
                        {Object.entries(status)?.map((e) => (
                            <option key={e[0]} value={e[0]}>
                                {e[1]}
                            </option>
                        ))}
                    </select>
                    <span className="invalid-feedback">{errors?.status?.message}</span>
                </div>{' '}
            </div>

            <div className="col-md-12">
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label required">
                        Archives :
                    </label>
                    <select name="archived" className="form-select" {...register('archived')}>
                        {Object.entries(archiveOptions)?.map(([key, value]) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
                <span className="invalid-feedback">{errors?.archived?.message}</span>
            </div>
        </form>
    );
};
export default Filters;
