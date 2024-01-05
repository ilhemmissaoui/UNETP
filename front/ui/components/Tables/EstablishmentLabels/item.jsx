import { useState } from 'react';

import View from '../../Modals/View';
import Header from '../Establishments/components/Header';
import EstablishmentView from '../Establishments/View';

const EstablishmentItem = ({ data }) => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    console.log(data);
    return (
        <>
            {' '}
            <div className="d-flex text-dark fw-bolder text-hover-primary mb-1 fs-5">
                <div className="me-2">
                    <button className="btn btn-link fw-bolder p-0" onClick={toggleIsView}>
                        {data?.organization?.name}{' '}
                    </button>
                </div>
            </div>
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                bsPrefix="modal-header py-3"
                pluralName="establishments"
                id={data?.organization?.establishment?.id}
                customTitle={<Header data={data?.organization?.establishment} />}>
                <EstablishmentView />
            </View>
        </>
    );
};

export default EstablishmentItem;
