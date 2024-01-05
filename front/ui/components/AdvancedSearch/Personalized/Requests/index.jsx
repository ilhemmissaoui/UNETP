import Link from 'next/link';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';
import EmptyState from '../../../EmptyState';
import { Ability } from '../../../GUARDS';
import NoResultFoundRow from '../../../NoResultFoundRow';
import Pagination from '../../../Pagination';
import DTRow from './DTRow';
import Loader from './Loader';

const Requests = ({ withBody = true, withFooter = true, withHeader = true, Row = DTRow }) => {
    const crud = useCRUD({
        singleName: 'request',
        pluralName: 'requests'
    });

    const { page, first, offset, isTouched, loading, currentPage, handlePage } = crud;

    return (
        <CRUDProvider {...crud}>
            {withHeader && (
                <div className="card-header border-0 pt-6">
                    <div className="card-toolbar" />
                    <div className="card-toolbar">
                        <Ability I="create" an="advancedSearch.personalized">
                            <Link href="/recherche-avancee/personnalise/requete/nouveau" passHref>
                                <a className="btn btn-primary btn-sm me-2">
                                    {' '}
                                    <i className="fa fa-plus"></i>
                                    Création{' '}
                                </a>
                            </Link>
                        </Ability>
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
                                        <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                            <th>Libellé</th>
                                            <th className="text-center"> Requête SQL</th>
                                            <th className="text-center">
                                                <i className="fa fa-bolt"></i>
                                            </th>
                                        </tr>
                                    </thead>
                                    {!loading && !page?.nodes?.length ? (
                                        <NoResultFoundRow colSpan={4} />
                                    ) : loading ? (
                                        <Loader />
                                    ) : (
                                        <tbody className="text-gray-600 fw-bold">
                                            {page?.nodes?.map((e) => (
                                                <Row data={e} key={e._id} />
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
                </>
            )}
        </CRUDProvider>
    );
};

export default Requests;
