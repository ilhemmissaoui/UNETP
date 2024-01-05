import { useFieldArray } from 'react-hook-form';

import { CRUDProvider } from '../../../hooks/use-crud';
import Update from './Update';

const NestedUpdate = ({ children, name, control, ...props }) => {
    const { update } = useFieldArray({ control, name });
    const _udpdate = ({ id, data }) => {
        update(id, data);
    };
    return (
        <CRUDProvider update={_udpdate}>
            <Update {...props}>{children}</Update>
        </CRUDProvider>
    );
};

export default NestedUpdate;
