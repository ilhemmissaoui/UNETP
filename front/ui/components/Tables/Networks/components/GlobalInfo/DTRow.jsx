import React from 'react';
import NumberFormat from 'react-number-format';

const DTRow = ({ data }) => {
    return (
        <>
            <tr className="align-middle">
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
                    <span className="text-dark  text-hover mb-1 fs-7">
                        <NumberFormat
                            displayType="text"
                            format="## ## ## ## ##"
                            value={data?.phoneNumber}
                        />{' '}
                    </span>{' '}
                </td>

                <td>
                    <span className="text-dark  text-hover mb-1 fs-7">
                        {data?.voiceNumber} {data?.voiceLabel}
                    </span>
                    <br />
                    <span className="text-dark  text-hover mb-1 fs-7">
                        {' '}
                        {data?.addressLine1} {data?.addressLine2} {data?.zipCode} {data?.city}
                        {!!data?.cedex?.length && `- ${data?.cedex}`}
                    </span>
                    <br />
                    <span className="text-dark  text-hover mb-1 fs-7">{data?.country?.label}</span>
                </td>

                <td>
                    <span className="text-dark  text-hover mb-1 fs-7"> {data?.fax} </span>{' '}
                </td>
            </tr>
        </>
    );
};

export default DTRow;
