import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import { AbilityContext } from '../../../../../lib/ability';
import navigation from '../../navigation';
import AsideMenuItem from './AsideMenuItem';
import AsideMenuItemWithSub from './AsideMenuItemWithSub';

const AsideMenu = ({ height }) => {
    const { pathname } = useRouter();
    const [heightScrollable, setHeightScrollable] = useState(0);
    useEffect(() => {
        setHeightScrollable(height - 173);
    }, [height]);
    const ability = useContext(AbilityContext);
    const userNavigation = navigation.filter((e) => {
        return !e?.ability || ability?.can(e?.ability[0], e?.ability[1]);
    });
    return (
        <div
            className="hover-scroll-overlay-y my-5 my-lg-5"
            style={{ height: `${heightScrollable}px` }}>
            <div
                id="#kt_aside_menu"
                data-kt-menu="true"
                className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500">
                {userNavigation.map((item, idx) => {
                    const isActive = !['separator', 'section'].includes(item.type)
                        ? item.type === 'link'
                            ? item?.link === pathname
                            : item?.link && !item?.children?.length
                            ? item.link === pathname
                            : item.children.find((e) => e.link === pathname)
                        : null;

                    return (
                        <>
                            {!!idx && userNavigation[idx].group != userNavigation[idx - 1]?.group && (
                                <div className="menu-item" key={idx}>
                                    <div className="menu-content">
                                        <div className="separator mx-1 my-2" />
                                    </div>
                                </div>
                            )}
                            {item.type === 'section' ? (
                                <div className="menu-item" key={idx}>
                                    <div className="menu-content pt-4 pb-2">
                                        <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                                            {item.title}
                                        </span>
                                    </div>
                                </div>
                            ) : item.type === 'link' ? (
                                <AsideMenuItem
                                    key={idx}
                                    to={item.link}
                                    title={item.title}
                                    icon={item.icon}
                                    isActive={isActive}
                                />
                            ) : (
                                item.type === 'accordion' && (
                                    <AsideMenuItemWithSub
                                        isOpen={item.children.find((e) => e.link === pathname)}
                                        key={idx}
                                        title={item.title}
                                        icon={item.icon}>
                                        {item?.children?.length > 0 &&
                                            item?.children?.map((subitem, idx) => {
                                                const isActive = subitem.link === pathname;
                                                return (
                                                    <AsideMenuItem
                                                        key={idx}
                                                        to={subitem.link}
                                                        title={subitem.title}
                                                        icon={subitem.icon}
                                                        isActive={isActive}
                                                    />
                                                );
                                            })}
                                    </AsideMenuItemWithSub>
                                )
                            )}
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default AsideMenu;
