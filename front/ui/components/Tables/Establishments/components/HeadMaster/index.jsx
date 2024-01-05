import React, { useState } from 'react';

import View from '../../../../Modals/View';
import UserView from '../../../../Users/components/View/index';

const HeadMaster = ({ user, fn }) => {
    const [isViewUsers, setIsViewUsers] = useState();
    const toggleIsViewUsers = () => setIsViewUsers((v) => !v);

    return (
        <>
            <div>
                <button className="btn btn-link p-0 fw-bolder" onClick={toggleIsViewUsers}>
                    {`${user?.civility?.abbreviation} ${user?.firstName} ${user?.lastName}`}{' '}
                </button>

                <div className="text-muted fw-bold fs-7">
                    <span className="las la-user-tie" />
                    {`${fn?.functionLabel?.singularMaleName}`}
                </div>
            </div>
            {user && (
                <View
                    isShow={isViewUsers}
                    toggleIsShow={toggleIsViewUsers}
                    size="xl"
                    customTitle="Fiche personne"
                    pluralName="users"
                    id={user?.id}
                    label={` ${user?.civility?.abbreviation} ${user?.firstName} ${user?.lastName}`}>
                    <UserView isMultipleTables={true} />
                </View>
            )}
        </>
    );
};

export default HeadMaster;
