import { useState } from 'react';

import View from '../../../../Modals/View';
import UserView from '../../../../Users/components/View';
import Period from '../../../../Utils/Period';
const DTRowPrint = ({ data }) => {
    const [viewUser, setViewUser] = useState();
    const toggleViewUser = () => setViewUser((v) => !v);
    return (
        <>
            <tr className="text-center">
                <td className=" d-flex align-items-center">
                    <button
                        className="btn btn-link d-flex align-items-center p-0"
                        onClick={toggleViewUser}
                        type="button">
                        <div className="d-flex flex-column">
                            <a href="#" className="text-gray-800 text-hover-primary mb-1">
                                <span className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                                    {data?.user?.firstName}
                                </span>{' '}
                                <span className="text-dark  text-hover mb-1 fs-7">
                                    {data?.user?.lastName}
                                </span>
                            </a>
                        </div>
                    </button>
                </td>

                <td>
                    {' '}
                    <span className="text-dark  text-hover mb-1 fs-7">
                        {data?.functionLabel?.singularMaleName}
                    </span>
                    <span className="badge badge-primary fw-bolder ms-2">{data?.comment}</span>
                </td>

                <td>
                    <Period {...data} />
                </td>
            </tr>
            <View
                isShow={viewUser}
                toggleIsShow={toggleViewUser}
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

export default DTRowPrint;
