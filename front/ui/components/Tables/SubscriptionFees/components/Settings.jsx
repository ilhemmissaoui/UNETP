import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';

const Settings = () => {
    const form = useFormContext();
    const {
        control,
        register,
        formState: { errors }
    } = form;

    return (
        <>
            <div className="notice bg-light rounded border p-7 mb-3">
                <div className="flex-shrink-0 text-gray-800 fs-5 fw-bolder">
                    <div className="mb-1">
                        Une année de cotisation s&apos;exprime sous la forme xxxx-yyyy
                    </div>
                    <span>Les différents taux sont exprimés en euros.</span>
                </div>
            </div>
            <div className="separator my-5" />
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            Année :
                        </label>
                        <Controller
                            name="year"
                            control={control}
                            render={({ field }) => (
                                <NumberFormat
                                    allowEmptyFormatting={false}
                                    format="####-####"
                                    mask="_"
                                    type="text"
                                    placeholder="Ex: 2020-2021"
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.year
                                    })}
                                    name="year"
                                    onChange={({ target: { value } }) => {
                                        field.onChange(value);
                                    }}
                                    value={field.value}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                        <span className="invalid-feedback d-flex">{errors?.year?.message}</span>
                    </div>
                </div>{' '}
            </div>
            <div className="separator my-3" />
            <label className="form-label fw-bolder fs-5">Taux par élève</label>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            Collège (depuis 2019/2020) :
                        </label>

                        <input
                            type="number"
                            step="any"
                            className={clsx('form-control', {
                                'is-invalid': errors?.schoolContractAmount
                            })}
                            {...register('schoolContractAmount')}
                        />
                        <span className="invalid-feedback">
                            {errors?.schoolContractAmount?.message}
                        </span>
                    </div>
                </div>{' '}
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            LP :
                        </label>

                        <input
                            type="number"
                            step="any"
                            className={clsx('form-control', {
                                'is-invalid': errors?.lpContractAmount
                            })}
                            {...register('lpContractAmount')}
                        />
                        <span className="invalid-feedback">
                            {errors?.lpContractAmount?.message}
                        </span>
                    </div>
                </div>{' '}
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            LGT :
                        </label>

                        <input
                            type="number"
                            step="any"
                            className={clsx('form-control', {
                                'is-invalid': errors?.lgtContractAmount
                            })}
                            {...register('lgtContractAmount')}
                        />
                        <span className="invalid-feedback">
                            {errors?.lgtContractAmount?.message}
                        </span>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            BTS :
                        </label>

                        <input
                            type="number"
                            step="any"
                            className={clsx('form-control', {
                                'is-invalid': errors?.btsContractAmount
                            })}
                            {...register('btsContractAmount')}
                        />
                        <span className="invalid-feedback">
                            {errors?.btsContractAmount?.message}
                        </span>
                    </div>
                </div>{' '}
            </div>
            <div className="col-md-6">
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label required">
                        Sup + CPGE :
                    </label>

                    <input
                        type="number"
                        step="any"
                        className={clsx('form-control', {
                            'is-invalid': errors?.scSup
                        })}
                        {...register('scSup')}
                    />
                    <span className="invalid-feedback">{errors?.scSup?.message}</span>
                </div>
            </div>{' '}
            <div className="separator my-3" />
            <div className="row">
                <div className="col-md-6">
                    <label className="form-label fw-bolder fs-5">Taux par apprenti</label>
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            CFA/UFA :
                        </label>
                        <input
                            type="number"
                            step="any"
                            className={clsx('form-control', {
                                'is-invalid': errors?.cfaUfa
                            })}
                            {...register('cfaUfa')}
                        />
                        <span className="invalid-feedback">{errors?.cfaUfa?.message}</span>
                    </div>
                </div>{' '}
                <div className="col-md-6">
                    <label className="form-label fw-bolder fs-5">Taux pour 1000 h.</label>
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            CFP/CFC :
                        </label>

                        <input
                            type="number"
                            step="any"
                            className={clsx('form-control', {
                                'is-invalid': errors?.cfpCfc
                            })}
                            {...register('cfpCfc')}
                        />
                        <span className="invalid-feedback">{errors?.cfpCfc?.message}</span>
                    </div>
                </div>{' '}
            </div>
            <label className="form-label fw-bolder fs-5">Part Fixe (depuis 2012/2013)</label>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            Part Fixe clés 0, 3, 4 :
                        </label>

                        <input
                            type="number"
                            step="any"
                            className={clsx('form-control', {
                                'is-invalid': errors?.fixedPart034
                            })}
                            {...register('fixedPart034')}
                        />
                        <span className="invalid-feedback">{errors?.fixedPart034?.message}</span>
                    </div>
                </div>{' '}
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            Part Fixe clés 1, 2 :
                        </label>

                        <input
                            type="number"
                            step="any"
                            className={clsx('form-control', {
                                'is-invalid': errors?.fixedPart12
                            })}
                            {...register('fixedPart12')}
                        />
                        <span className="invalid-feedback">{errors?.fixedPart12?.message}</span>
                    </div>
                </div>{' '}
            </div>
        </>
    );
};

export default Settings;
