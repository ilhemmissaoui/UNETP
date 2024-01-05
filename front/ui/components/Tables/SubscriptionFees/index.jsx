import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

import useCRUD, { CRUDProvider } from '../../../../hooks/use-crud';
import settingSubsciptionFeeSchema from '../../../../schemas/settingSubscriptionFee';
import settings from '../../../../settings';
import Searchbar from '../../CRUD/Searchbar';
import SortableField from '../../CRUD/SortableField';
import EmptyState from '../../EmptyState';
import { Ability } from '../../GUARDS';
import Add from '../../Modals/Add';
import Create from '../../Modals/create';
import NoResultFoundRow from '../../NoResultFoundRow';
import Pagination from '../../Pagination';
import DTRow from './DTRow';
import Form from './Form';
import FormAutoAdd from './FormAutoAdd';
import Loader from './Loader';

const { endpointUrl } = settings;
const SubscriptionFees = ({ withHeader = true, withBody = true, withFooter = true }) => {
    const addForm = useForm({
        resolver: yupResolver(settingSubsciptionFeeSchema),
        defaultValues: {
            nextCall: 'Non renseigné'
        }
    });

    const crud = useCRUD({
        singleName: 'subscription-param',
        pluralName: 'subscription-params',
        defaultSort: { field: 'year', direction: 'desc' }
    });

    const {
        page,
        first,
        offset,
        loading,
        isTouched,
        currentPage,
        handlePage,
        search,
        handleSearch,
        sort,
        handleSort
    } = crud;

    const [lastYear, setLastYear] = useState();
    const [isShow, setIsShow] = useState();

    const [isAdd, setIsAdd] = useState();
    const toggleIsAdd = () => {
        setIsAdd((v) => {
            if (v) addForm.reset();
            return !v;
        });
    };
    const [isAddAuto, setIsAddAuto] = useState();
    const toggleIsAddAuto = () => {
        setIsAddAuto((v) => {
            if (v) addForm.reset();
            return !v;
        });
    };
    const onSearch = ({ target: { value } }) => handleSearch(value);

    const updateHook = async () => {
        const { data } = await axios.get(
            `${endpointUrl}/subscription-params/check-missing-subscription-fees`
        );
        setIsShow(data?.isMissing);
        setLastYear(data?.lastYear);
    };

    useEffect(() => {
        updateHook();
    }, []);

    return !loading && !isTouched && !page?.nodes?.length ? (
        <EmptyState action={toggleIsAdd} />
    ) : (
        <div className="card">
            <CRUDProvider {...crud}>
                {withHeader && (
                    <div className="card-header border-0 pt-6 py-10">
                        <div className="card-toolbar">
                            <Searchbar value={search} onChange={onSearch} />
                        </div>
                        <div className="card-toolbar">
                            <Ability I="create" an="subscription-param">
                                <button className="btn btn-sm btn-primary" onClick={toggleIsAdd}>
                                    <i className="fa fa-plus"></i>
                                    Création
                                </button>
                            </Ability>
                            {isShow && (
                                <Ability I="create" an="subscription-param">
                                    <button
                                        className="btn btn-sm btn-success ms-5"
                                        onClick={toggleIsAddAuto}>
                                        <i className="fa fa-plus"></i>
                                        Création automatique
                                    </button>
                                </Ability>
                            )}
                        </div>
                    </div>
                )}
                {withBody && (
                    <div className="card-body py-0">
                        <div className="table-responsive">
                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="year">
                                            Année
                                        </SortableField>
                                        <th>Sous Contrat</th>
                                        <th>Hors Contrat</th>

                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="cfaUfa">
                                            CFA/EFA
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="cfpCfc">
                                            CFP/CFC
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="employerCollegeOperation">
                                            Collége Empl.
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="headEstablishment">
                                            CE
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="otherLeader">
                                            Autre dérigeant
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="oldHeadEstablishment">
                                            Ancient
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="fixedPart034">
                                            Part Fixe(0,3,4)
                                        </SortableField>
                                        <SortableField
                                            sortState={sort}
                                            onChange={handleSort}
                                            name="fixedPart12">
                                            Part Fixe(1,2)
                                        </SortableField>

                                        <th className="text-center">
                                            <i className="fa fa-bolt"></i>
                                        </th>
                                    </tr>
                                </thead>

                                {!loading && !page?.nodes?.length ? (
                                    <NoResultFoundRow colSpan={12} />
                                ) : loading ? (
                                    <Loader />
                                ) : (
                                    <tbody className="fw-bold">
                                        {page?.nodes?.map((e) => (
                                            <DTRow data={e} key={e._id} />
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
                <FormProvider {...addForm}>
                    <Add
                        isShow={isAdd}
                        toggleShow={toggleIsAdd}
                        label="subscription-param"
                        formId="add-subscription-params"
                        singleName="subscription-param"
                        collectionLabel="une année de cotisation"
                        size="xl"
                        doReset={true}>
                        <form id="add-subscription-params">
                            <Form />
                        </form>
                    </Add>
                </FormProvider>

                <FormProvider {...addForm}>
                    <Create
                        isShow={isAddAuto}
                        toggleIsShow={toggleIsAddAuto}
                        formId="add-subscription-params"
                        prefix="subscription-params/create-missing-subscription-fees"
                        collectionLabel="cotisations manquantes"
                        label="automatique d'une année de cotisation"
                        size="xl"
                        lastYear={lastYear}
                        updateHook={updateHook}
                        doReset={true}>
                        <form id="add-subscription-params">
                            <FormAutoAdd lastYear={lastYear} />
                        </form>
                    </Create>
                </FormProvider>
            </CRUDProvider>
        </div>
    );
};

export default SubscriptionFees;
