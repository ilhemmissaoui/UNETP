export const resolveVerticalNavMenuItemComponent = (item) => {
    if (item.header) return 'VerticalNavMenuSectionHeader';
    if (item.children) return 'VerticalNavMenuGroup';
    return 'VerticalNavMenuLink';
};

export const isActive = (tree, pathname) =>
    tree.children?.find((e) => e.navLink === pathname) ||
    (tree.children?.length && tree.children.find((e) => isActive(e, pathname)));
export const generateFullName = ({ civility, firstName, lastName } = {}) =>
    `${civility?.abbreviation} ${firstName} ${lastName}`;
export const generateShortName = (firstName, lastName) =>
    `${firstName ? firstName[0]?.toUpperCase() : ''}${lastName ? lastName[0]?.toUpperCase() : ''}`;
export const isNavLinkActive = (link, currentURL) => link === currentURL;
