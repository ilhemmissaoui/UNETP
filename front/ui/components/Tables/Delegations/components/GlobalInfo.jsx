import React from 'react';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';

const GlobalInfo = ({ data }) => {
    const crud = useCRUD({
        singleName: 'delegation',
        pluralName: 'delegations'
    });

    return (
        <>
            <CRUDProvider {...crud}>
                <div className="form-group mb-3">
                    <span className="h4">Délégation :</span>
                </div>
                <span className="text-gray-500 fw-bolder">{data?.reference}-</span>{' '}
                <span className="text-gray-700 fw-bolder">{data?.organization?.name}</span>
            </CRUDProvider>
        </>
    );
};

export default GlobalInfo;
