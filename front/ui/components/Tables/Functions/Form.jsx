import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import useCRUD from '../../../../hooks/use-crud';

const Form = ({ organizationTypeDisabled }) => {
    const form = useFormContext();
    const {
        register,
        formState: { errors }
    } = form;
    const { page: organizationTypes, loading } = useCRUD({
        singleName: 'organization-type',
        pluralName: 'organization-types',
        pageSize: null
    });
    return (
        <div>
            <div className="notice  bg-light rounded border p-7 mb-3">
                <div className="flex-shrink-0 mb-3 text-gray-800 fs-6">
                    L&apos;intitulé d&apos;une fonction est défini pour un type d&apos;organisme
                    précis. Si l&apos;intitulé doit être disponible pour plusieurs types
                    d&apos;organismes, alors il faut en définir plusieurs en les associant à des
                    types d&apos;organismes différents.
                    <br /> <br />
                    <span className="fs-6 fw-bolder">Exemple : </span>
                    Si vous definissez l&apos;intitulé de fonction Secrétaire pour le type
                    Etablissement, vous pourrez ensuite attribuer cette fonction à Antoine pour
                    l&apos;établissement Saint Exupéry. Par contre, cette fonction ne sera pas
                    disponible dans une délégation. Pour qu&apos;elle le soit, il faudra créer un
                    autre intitulé du même nom, mais l&apos;associer cette fois aux délégations.
                    <br /> <br />
                    <span className="fs-6 fw-bolder">Remarque : </span>Le type d&apos;organisme Non
                    communiqué permet de définir des intitulés de fonction pour des organismes qui
                    ne sont pas représentés dans le système. (ex : maire, député, etc.)
                </div>
            </div>
            <div className="separator my-5" />
            {!loading && (
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">
                        Type d&apos;organisme :
                    </label>

                    <select
                        name=""
                        id=""
                        className="form-select"
                        {...register('organizationTypeId')}
                        disabled={organizationTypeDisabled}>
                        {organizationTypes?.nodes?.map((e) => (
                            <option value={e.id} key={e.id}>
                                {e.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            Intitulé masculin :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.singularMaleName
                            })}
                            {...register('singularMaleName')}
                        />
                        <span className="invalid-feedback">
                            {errors?.singularMaleName?.message}
                        </span>
                    </div>{' '}
                </div>
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            Intitulé féminin :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.singularFemaleName
                            })}
                            {...register('singularFemaleName')}
                        />
                        <span className="invalid-feedback">
                            {errors?.singularFemaleName?.message}
                        </span>
                    </div>{' '}
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            Intitulé masculin pluriel :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.pluralMaleName
                            })}
                            {...register('pluralMaleName')}
                        />
                        <span className="invalid-feedback">{errors?.pluralMaleName?.message}</span>
                    </div>{' '}
                </div>
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label required">
                            Intitulé féminin pluriel :
                        </label>
                        <input
                            type="text"
                            className={clsx('form-control', {
                                'is-invalid': errors?.pluralFemaleName
                            })}
                            {...register('pluralFemaleName')}
                        />
                        <span className="invalid-feedback">
                            {errors?.pluralFemaleName?.message}
                        </span>
                    </div>{' '}
                </div>
            </div>

            <div className="form-group mb-6">
                <label htmlFor="" className="form-label">
                    Description :
                </label>

                <textarea
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.description
                    })}
                    {...register('description')}
                />
                <span className="invalid-feedback">{errors?.description?.message}</span>
            </div>

            <div className="form-group mb-3 d-flex">
                <div className="me-5">
                    <label className="fs-6 fw-bold form-label mb-0">
                        Chef d&apos;établissement :{' '}
                    </label>
                </div>

                <div className="form-check form-check-custom form-check-solid">
                    <input
                        className="form-check-input"
                        id="isHeadMaster"
                        type="checkbox"
                        {...register('isHeadMaster')}
                    />
                </div>
            </div>
            <div className="separator my-3" />

            <div className="col-lg-12">
                <div data-kt-buttons="true" data-kt-buttons-target="[data-kt-button]">
                    <div className="col-md-12">
                        <label
                            className="btn btn-outline btn-outline-secondary  active d-flex text-start p-6"
                            data-kt-button="true">
                            <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1"></span>

                            <span className="ms-5">
                                <span className="me-3">
                                    Le choix ci-dessus a une importance dans le cas où la personne
                                    connectée à l&apos;application n&apos;a pas le profil
                                    administrateur.
                                    <br /> Si vous répondez oui, et si la personne authentifiée
                                    exerce cette fonction dans un établissement, <br /> alors elle
                                    sera habilitée à modifier ce dernier (Il s&apos;agira simplement
                                    d&apos;une demande de modification).
                                    <br /> La liste des établissements, dans lesquels la personnes
                                    authentifiée exerce ce type de fonction apparaitra sur sa page
                                    d&apos;accueil.
                                </span>
                            </span>
                        </label>
                    </div>{' '}
                </div>
            </div>
        </div>
    );
};

export default Form;
