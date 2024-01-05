import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function Breadcrumb({ activeElement }) {
    const { pathname } = useRouter();
    const recursiveActiveElementCheck = (e) => {
        return e.link === pathname
            ? true
            : e?.children?.length
            ? !!e.children?.find(recursiveActiveElementCheck)
            : false;
    };
    const currentElement = activeElement?.children?.find(recursiveActiveElementCheck);
    return (
        <div
            className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-20 pb-2 pb-lg-0"
            data-kt-swapper="true"
            data-kt-swapper-mode="prepend"
            data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_wrapper'}">
            <h1 className="text-dark fw-bolder my-1 fs-3 lh-1">
                {currentElement ? currentElement?.title : activeElement?.title}
            </h1>
            <ul className="breadcrumb fw-bold fs-8 my-1">
                {activeElement?.link !== '/' && (
                    <li className="breadcrumb-item text-muted">
                        <Link href="/" passHref>
                            <a className="text-muted">Accueil</a>
                        </Link>
                    </li>
                )}
                {currentElement ? (
                    <>
                        <li className="breadcrumb-item text-muted">{activeElement?.title}</li>
                        <li className="breadcrumb-item text-dark">{currentElement?.title}</li>
                    </>
                ) : (
                    <li className="breadcrumb-item text-dark">{activeElement?.title}</li>
                )}
            </ul>
        </div>
    );
}

export default Breadcrumb;
