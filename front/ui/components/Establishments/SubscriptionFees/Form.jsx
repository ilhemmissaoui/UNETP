import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../hooks/use-crud';

const Form = ({ subscriptionFees }) => {
    const addForm = useFormContext();
    const { register } = addForm;
    const { subscriptionParams } = useMultiCRUDContext();
    const yearOptions = subscriptionParams.page.nodes.filter(function (obj) {
        return !subscriptionFees?.some(function (obj2) {
            return obj?.year == obj2?.year;
        });
    });

    useEffect(() => {
        console.log(yearOptions);
    }, [!subscriptionParams.loading]);

    return (
        <div>
            <div className="row"></div>
            <div className="col-md-12">
                <div className="form-group">
                    <div className="form-label">
                        <label htmlFor="">Année de cotisation :</label>
                    </div>
                    {!subscriptionParams.loading && (
                        <select className="form-control" {...register('year')}>
                            {yearOptions.map((e) => {
                                return (
                                    <option value={e.year} key={e.year}>
                                        {e.year}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Form;
