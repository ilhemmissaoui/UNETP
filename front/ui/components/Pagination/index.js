/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import React from 'react';

export const getPagesCount = (totalSize, sizePerPage) => Math.ceil(totalSize / sizePerPage);

export const getPages = (page, pagesCount, paginationSize) => {
    const result = [];
    if (!page) return result;

    if (pagesCount === 1) {
        result.push(1);
        return result;
    }

    if (pagesCount < page) return result;

    if (pagesCount < paginationSize + 1) {
        for (let i = 1; i < pagesCount + 1; i++) result.push(i);

        return result;
    }

    if (page === 1) {
        for (let i = 1; i < paginationSize + 1; i++) if (i < pagesCount) result.push(i);

        return result;
    }

    if (page === pagesCount) {
        for (let i = pagesCount - paginationSize + 1; i <= pagesCount; i++)
            if (i <= pagesCount) result.push(i);

        return result;
    }

    const shiftCount = Math.floor(paginationSize / 2);
    if (shiftCount < 1) {
        result.push(page);
        return result;
    }

    if (page < shiftCount + 2) {
        for (let i = 1; i < paginationSize + 1; i++) result.push(i);

        return result;
    }

    if (pagesCount - page < shiftCount + 2) {
        for (let i = pagesCount - paginationSize; i < pagesCount + 1; i++) result.push(i);

        return result;
    }

    for (let i = page - shiftCount; i < page; i++) if (i > 0) result.push(i);

    result.push(page);
    for (let i = page + 1; i < page + shiftCount + 1; i++) if (i <= pagesCount) result.push(i);

    return result;
};
function Pagination(props) {
    let {
        totalSize,
        sizePerPage = 8,
        page,
        paginationSize = 5,
        offset,
        itemsCount,
        isLoading
    } = props;
    page = parseInt(page);
    const pagesCount = getPagesCount(totalSize, sizePerPage);
    const pages = getPages(page, pagesCount, paginationSize);

    const handleFirstPage = ({ onPageChange }) => {
        onPageChange(1);
    };
    const handleLastPage = ({ onPageChange }) => {
        onPageChange(pagesCount);
    };

    const handlePrevPage = ({ page, onPageChange }) => {
        if (page === 1) return;
        onPageChange(page - 1);
    };

    const handleNextPage = ({ page, onPageChange }) => {
        if (page < pagesCount) onPageChange(page + 1);
    };

    const handleSelectedPage = ({ onPageChange }, pageNum) => {
        onPageChange(pageNum);
    };

    const disabledClass = pagesCount > 1 ? '' : 'd-none';
    return (
        !Number.isNaN(totalSize) && (
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                    {pagesCount < 2 && <></>}
                    {pagesCount > 1 && (
                        <>
                            <nav role="navigation" className={disabledClass}>
                                <ul className="pagination my-0">
                                    <li className={clsx('page-item', { disabled: page === 1 })}>
                                        <a
                                            href="#"
                                            className="page-link"
                                            title="Première page"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleFirstPage(props);
                                            }}>
                                            <i className="fa fa-angle-double-left"></i>
                                            <span className="sr-only">Première page</span>
                                        </a>
                                    </li>
                                    <li className={clsx('page-item', { disabled: page === 1 })}>
                                        <a
                                            href="#"
                                            className="page-link"
                                            title="Précédent"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePrevPage(props);
                                            }}>
                                            <i className="fa fa-angle-left"></i>
                                            <span className="sr-only">Précédent</span>
                                        </a>
                                    </li>
                                    {Math.min(...pages) > 1 && (
                                        <li className="page-item">
                                            <a href="#" className="page-link disabled">
                                                ...
                                            </a>
                                        </li>
                                    )}
                                    {pages.map((p) => (
                                        <li
                                            key={p}
                                            className={clsx('page-item', { active: page == p })}>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleSelectedPage(props, p);
                                                }}
                                                className="page-link">
                                                {p}
                                            </a>
                                        </li>
                                    ))}

                                    {Math.max(...pages) < pagesCount && (
                                        <li className="page-item">
                                            <a href="#" className="page-link disabled">
                                                ...
                                            </a>
                                        </li>
                                    )}
                                    <li
                                        className={clsx('page-item', {
                                            disabled: page === pagesCount
                                        })}>
                                        <a
                                            href="#"
                                            className="page-link"
                                            title="Suivant"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNextPage(props);
                                            }}>
                                            <i className="fa fa-angle-right"></i>
                                            <span className="sr-only">Suivant</span>
                                        </a>
                                    </li>
                                    <li
                                        className={clsx('page-item', {
                                            disabled: page === pagesCount
                                        })}>
                                        <a
                                            href="#"
                                            className="page-link"
                                            title="Dernière page"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleLastPage(props);
                                            }}>
                                            <i className="fa fa-angle-double-right"></i>
                                            <span className="sr-only">Dernière page</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </>
                    )}
                </div>
                <div className="d-flex text-muted">
                    <small>
                        {isLoading ? (
                            'Chargement...'
                        ) : (
                            <>
                                Affichage de l&apos;élément de <b>{offset + 1}</b> à{' '}
                                <b>{offset + itemsCount}</b> sur <b>{totalSize}</b> éléments
                            </>
                        )}
                    </small>
                </div>
            </div>
        )
    );
}
export default Pagination;
