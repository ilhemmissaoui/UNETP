import React from 'react';

import fieldsMapper from '../../../../../queryGeneratorFields/DataTables/index';

const DTRow = ({ data }) => {
    return (
        <tr className="align-middle">
            {Object.entries(data).map(([key, value], i) => {
                const component = fieldsMapper[key]?.component;
                return (
                    <td className="text-center fw-bold fs-6 text-gray-700  " key={i}>
                        {component && component(value)}
                    </td>
                );
            })}
        </tr>
    );
};

export default DTRow;
