import React from 'react';

export const FilterDropdownButton = React.forwardRef(({ children, onClick, isTouched }, ref) => (
    <button type="button" className="btn btn-secondary btn-sm me-3" onClick={onClick} ref={ref}>
        {isTouched && (
            <span className="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-5 start-10 animation-blink" />
        )}
        {children}
    </button>
));
