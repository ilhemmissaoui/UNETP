import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';
const GeneralCalls = () => {
    const form = useFormContext();
    const {
        register,
        watch,
        formState: { errors }
    } = form;

    const nextCall = watch('nextCall');
    return (
        <>
            <div className="notice  bg-light rounded border p-7 mb-3">
                <div className="flex-shrink-0 mb-3 text-gray-800 fs-5  fw-bolder">
                    <span>
                        L&apos;appel concerne les établissements qui n&apos;ont pas de cotisation
                        pour l&apos;année courante. <br />
                        <br />
                        L&apos;appel concerne seulement les établissements.
                        <br />
                        <br />
                        Vous pouvez forcer l&apos;envoi immédiat de l&apos;appel général de
                        cotisations en cochant la case.
                        <br />
                    </span>
                </div>{' '}
            </div>
            <div className="separator my-5" />

            <span className="h4 d-block lh-1 pb-1">Dernier appel en date :</span>
            <br />
            <span className="h4 d-block lh-1 pb-1">Prochain Appel :</span>
            <div className="row mb-5">
                <div className="mb-10">
                    <div className="d-flex flex-column fv-row">
                        <div className="form-check form-check-custom form-check-solid mb-3">
                            <input
                                {...register('nextCall')}
                                className="form-check-input me-3"
                                name="nextCall"
                                type="radio"
                                value="Non renseigné"
                                id="notResigned"
                            />
                            <label className="form-check-label" htmlFor="notResigned">
                                <div className=" fs-5 text-dark">Non renseigné</div>
                            </label>
                        </div>
                        <div className="form-check form-check-custom form-check-solid mb-3">
                            <input
                                {...register('nextCall')}
                                className="form-check-input me-3"
                                name="nextCall"
                                type="radio"
                                value="Appel programmé"
                                id="prgrammedCall"
                            />

                            <label className="form-check-label" htmlFor="prgrammedCall">
                                <div className=" fs-5 text-dark">Appel programmé</div>
                            </label>
                        </div>
                        {nextCall === 'Appel programmé' && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="reminder" className="form-label">
                                        Date d&apos;appel :
                                    </label>

                                    <input
                                        className={clsx('d-flex form-control', {
                                            'is-invalid': errors.remindDate
                                        })}
                                        type="datetime-local"
                                        name="remindDate"
                                        {...register('remindDate')}
                                    />
                                    <span className=" d-flex invalid-feedback">
                                        {errors?.remindDate?.message}
                                    </span>
                                </div>
                            </>
                        )}
                        <div className="form-check form-check-custom form-check-solid mb-3">
                            <input
                                {...register('nextCall')}
                                className="form-check-input me-3"
                                name="nextCall"
                                type="radio"
                                value="Appel immédiat (à l'enregistrement)"
                                id="liveCall"
                            />

                            <label className="form-check-label" htmlFor="liveCall">
                                <div className=" fs-5 text-dark">
                                    Appel immédiat (à l&apos;enregistrement)
                                </div>
                            </label>
                        </div>
                        <span className="invalid-feedback">{errors?.nextCall?.message}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GeneralCalls;
