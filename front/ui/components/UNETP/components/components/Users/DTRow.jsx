import moment from 'moment';
import { useState } from 'react';

import View from '../../../../Modals/View';
import UserView from '../../../../Users/components/View';
const DTRow = ({ data }) => {
    const [viewUser, setViewUser] = useState();
    const toggleViewUser = () => setViewUser((v) => !v);
    return (
        <>
            <tr className="text-center">
                <td className=" align-items-center">
                    <button
                        className="btn btn-link d-flex align-items-center p-0"
                        onClick={toggleViewUser}
                        type="button">
                        <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                            <button className="btn btn-link p-0">
                                <div className="symbol-label fs-3 bg-light-danger text-danger">
                                    {data?.user?.firstName[0]?.toUpperCase()}
                                    {data?.user?.lastName[0]?.toUpperCase()}
                                </div>
                            </button>
                        </div>
                        <div className="d-flex flex-column">
                            <a href="#" className="text-gray-800 text-hover-primary mb-1">
                                {data?.user?.civility?.abbreviation}{' '}
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
                    <div className="badge badge-light fw-bolder">
                        {data?.date
                            ? moment(data?.date).format('DD/MM/YYYY')
                            : data?.startDate && data?.endDate
                            ? `${moment(data?.startDate).format('DD/MM/YYYY')} - ${moment(
                                  data?.endDate
                              ).format('DD/MM/YYYY')}`
                            : data?.endDate || data?.startDate
                            ? moment(data?.startDate || data?.endDate).format('DD/MM/YYYY')
                            : ''}
                    </div>
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

export default DTRow;
