import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useToast from '../../../hooks/use-toast';
import paymentsSchema from '../../../schemas/payment';
import { paymentMethods } from '../../../schemas/subscriptionFeeSchema';
import settings from '../../../settings';
import { FormatPrice } from '../../utils/currency';
import DTRow from './DTRow';
const paymentTypesRoute = {
    cheque: `/paiement-de-solde/par-cheque`,
    creditCard: `/paiement-de-solde/par-carte-bancaire`
};

const { endpointUrl } = settings;
const Memeber = () => {
    const { setToast } = useToast();
    const { push } = useRouter();
    const [data, setData] = useState();

    const addForm = useForm({
        resolver: yupResolver(paymentsSchema),
        defaultValues: {
            suscriptionFeesIncluded: []
        }
    });
    const {
        watch,
        register,
        formState: { errors },
        handleSubmit
    } = addForm;
    console.log(errors);
    const fetchSubscriptionFees = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/subscription-fees`);
            setData(data);
        } catch (e) {
            setToast('Erreur lors de la récupération de cotisations');
        }
    };

    const submit = async (data) => {
        push(
            `/${
                paymentTypesRoute[data.paymentMethod]
            }?subscriptionFeesIds=${data.suscriptionFeesIncluded?.join(',')}`
        );
    };
    useEffect(() => {
        fetchSubscriptionFees();
    }, []);

    const suscriptionFeesIncluded = watch('suscriptionFeesIncluded');
    const totalAmount = data?.reduce((pv, cv) => {
        return (
            pv +
            cv?.organization?.subscriptionFees
                .filter((e) => suscriptionFeesIncluded.includes(e.id))
                .reduce(
                    (ppv, ccv) =>
                        ppv +
                        parseFloat(
                            (ccv?.customAmount ? ccv?.customAmount : ccv?.calculatedAmount) || 0
                        ),
                    0
                )
        );
    }, 0);
    return data ? (
        <>
            <div className="col-12 mb-3">
                <FormProvider {...addForm}>
                    <div className="card">
                        <div className="card-body">
                            <div className="h6 align-items-center">
                                Choisir les cotisations a payer :{' '}
                            </div>
                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr className="fs-7 fw-bolder border-0 text-gray-400">
                                        <th></th>
                                        <th></th>
                                        <th>Montant</th>
                                        <th>Solde</th>
                                        <th>Détail</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800 fw-bolder  mb-1 fs-6">
                                    {data?.map((e, i) => (
                                        <DTRow data={e} key={i} />
                                    ))}
                                </tbody>
                                <tfoot className="notice bg-light-primary border-dashed border-primary rounded border p-3">
                                    <tr className="fw-bolder fs-6 text-gray-900 text-center">
                                        <th className="text-end" colSpan="2">
                                            Montant à payer :
                                        </th>
                                        <th>
                                            <FormatPrice value={totalAmount || 0} />{' '}
                                        </th>
                                        <th colSpan={2} />
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="invalid-feedback d-flex">
                                {errors?.suscriptionFeesIncluded?.message}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(submit)} id="payment">
                            <div className="card-footer">
                                <div>
                                    <div className="row align-items-center justify-content-between ">
                                        <div className="col-md-4">
                                            <label className="form-label required">
                                                Mode de paiement :
                                            </label>
                                            <select
                                                name="paymentMethod"
                                                className={clsx('form-select', {
                                                    'is-invalid': errors?.paymentMethod
                                                })}
                                                {...register('paymentMethod')}>
                                                <option value="">-Sélectionner-</option>
                                                {Object.entries(paymentMethods).map(
                                                    ([key, value]) => {
                                                        return (
                                                            <option key={key} value={key}>
                                                                {value}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                            <div className="invalid-feedback d-flex">
                                                {errors?.paymentMethod?.message}
                                            </div>
                                        </div>
                                        <div className="col-auto ">
                                            <button
                                                disabled={!totalAmount > 0}
                                                type="submit"
                                                className="btn btn-primary"
                                                form="payment">
                                                Payer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </FormProvider>
            </div>
        </>
    ) : null;
};

export default Memeber;
