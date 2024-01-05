import { useFieldArray } from 'react-hook-form';

import { CRUDProvider } from '../../../hooks/use-crud';
import Add from './Add';

const NestedAdd = ({ children, name, control, ...props }) => {
    const { append } = useFieldArray({ control, name });
    return (
        <CRUDProvider add={append}>
            <Add {...props}>{children}</Add>
        </CRUDProvider>
    );
};

export default NestedAdd;
