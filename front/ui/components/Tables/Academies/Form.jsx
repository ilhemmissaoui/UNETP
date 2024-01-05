import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

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
        </div>
    );
};

export default Form;
