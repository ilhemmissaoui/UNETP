import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';
import EmptyState from '../../../EmptyState';
import Pagination from '../../../Pagination';
import DTRow from './DTRow';

const Organization = ({ withHeader = true, withBody = true, withFooter = true }) => {
    const { query } = useRouter();

    const crud = useCRUD({
        singleName: 'organization',
        pluralName: 'organizations',
        prefix: 'trash'
    });

    const { page, first, offset, search, currentPage, handlePage, handleSearch, loading } = crud;

    const onSearch = ({ target: { value } }) => handleSearch(value);

    useEffect(() => {
        if (query?.name) {
            handleSearch(query?.name);
        }
    }, [query?.name]);

    return (
        <>
            <div className="card">
                <CRUDProvider {...crud}>
                    {withHeader && (
                        <div className="card-header mt-2">
                            <div className="card-title">
                                <div className="position-relative my-1">
                                    <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ps-10">
                                        <svg
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect
                                                opacity="0.5"
                                                x="17.0365"
                                                y="15.1223"
                                                width="8.15546"
                                                height={2}
                                                rx={1}
                                                transform="rotate(45 17.0365 15.1223)"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </span>
                                    <input
                                        defaultValue={search}
                                        placeholder="Recherche"
                                        onChange={onSearch}
                                        type="text"
                                        className={clsx(
                                            'form-control form-control-sm form-control-solid w-200px ps-10'
                                        )}
                                    />
                                </div>{' '}
                            </div>{' '}
                        </div>
                    )}

                    {!loading ? (
                        !page?.nodes?.length ? (
                            <EmptyState
                                title="Non trouvé"
                                statement="Il n'y a aucun organisation à afficher ."
                                description="créez votre premier article"
                            />
                        ) : (
                            <>
                                {withBody && (
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                                <thead>
                                                    <tr className="ftext-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                                        <th>NOM</th>
                                                        <th>DERNIÉRE MODIFICATION </th>
                                                        <th className="text-center">
                                                            <i className="fa fa-bolt"></i>{' '}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-600 fw-bold">
                                                    {page?.nodes?.map((e) => (
                                                        <DTRow data={e} key={e.id} />
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {withFooter && (
                                    <div className="card-footer">
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
                        )
                    ) : (
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <Spinner animation="border" />
                        </div>
                    )}
                </CRUDProvider>
            </div>
        </>
    );
};

export default Organization;
