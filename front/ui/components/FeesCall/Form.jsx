import Decimal from 'decimal.js';
import { useFormContext } from 'react-hook-form';

import { FormatPrice } from '../../utils/currency';

const Form = ({
    fixedPartAmount,
    variablePart,
    customAmount,
    keyEtab,
    totalPart,
    amountPart,
    subscriptionParam,
    index
}) => {
    const updateForm = useFormContext();
    const { register } = updateForm;
    return (
        <div className="card-body p-2">
            <span className="text-gray-700 fs-4 fw-bolder  ">Cotisation établissement :</span>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <div className=" mb-2">
                    <span className="fw-bold text-gray-600 fs-5 mb-2">
                        Part fixe :{' '}
                        <span className="fw-bolder text-black fs-5">
                            <FormatPrice value={fixedPartAmount} />
                        </span>
                    </span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">Part variable :</span>
                    <span className="fw-bold col-lg-8 fs-6"></span>
                </div>
                <div className="separator my-5" />
                <div className="table-responsive">
                    <table className="table align-middlegy-2 no-footer  ">
                        <thead className="text-start text-muted fw-bolder fs-7 text-uppercase text-center">
                            {variablePart?.sector && <th>Secteurs </th>}
                            {variablePart?.labels.map((e, i) => (
                                <>
                                    <th key={i}> {e}</th>
                                    <th>{variablePart.multiplierLabels[e]}</th>
                                </>
                            ))}
                            <th>Montants</th>
                        </thead>
                        <tbody className="text-start text-dark fw-bolder fs-7 text-uppercase text-center">
                            <tr>
                                {variablePart?.value.map((e, i) => {
                                    return (
                                        <>
                                            {variablePart.sector && <td>{variablePart.sector}</td>}
                                            <td className="col-md-2" key={i}>
                                                {' '}
                                                <input
                                                    disabled={customAmount !== null}
                                                    type="number"
                                                    min={0}
                                                    step={1}
                                                    name={e}
                                                    className="form-control text-center"
                                                    {...register(`capacityHistories.${index}.${e}`)}
                                                />
                                            </td>
                                            <td>
                                                x{' '}
                                                <FormatPrice
                                                    value={
                                                        subscriptionParam[
                                                            variablePart?.multiplierAmount[e]
                                                        ] || 0
                                                    }
                                                />
                                            </td>
                                        </>
                                    );
                                })}
                                <td>
                                    {' '}
                                    <FormatPrice value={new Decimal(amountPart) || 0} />{' '}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot className=" notice border bg-light-primary border-dashed border-primary rounded  ">
                            <tr className="fw-bolder fs-6 text-gray-900 text-center">
                                <th className="text-end" colSpan={keyEtab === 0 ? 10 : 3}>
                                    Totale
                                </th>
                                <th>
                                    <FormatPrice value={new Decimal(totalPart) || 0} />{' '}
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Form;
