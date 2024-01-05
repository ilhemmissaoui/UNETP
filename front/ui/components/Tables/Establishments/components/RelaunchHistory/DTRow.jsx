import parse from 'html-react-parser';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import DateTimeFromat from '../../../../../../queryGeneratorFields/DataTables/Components/DateTimeFromat';
import { Ability } from '../../../../GUARDS';
import ViewCore from '../../../../Modals/ViewCore';

const statusMap = {
    true: 'succès',
    false: 'échec'
};

const DTRow = ({ data }) => {
    const [isView, setIsView] = useState();
    const toggleIsView = () => setIsView((v) => !v);
    const mailContent = JSON.parse(data?.content) || {};
    console.log(mailContent);
    return (
        <>
            <tr className="align-middle text-center">
                <td>
                    {' '}
                    <span className="text-dark mb-1 fs-7">{data.subject}</span>
                </td>
                <td>
                    <span className={`badge badge-light-${data?.status ? 'success' : 'danger'}`}>
                        {' '}
                        {statusMap[data.status]}
                    </span>
                </td>
                <td>
                    <DateTimeFromat isDateTime data={data.sendDate} />
                </td>
                <td>
                    <Ability I="view" an="establishment">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip id="tooltip-edit">Visualiser l&apos;email</Tooltip>}>
                            <button
                                className="btn btn-secondary btn-sm btn-icon"
                                onClick={toggleIsView}>
                                <i className="fa fa-eye"></i>
                            </button>
                        </OverlayTrigger>
                    </Ability>{' '}
                </td>
            </tr>
            <ViewCore
                isShow={isView}
                size={'xl'}
                customTitle={data.subject}
                toggleIsShow={toggleIsView}
                data={data.content}>
                <div>
                    <div>
                        De : <u>{mailContent?.from}</u>{' '}
                    </div>
                    <div>
                        À : <u>{mailContent?.to}</u>
                    </div>
                    {mailContent?.html && parse(mailContent?.html)}
                </div>
            </ViewCore>
        </>
    );
};

export default DTRow;
