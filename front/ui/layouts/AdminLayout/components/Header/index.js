/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import routes, { hiddenRoutes } from '../../navigation';
import BreadCrumbs from './components/BreadCrumbs';
import User from './components/User';

function Header() {
    const { pathname } = useRouter();
    const recursiveActiveElementCheck = (e) => {
        return e.link === pathname
            ? true
            : e?.children?.length
            ? e.children?.find(recursiveActiveElementCheck)
            : false;
    };
    const activeElement = [...routes, ...hiddenRoutes]?.find(recursiveActiveElementCheck);

    const openMobilAside = () => {
        document.getElementById('drawer-overlay').style.display = '';

        //Fix: add & remove those attribute to reset body state
        document.body.removeAttribute('data-kt-drawer-aside');
        document.body.removeAttribute('data-kt-drawer');
        document.body.setAttribute('data-kt-drawer-aside', 'on');
        document.body.setAttribute('data-kt-drawer', 'on');

        document.getElementById('default-aside').classList.add('drawer-on');
    };
    return (
        <div className="header align-items-stretch">
            <div className="container-fluid d-flex align-items-stretch justify-content-between">
                <div
                    className="d-flex align-items-center d-lg-none ms-n3 me-1"
                    title="Show aside menu">
                    <div
                        className="btn btn-icon btn-active-color-primary w-40px h-40px"
                        id="kt_aside_toggle"
                        onClick={() => openMobilAside()}>
                        <span className="svg-icon svg-icon-2x mt-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                                    fill="black"
                                />
                                <path
                                    opacity="0.3"
                                    d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                                    fill="black"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                    <Link href="/" passHref>
                        <a className="d-lg-none">
                            <img
                                alt={process.env.platformName}
                                className="h-30px"
                                src="/images/logos/logo.png"
                            />
                        </a>
                    </Link>
                </div>
                <div className="d-flex align-items-center" id="kt_header_wrapper">
                    <BreadCrumbs activeElement={activeElement} />
                </div>
                <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                    <div className="d-flex align-items-stretch" id="kt_header_nav"></div>
                    <div className="d-flex align-items-stretch justify-self-end flex-shrink-0">
                        <div className="d-flex align-items-stretch flex-shrink-0">
                            <User />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
