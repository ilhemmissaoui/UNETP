import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

const AsideMenuItem = ({ children, to, title, icon, hasBullet = false, isActive }) => {
    return (
        <div className="menu-item">
            <Link href={to} passHref>
                <a className={clsx('menu-link without-sub', { active: isActive })}>
                    {hasBullet && (
                        <span className="menu-bullet">
                            <span className="bullet bullet-dot"></span>
                        </span>
                    )}
                    <span className="menu-icon">
                        <i className={clsx('bi fs-3', icon)}></i>
                    </span>
                    <span className="menu-title">{title}</span>
                </a>
            </Link>
            {children}
        </div>
    );
};

export default AsideMenuItem;
