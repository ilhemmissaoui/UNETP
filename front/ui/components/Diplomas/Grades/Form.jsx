import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

const Form = () => {
    const {
        register,
        formState: { errors }
    } = useFormContext();

    return (
        <div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label required">
                    Libellé :
                </label>

                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.label
                    })}
                    {...register('label')}
                />
                <span className="invalid-feedback">{errors?.label?.message}</span>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label required">
                    Code :
                </label>

                <input
                    type="text"
                    className={clsx('form-control', {
                        'is-invalid': errors?.code
                    })}
                    {...register('code')}
                />
                <span className="invalid-feedback">{errors?.code?.message}</span>
            </div>
        </div>
    );
};

export default Form;
