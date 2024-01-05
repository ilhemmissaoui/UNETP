import { useState } from 'react';

import View from '../../../../Modals/View';
import DiplomaView from '../../../Diplomas/View';

const DiplomaItem = ({ data }) => {
    const [view, setView] = useState();
    const toggleView = () => setView((v) => !v);
    return (
        <>
            {' '}
            <button className="btn btn-link d-block py-2" onClick={toggleView}>
                <span className="me-5">
                    <i className="fa fa-user-graduate text-primary"></i>
                </span>
                <span className="text-dark text-hover mb-1 fs-6">{data?.diploma?.name}</span>
            </button>{' '}
            <View
                isShow={view}
                toggleIsShow={toggleView}
                size="xl"
                pluralName="diplomas"
                id={data?.diploma?.id}
                label={data?.diploma?.name}>
                <DiplomaView />
            </View>
        </>
    );
};

export default DiplomaItem;
