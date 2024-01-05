import { useState } from 'react';

import View from '../../../Modals/View';
import Header from '../../Establishments/components/Header';
import EstablishmentView from '../../Establishments/View';

const EstablishmentItem = ({ data }) => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    return (
        <>
            <button className="btn btn-link d-block pb-2 ms-3" onClick={toggleIsView}>
                {data?.name}
            </button>
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                bsPrefix="modal-header py-3"
                pluralName="establishments"
                id={data?.establishment?.id}
                customTitle={<Header data={data?.establishment} />}>
                <EstablishmentView />
            </View>
        </>
    );
};

export default EstablishmentItem;
