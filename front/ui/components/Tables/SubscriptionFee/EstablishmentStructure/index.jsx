import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import useCRUD from '../../../../../hooks/use-crud';
import { establishmentSearchSchema } from '../../../../../schemas/subscriptionFeeSchema';
import Searchbar from '../../../CRUD/Searchbar';
import SortableField from '../../../CRUD/SortableField';
import NoResultFoundRow from '../../../NoResultFoundRow/index';
import Pagination from '../../../Pagination';
import DTRow from './DTRow';
import Loader from './Loader';

const EstablishmentStructure = ({ withHeader = true, withBody = true, withFooter = true }) => {
    const { query, push } = useRouter();

    const searchForm = useForm({
        resolver: yupResolver(establishmentSearchSchema),
        defaultValues: {
            establishmentNumber: query.id
        }
    });
    const handleSearchEst = ({ establishmentNumber }) => {
        push(`/cotisations/cotisations-annuelles/${establishmentNumber}`);
    };

    const {
        page,
        first,
        offset,
        currentPage,
        handlePage,
        handleSearch,
        handleFilters,
        isTouched,
        search,
        sort,
        handleSort,
        loading
    } = useCRUD({
        singleName: 'establishments-yearly',
        pluralName: 'establishments-yearly',
        prefix: 'subscription-fees',
        defaultSort: { field: 'year', direction: 'desc' },
        filters: { establishmentNumber: query?.id }
    });
    const onSearch = ({ target: { value } }) => handleSearch(value);
    useEffect(() => {
        handleFilters({ establishmentNumber: query?.id });
    }, [query?.id]);
    return (
        <>
            <div className="card">
                {withHeader && (
                    <div className="card-header border-0 pt-6">
                        <div className="card-toolbar">
                            <Searchbar value={search} onChange={onSearch} />
                        </div>
                        <form id="refetch" onSubmit={searchForm.handleSubmit(handleSearchEst)}>
                            <div className="form-group ">
                                <label
                                    htmlFor="establishmentNumber"
                                    className="form-label required">
                                    N° d&apos;établissement :
                                </label>
                                <div className="input-group mb-3">
                                    <Controller
                                        name="establishmentNumber"
                                        control={searchForm.control}
                                        render={({ field }) => (
                                            <NumberFormat
                                                allowEmptyFormatting={false}
                                                format="######"
                                                mask="_"
                                                type="text"
                                                className={clsx('form-control form-control-sm', {
                                                    'is-invalid':
                                                        searchForm.formState.errors
                                                            ?.establishmentNumber
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
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="tooltip-edit">Rechercher</Tooltip>}>
                                        <button
                                            className="btn btn-icon btn-primary btn-sm"
                                            form="refetch"
                                            type="submit">
                                            <i className=" fa la-sync"></i>{' '}
                                        </button>
                                    </OverlayTrigger>
                                </div>

                                <div className="invalid-feedback  d-flex">
                                    {searchForm.formState.errors?.establishmentNumber?.message}
                                </div>
                            </div>
                        </form>
                    </div>
                )}
                {withBody && (
                    <div className="card-body py-0">
                        <div className="table-responsive">
                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr className="ftext-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="establishmentKey">
                                            Clé
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="name">
                                            Structure d&apos;établissement
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="year">
                                            Année
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="collegeContractStudentsCount">
                                            Collège
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="lpContractStudentsCount">
                                            LTP
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="apprenticesCount">
                                            Apprentis
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="hoursCount">
                                            Heure stag.
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="status">
                                            Statut
                                        </SortableField>
                                    </tr>
                                </thead>
                                {!loading && !page?.nodes?.length ? (
                                    <NoResultFoundRow colSpan={8} />
                                ) : loading ? (
                                    <Loader />
                                ) : (
                                    <tbody className="text-gray-600 fw-bold">
                                        {page?.nodes?.map((e) => (
                                            <DTRow data={e} key={e.id} />
                                        ))}
                                    </tbody>
                                )}
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
            </div>
        </>
    );
};

export default EstablishmentStructure;
