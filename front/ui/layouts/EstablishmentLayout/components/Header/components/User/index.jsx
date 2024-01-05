import Link from 'next/link';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import useAuth from '../../../../../../../hooks/use-auth';
import { roles } from '../../../../../../../schemas/users';
import settings from '../../../../../../../settings';
import { generateFullName, generateShortName } from '../../../../../../utils/nav';
import UserDropdownButton from './UserDropdownButton';

const { endpointUrl } = settings;
const User = () => {
    const { logout } = useAuth();
    const { user } = useAuth();
    return (
        <Dropdown
            className="d-flex align-items-center ms-1 me-lg-3"
            id="kt_header_user_menu_toggle">
            <Dropdown.Toggle as={UserDropdownButton}>
                <div
                    role="presentation"
                    className="btn btn-active-light d-flex align-items-center bg-hover-light py-2 px-2 px-md-3">
                    <div className="d-none d-md-flex flex-column align-items-end justify-content-center me-2">
                        <span className="text-dark fs-base fw-bolder lh-1 mb-2">
                            {generateFullName(user?.profile)}
                        </span>
                        <span className="text-muted fs-7 fw-bold lh-1">FONCTION ICI</span>
                    </div>
                    <div className="symbol symbol-30px symbol-md-40px">
                        {user?.profile?.avatar ? (
                            <img
                                src={`${endpointUrl}/users/avatar/${user?.profile?.id}`}
                                alt={generateFullName(user?.profile)}
                            />
                        ) : (
                            <div className="symbol-label fs-4 fw-bold bg-light-primary text-primary">
                                {generateShortName(
                                    user?.profile?.firstName || '',
                                    user?.profile?.lastName || ''
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Dropdown.Toggle>
            <div
                className="cursor-pointer symbol symbol-30px symbol-md-40px"
                data-kt-menu-trigger="click"
                data-kt-menu-attach="parent"
                data-kt-menu-placement="bottom-end"></div>
            <Dropdown.Menu
                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
                data-kt-menu="true">
                <div className="menu-item px-3">
                    <div className="menu-content d-flex align-items-center px-3">
                        <div className="symbol symbol-50px me-5">
                            {!user?.profile?.avatar ? (
                                <div className="symbol-label fs-3 bg-light-danger text-danger">
                                    {generateShortName(
                                        user?.profile?.firstName || '',
                                        user?.profile?.lastName || ''
                                    )}
                                </div>
                            ) : (
                                <img
                                    src={`${endpointUrl}/users/avatar/${user?.profile?.id}`}
                                    alt="avatar"
                                    className="w-100"
                                />
                            )}
                        </div>
                        <div className="d-flex flex-column">
                            <div className="fw-bolder d-flex align-items-center fs-5">
                                {generateFullName(user?.profile)}
                            </div>
                            <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1">
                                {roles?.find((e) => e.id === user?.role)?.label}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="separator my-2" />
                <div className="menu-item">
                    <Link href="/mes-informations-personnelles" passHref>
                        <a href="#" className="menu-link px-5">
                            Mes informations personnelles
                        </a>
                    </Link>
                </div>
                <div className="menu-item my-1">
                    <Link href="/changement-mot-de-passe" passHref>
                        <a href="#" className="menu-link px-5">
                            Changement du mot de passe
                        </a>
                    </Link>
                </div>
                <div className="separator my-2" />

                <div className="menu-item">
                    <a href="#" className="menu-link px-5" onClick={logout}>
                        Se déconnecter
                    </a>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default User;
