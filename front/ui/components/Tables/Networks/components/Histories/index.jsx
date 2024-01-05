import React from 'react';

import useCRUD, { MultiCRUDProvider } from '../../../../../../hooks/use-crud';
import List from './List';

const Histories = ({ data }) => {
    const historyTypes = useCRUD({
        singleName: 'history-type',
        pluralName: 'history-types'
    });
    return (
        <MultiCRUDProvider historyTypes={historyTypes}>
            <List data={data} />
        </MultiCRUDProvider>
    );
};

export default Histories;
