import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FormatPrice } from '../../../utils/currency';
import { getCurrentYear } from '../../../utils/time';
import { Ability } from '../../GUARDS';
import View from '../../Modals/View';
import ViewSubscriptionFees from './View';

const DTRow = ({ data }) => {
    const [isShow, setIsShow] = useState();
    const toggleIsShow = () => {
        setIsShow((v) => !v);
    };
    const currentYear = getCurrentYear();
    return (
        <>
            <tr>
                <td>
                    {' '}
                    <span className="badge badge-danger">{data?.year} </span>
                </td>
                <td>
                    <div className="fw-bold fs-6 text-gray-800">
                        {' '}
                        Collége :{' '}
                        <span className="text-primary fw-bold">
                            <FormatPrice value={data?.schoolContractAmount} />
                        </span>
                    </div>
                    <div className="fw-bold fs-6 text-gray-800">
                        {' '}
                        LP :{' '}
                        <span className="text-primary fw-bold">
                            {' '}
                            <FormatPrice value={data?.lpContractAmount} />
                        </span>
                    </div>
                    <div className="fw-bold fs-6 text-gray-800 ">
                        {' '}
                        LGT :{' '}
                        <span className="text-primary fw-bold">
                            {' '}
                            <FormatPrice value={data?.lgtContractAmount} />
                        </span>
                    </div>
                    <div className="fw-bold fs-6 text-gray-800 ">
                        {' '}
                        BTS :{' '}
                        <span className="text-primary fw-bold">
                            {' '}
                            <FormatPrice value={data?.btsContractAmount} />
                        </span>
                    </div>
                    <div className="fw-bold fs-6 text-gray-800 ">
                        {' '}
                        Sup + CPGE :{' '}
                        <span className="text-primary fw-bold">
                            {' '}
                            <FormatPrice value={data?.scSup} />
                        </span>
                    </div>
                    {!isNaN(parseInt(data?.scOther)) && parseInt(data?.scOther) ? (
                        <div className="fw-bold fs-6 text-gray-800 ">
                            Autre :{' '}
                            <span className="text-primary fw-bold">
                                {' '}
                                <FormatPrice value={data?.scOther} />
                            </span>
                        </div>
                    ) : null}
                </td>
                <td>
                    {data?.year === currentYear && (
                        <div>
                            <div className="fw-bold fs-6 text-gray-800 ">
                                {' '}
                                LP :{' '}
                                <span className="text-primary fw-bold">
                                    <FormatPrice value={data?.lpWithoutContract} />
                                </span>
                            </div>
                            <div className="fw-bold fs-6 text-gray-800 ">
                                {' '}
                                LGT :{' '}
                                <span className="text-primary fw-bold">
                                    {' '}
                                    <FormatPrice value={data?.ltWithoutContract} />
                                </span>
                            </div>
                            <div className="fw-bold fs-6 text-gray-800 ">
                                {' '}
                                BTS :{' '}
                                <span className="text-primary fw-bold">
                                    {' '}
                                    <FormatPrice value={data?.btsWithoutContract} />
                                </span>
                            </div>
                            <div className="fw-bold fs-6 text-gray-800 ">
                                {' '}
                                Sup + CPGE :{' '}
                                <span className="text-primary fw-bold">
                                    {' '}
                                    <FormatPrice value={data?.supWithoutContract} />
                                </span>
                            </div>
                            {!isNaN(parseInt(data?.hcOther)) && parseInt(data?.hcOther) ? (
                                <div className="fw-bold fs-6 text-gray-800 ">
                                    Autre :{' '}
                                    <span className="text-primary fw-bold">
                                        <FormatPrice value={data?.hcOther} />
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    )}
                </td>
                <td>
                    <div className="fw-bold fs-6 text-gray-800 ">
                        <FormatPrice value={data?.cfaUfa} />
                    </div>
                </td>
                <td>
                    <div className="fw-bold fs-6 text-gray-800 ">
                        <FormatPrice value={data?.cfpCfc} />
                    </div>
                </td>
                <td>
                    <div className="fw-bold fs-6 text-gray-800 ">
                        <FormatPrice value={data?.employerCollegeOperation} />
                    </div>
                </td>
                <td>
                    <div className="fw-bold fs-6 text-gray-800 ">
                        <FormatPrice value={data?.headEstablishment} />
                    </div>
                </td>
                <td>
                    <div className="fw-bold fs-6 text-gray-800 ">
                        <FormatPrice value={data?.otherLeader} />
                    </div>
                </td>
                <td>
                    <div className="fw-bold fs-6 text-gray-800 ">
                        <FormatPrice value={data?.oldHeadEstablishment} />
                    </div>
                </td>
                <td>
                    <div className="fw-bold fs-6 text-gray-800 ">
                        <FormatPrice value={data?.fixedPart034} />
                    </div>
                </td>
                <td>
                    <div className="fw-bold fs-6 text-gray-800 ">
                        <FormatPrice value={data?.fixedPart12} />
                    </div>
                </td>

                <td className="text-center">
                    <div className="btn-group">
                        <Ability I="view" an="subscription-param">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Visualiser</Tooltip>}>
                                <button
                                    className="btn btn-secondary btn-sm btn-icon"
                                    onClick={toggleIsShow}>
                                    <i className="fa fa-eye"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>
                    </div>
                </td>
            </tr>

            <View
                collectionLabel=""
                isShow={isShow}
                toggleIsShow={toggleIsShow}
                size="xl"
                id={data?.id}
                pluralName="subscription-params"
                label={data?.lastLogCall}>
                <ViewSubscriptionFees />
            </View>
        </>
    );
};

export default DTRow;
