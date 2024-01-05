import React from 'react';

const UserDropdownButton = React.forwardRef(({ children, onClick }, ref) => {
    return (
        <div
            ref={ref}
            onClick={onClick}
            className="cursor-pointer symbol symbol-30px symbol-md-40px"
            data-kt-menu-trigger="click"
            data-kt-menu-attach="parent"
            data-kt-menu-placement="bottom-end">
            {children}
        </div>
    );
});

export default UserDropdownButton;
