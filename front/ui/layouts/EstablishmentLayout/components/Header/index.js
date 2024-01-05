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
    return (
        <div className="header align-items-stretch">
            <div className="container-fluid d-flex align-items-stretch justify-content-between">
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
