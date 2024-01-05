import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import { roles } from '../../../../../../schemas/users';
const Access = () => {
    const addForm = useFormContext();
    const {
        register,
        formState: { errors }
    } = addForm;
    return (
        <>
            <div className="form-group mb-3">
                <div className="form-check form-check-custom form-check-solid">
                    <input
                        name="radio_input"
                        type="checkbox"
                        className={clsx('form-check-input me-3', {
                            'is-invalid': errors?.name
                        })}
                        {...register('sendEnrollmentEmail')}
                    />

                    <label
                        className="form-check-label"
                        htmlFor="kt_docs_formvalidation_radio_option_3">
                        <div className="fw-bolder text-gray-800">
                            Envoyer les informations de connexion par e-mail :
                        </div>
                    </label>
                </div>{' '}
            </div>
            <span className="fw-bold fs-7 text-gray-600">
                <span className="fw-bold fs-7 text-gray-600">
                    En cochant cette case, des identifiants de connexion (login et mot de passe)
                    seront communiqués à la personne par e-mail.Si vous ne pouvez pas cocher cette
                    case, c&apos;est que la personne n&apos;a pas d&apos;adresse e-mail par défaut,
                    ou que le compte est inactif.
                </span>{' '}
            </span>
            <div className="row py-5">
                <div className="form-group mb-5 col-md-6 ">
                    <label className="form-check-label ">
                        <div className="fw-bolder text-gray-800">Mot de passe : </div>
                    </label>

                    <input name="" className="form-control" id="" {...register('password')} />
                </div>
                <div className="form-group mb-5 col-md-6 ">
                    <label className="form-check-label ">
                        <div className="fw-bolder text-gray-800">Confirmez le mot de passe : </div>
                    </label>

                    <input
                        name=""
                        className="form-control "
                        id=""
                        {...register('confirmPassword')}
                    />
                </div>
                <span className="fw-bold fs-7 text-gray-600">
                    Vous pouvez définir un nouveau mot de passe en renseignant les champs
                    ci-dessus.Si vous ne souhaitez pas changer le mot de passe, laissez ces champs
                    vides.
                </span>{' '}
            </div>

            <div className="form-group mb-5">
                <label className="form-check-label">
                    <div className="fw-bolder text-gray-800">Profil : </div>
                </label>

                <select name="" className="form-select" id="" {...register('role')}>
                    {roles.map(({ label, id }) => (
                        <option value={id} key={id}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="d-print-none border border-dashed border-gray-300 card-rounded h-lg-100 min-w-md-350px p-3 bg-lighten">
                {roles.map((e) => {
                    const { label, description, badge } = e;
                    return (
                        <div className="mb-2" key={label}>
                            <div className="fw-bolder text-gray-800 fs-6">
                                {label}{' '}
                                {badge ? (
                                    <span className="badge badge-secondary badge-sm">{badge}</span>
                                ) : null}
                            </div>
                            <div className="fw-bold text-gray-600 fs-7">{description}</div>
                        </div>
                    );
                })}
            </div>
            <div className="separator my-3" />
            <div className="form-check form-check-custom form-check-solid mb-3">
                <label className="form-check-label fw-bold me-2" htmlFor="flexCheckChecked">
                    Rendre inactif :
                </label>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckChecked"
                    {...register('isDisabled')}
                />
            </div>
            <span className="fw-bold fs-7 text-gray-600">
                Lorsque le compte est inactif, la personne ne peut plus s&apos;authentifier. La
                prise en compte de cette action peut prendre jusqu&apos;à 24h.
            </span>
            <div className="separator my-3" />
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Commentaires UNETP :
                </label>
                <textarea className="form-control" {...register('accessComment')} />
            </div>
        </>
    );
};

export default Access;
