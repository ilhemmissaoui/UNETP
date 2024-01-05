import moment from 'moment';
import React from 'react';
import NumberFormat from 'react-number-format';
const ViewRow = ({ data }) => {
    return (
        <tr className="align-middle text-center fs-7 text-gray-800">
            <td>
                <a href={`tel:${data?.phoneNumber}`} hrel="noreferrer">
                    <NumberFormat
                        displayType="text"
                        format="## ## ## ## ##"
                        value={data?.phoneNumber}
                    />{' '}
                </a>
            </td>
            <td>
                <span className="fw-bolder col-lg-8 fs-7">
                    <a
                        href={`mailTo:${data?.email}`}
                        target="_blank"
                        hrel="noreferrer"
                        rel="noreferrer">
                        {data?.email}
                    </a>
                </span>
            </td>

            <td>
                <div>
                    {data?.voiceLabel} <br />
                    {data?.zipCode} {data.city}
                </div>
            </td>
            <td>{data?.fax}</td>

            <td>
                <a target="_blank" href={data?.website} rel="noreferrer">
                    {data?.website}
                </a>
            </td>
            <td>{data?.createdAt ? moment(data?.createdAt).format('DD/MM/YYYY HH:mm') : ''}</td>
        </tr>
    );
};
ViewRow.columnsCount = 4;

export default ViewRow;
