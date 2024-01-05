/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from 'clsx';
import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';

const AsideMenuItemWithSub = ({ children, title, icon, hasBullet, isOpen }) => {
    const [open, setOpen] = useState(isOpen);

    return (
        <div
            className={clsx('menu-item menu-accordion', { 'hover show': open }, { active: !open })}>
            <span className="menu-link" onClick={() => setOpen(!open)}>
                {hasBullet && (
                    <span className="menu-bullet">
                        <span className="bullet bullet-dot"></span>
                    </span>
                )}
                <span className="menu-icon">
                    <i className={clsx('bi fs-3', icon)}></i>
                </span>
                <span className="menu-title">{title}</span>
                <span className="menu-arrow"></span>
            </span>
            <Collapse in={open}>
                <div
                    className={clsx(
                        'menu-sub menu-sub-accordion',
                        { show: open },
                        { active: !open }
                    )}
                    onClick={() => setOpen(open)}>
                    {children}
                </div>
            </Collapse>
        </div>
    );
};

export default AsideMenuItemWithSub;
