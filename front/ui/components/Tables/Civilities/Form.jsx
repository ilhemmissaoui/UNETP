import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import { genders } from '../../../../schemas/civilitySchema';

const Form = () => {
    const form = useFormContext();
    const {
        register,
        formState: { errors }
    } = form;

    return (
        <div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label required">
                    Nom :
                </label>

                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.name
                    })}
                    {...register('name')}
                />
                <span className="invalid-feedback">{errors?.name?.message}</span>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label required">
                    Abbréviation :
                </label>

                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.abbreviation
                    })}
                    {...register('abbreviation')}
                />
                <span className="invalid-feedback">{errors?.abbreviation?.message}</span>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="" className="form-label required">
                    Genre :
                </label>

                <select
                    id="gender"
                    name="gender"
                    className={clsx('form-select', {
                        'is-invalid': errors?.gender
                    })}
                    {...register('gender')}>
                    {Object.entries(genders).map((e) => (
                        <option key={e[0]} value={e[0]}>
                            {e[1]}
                        </option>
                    ))}
                </select>
                <span className="invalid-feedback">{errors?.gender?.message}</span>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label">
                    Rang (pour l&apos;affichage):
                </label>

                <input
                    type="number"
                    className={clsx('form-control', {
                        'is-invalid': errors?.rank
                    })}
                    {...register('rank')}
                />
                <span className="invalid-feedback">{errors?.rank?.message}</span>
            </div>
        </div>
    );
};

export default Form;
