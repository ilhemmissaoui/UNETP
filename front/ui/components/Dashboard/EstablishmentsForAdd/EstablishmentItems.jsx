import { useState } from 'react';

import Confirm from '../../Modals/confirm';
import DTRow from './EstablishmentView';

const EstablishmentItems = ({ data }) => {
    const [isConfirm, setIsConfirm] = useState();
    const [customTitle, setCustomTitle] = useState();
    const toggleIsConfirm = (name) => {
        setCustomTitle(name);
        setIsConfirm((v) => !v);
    };
    return (
        <>
            <div>
                {data?.map((e) => (
                    <div key={e}>
                        <div className="d-flex ps-10 mb-n1">
                            <div className="d-flex align-items-center">
                                <span className="bullet me-3  menu-state-bullet-primary" />
                                <span
                                    className="btn btn-link  fw-semibold fs-6 text-primary"
                                    onClick={() => toggleIsConfirm(e)}>
                                    {e}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="separator separator-dashed mt-5" />

                <Confirm
                    isShow={isConfirm}
                    toggleIsShow={toggleIsConfirm}
                    title={`Déclaration ${customTitle}`}
                    size="lg">
                    <DTRow />
                </Confirm>
            </div>
        </>
    );
};

export default EstablishmentItems;
