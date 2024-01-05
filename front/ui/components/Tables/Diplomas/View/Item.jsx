import { useState } from 'react';

import View from '../../../Modals/View';
import EstablishmentView from '../../Establishments/View';
import Header from './EstablishmentHeader';
const EstablishmentItem = ({ data }) => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);

    return (
        <>
            <button
                className="btn btn-link d-flex text-dark text-hover-primary pb-1"
                onClick={toggleIsView}>
                <span className="badge badge-red fw-bolder fs-9 w-55px justify-content-center">
                    {data?.organization?.establishment?.establishmentKey}
                </span>
                <span className="fw-bold fs-6 ms-3"> {data?.organization?.name}</span>
            </button>
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                bsPrefix="modal-header py-3"
                pluralName="establishments"
                id={data?.organization?.establishment?.id}
                customTitle={<Header data={data} />}>
                <EstablishmentView />
            </View>
        </>
    );
};

export default EstablishmentItem;
