import React, { useState } from 'react';

import View from '../../../../Modals/View';
import UserView from '../../../../Users/components/View';

const DTRow = ({ data }) => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);

    return (
        <>
            <tr className="text-center">
                <td className=" align-items-center">
                    <button
                        type="button"
                        className="btn btn-link d-flex align-items-center p-0"
                        onClick={toggleIsView}>
                        <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                            <div className="symbol-label fs-3 bg-light-danger text-danger">
                                {data?.user?.lastName[0]?.toUpperCase()}
                                {data?.user?.firstName[0]?.toUpperCase()}
                            </div>
                        </div>
                        <div className="text-gray-800 text-hover-primary mb-1">
                            <span className="fw-bolder">
                                {' '}
                                {data?.user?.civility?.abbreviation} {data?.user?.firstName}{' '}
                            </span>{' '}
                            {data?.user?.lastName}
                        </div>
                    </button>
                </td>

                <td>
                    <span className="text-dark  text-hover mb-1 fs-7">
                        {data?.functionLabel?.singularMaleName}
                    </span>
                </td>
            </tr>
            <View
                isShow={isView}
                toggleIsShow={toggleIsView}
                size="xl"
                customTitle="Fiche personne"
                pluralName="users"
                id={data?.user?.id}
                label={`${data?.user?.civility?.abbreviation} ${data?.user?.firstName} ${data?.user?.lastName} `}>
                <UserView isMultipleTables={true} />
            </View>
        </>
    );
};

export default DTRow;
