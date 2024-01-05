import clsx from 'clsx';

const SortableField = ({ children, label, name, onChange, sortState, className }) => {
    return (
        <th
            onClick={onChange ? () => onChange(name) : undefined}
            role="columnheader"
            className={clsx(
                className,
                sortState?.field === name ? `table-sort-${sortState?.direction}` : null
            )}>
            {children || label}
        </th>
    );
};

export default SortableField;
