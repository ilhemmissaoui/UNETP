import { useState } from 'react';

import View from '../../Modals/View';
import Header from '../../Tables/Diplomas/View/EstablishmentHeader';
import EstablishmentView from '../../Tables/Establishments/View';

const EstablishmentItem = ({ data }) => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    return (
        <div className="d-flex align-items-center ps-10 mb-n1">
            <span className="bullet me-3  menu-state-bullet-primary" />
            <span className="me-2 badge badge-primary badge-lg">
                {data?.organization?.establishment?.establishmentKey}
            </span>

            <div className=" d-flex fw-semibold fs-6 text-primary">
                <span className="btn btn-link" onClick={toggleIsView}>
                    {data?.organization?.name},
                </span>

                <div className="text-muted fw-bold fs-7 mt-4 ms-1">
                    {' '}
                    <span className="las la-user-tie "></span>
                    {data?.functionLabel?.singularMaleName}
                </div>
            </div>
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
        </div>
    );
};

export default EstablishmentItem;
