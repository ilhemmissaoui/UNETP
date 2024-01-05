/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';

import useWindowDimensions from '../../../hooks/use-window-dimensions';
import AsideDefault from './components/aside/AsideDefault';
import Footer from './components/Footer';
import Header from './components/Header';

const closeMobileAside = () => {
    document.body.removeAttribute('data-kt-drawer-aside');
    document.body.removeAttribute('data-kt-drawer');
    document.getElementById('default-aside').classList.remove('drawer-on');
    document.getElementById('drawer-overlay').style.display = 'none';
};

const AdminLayout = ({ children }) => {
    const { height, width } = useWindowDimensions();
    useEffect(() => {
        if (width >= 992 && document.body.hasAttribute('data-kt-drawer-aside')) {
            closeMobileAside();
        }
    }, [width]);
    useEffect(() => {
        document.body.classList.add('aside-enabled');
        document.body.classList.add('aside-fixed');
        return () => {
            document.body.classList.remove('aside-enabled');
            document.body.classList.remove('aside-fixed');
        };
    }, []);

    return (
        <>
            <div className="page d-flex flex-row flex-column-fluid">
                <AsideDefault height={height} />
                <div className="wrapper d-flex flex-column flex-row-fluid">
                    <Header />
                    <div className="content d-flex flex-column flex-column-fluid">
                        <div className="post d-flex flex-column-fluid">{children}</div>
                    </div>
                    <Footer />
                </div>
            </div>
            <div
                id="drawer-overlay"
                className="drawer-overlay"
                style={{ zIndex: 109, display: 'none' }}
                onClick={() => closeMobileAside()}
            />
        </>
    );
};

export default AdminLayout;
