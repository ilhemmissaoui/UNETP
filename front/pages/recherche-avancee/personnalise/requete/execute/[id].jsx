import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import useCRUD from '../../../../../hooks/use-crud';
import useFakePagination from '../../../../../hooks/use-fake-pagination';
import useToast from '../../../../../hooks/use-toast';
import fieldsMapper from '../../../../../queryGeneratorFields/DataTables/index';
import { SearchPredefinedSchema } from '../../../../../schemas/SearchPredefinedSchema';
import settings from '../../../../../settings';
import DTRow from '../../../../../ui/components/AdvancedSearch/Personalized/Requests/DTRowMapper';
import EmptyState from '../../../../../ui/components/EmptyState';
import Pagination from '../../../../../ui/components/Pagination';
import Layout from '../../../../../ui/layouts';
const { endpointUrl } = settings;

const Execute = ({ withHeader = true, withBody = true, withFooter = true }) => {
    const searchForm = useForm({
        resolver: yupResolver(SearchPredefinedSchema)
    });
    const [data, setData] = useState();
    const [request, setRequest] = useState();

    const { page, handlePage, isTouched, first, offset, currentPage, loading } = useFakePagination({
        data,
        first: 8
    });

    const {
        register,
        watch,

        formState: { errors }
    } = searchForm;
    const { setToast } = useToast();
    const { query } = useRouter();
    const requests = useCRUD({
        singleName: 'request',
        pluralName: 'requests',
        pageSize: null
    });
    const { page: requestOptions, refetch } = requests;
    const { push } = useRouter();
    const fetchQuery = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/requests/execute/${query.id}`);
            setData(data?.data);
            refetch();
            setRequest(data?.label);
        } catch (e) {
            setToast({
                message: "Une erreur s'est produite lors de l'execution du requête .",
                variant: 'danger'
            });
        }
    };
    useEffect(() => {
        if (query.id);
        fetchQuery();
    }, [query.id]);

    const req = watch('request');

    useEffect(() => {
        if (typeof req === 'undefined') {
            return fetchQuery();
        }

        push(`/recherche-avancee/personnalise/requete/execute/${req}`);
    }, [req]);
    return (
        <Layout>
            <Head>
                <title>Résultat du requête | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <div className="card">
                    {withHeader && (
                        <div className="card-header border-0 pt-6">
                            <div className="card-toolbar" />

                            <div className="card-toolbar">
                                <form id="refetch">
                                    <div className="form-group ">
                                        <label htmlFor="request" className="form-label required">
                                            Choisir une requête :
                                        </label>
                                        <div className="input-group mb-3">
                                            <select
                                                type="submit"
                                                form="refetch"
                                                name="request"
                                                placeholder="Veuillez choisir une requête.."
                                                className="form-select form-select-sm "
                                                {...register('request')}>
                                                <option selected value={query?.id}>
                                                    {request}
                                                </option>
                                                {!requests.loading &&
                                                    requestOptions?.nodes
                                                        ?.filter((e) => e.id != query.id)
                                                        ?.map(({ label, id }) => (
                                                            <option key={id} value={id}>
                                                                {label}
                                                            </option>
                                                        ))}
                                            </select>
                                        </div>

                                        <div className="invalid-feedback  d-flex">
                                            {errors?.request?.message}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {!loading && !isTouched && !page?.nodes?.length ? (
                        <EmptyState />
                    ) : (
                        <>
                            {withBody && (
                                <div className="card-body py-0">
                                    <div className="table-responsive">
                                        <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                            <thead>
                                                <tr className="text-center text-muted fw-bolder fs-7 text-uppercase gs-0">
                                                    {/* to generate */}
                                                    {!!data?.length &&
                                                        Object.keys(data[0]).map((e) => {
                                                            return (
                                                                <th key={e}>
                                                                    {' '}
                                                                    {fieldsMapper[e]?.headerLabel}
                                                                </th>
                                                            );
                                                        })}
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 fw-bold">
                                                {!loading &&
                                                    page?.nodes?.map((e, i) => {
                                                        return <DTRow key={i} data={e} />;
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {isTouched && !page?.nodes?.length
                                ? null
                                : withFooter && (
                                      <div className="card-footer py-3">
                                          <Pagination
                                              totalSize={page?.pageInfo?.totalCount}
                                              sizePerPage={first}
                                              offset={offset}
                                              itemsCount={page?.nodes?.length}
                                              page={currentPage}
                                              onPageChange={handlePage}
                                              isLoading={loading}
                                          />
                                      </div>
                                  )}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Execute;
