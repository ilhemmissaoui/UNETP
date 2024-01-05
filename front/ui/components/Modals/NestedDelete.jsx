import { useFieldArray } from 'react-hook-form';

import { CRUDProvider } from '../../../hooks/use-crud';
import Delete from './Delete';

const NestedDelete = ({ children, name, ...props }) => {
    const { remove } = useFieldArray({ name });
    return (
        <CRUDProvider _delete={remove}>
            <Delete {...props}>{children}</Delete>
        </CRUDProvider>
    );
};

export default NestedDelete;
