import axios from 'axios';
import React, { useEffect, useState } from 'react';

import useToast from '../../../hooks/use-toast';
import settings from '../../../settings';
import ViewCore from './ViewCore';
const View = ({
    id,
    customTitle,
    pluralName,
    isShow = false,
    toggleIsShow,
    collectionLabel = 'élément',
    label = '',
    bsPrefix = 'modal-header',
    size,
    children
}) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const { setToast } = useToast();
    const fetchData = async () => {
        try {
            const response = await axios.get(`${settings.endpointUrl}/${pluralName}/${id}`);
            setData(response.data);
            setLoading(false);
        } catch (e) {
            setToast({
                message: `Erreur lors de la récupération de l'${collectionLabel}`,
                variant: 'danger'
            });
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!data && isShow) fetchData();
    }, [data, isShow]);
    return (
        <ViewCore
            isShow={isShow}
            toggleIsShow={toggleIsShow}
            label={label}
            loading={loading}
            data={data}
            size={size}
            bsPrefix={bsPrefix}
            customTitle={customTitle}>
            {children}
        </ViewCore>
    );
};

export default View;
