import { useFormContext } from 'react-hook-form';

import FunctionsList from './components/Functions';

const Functions = () => {
    const { register } = useFormContext();

    return (
        <>
            <FunctionsList title="Fonctions exerçées:" />
            <div className="form-check form-check-custom form-check-solid mt-3">
                <label className="form-check-label fw-bold me-2" htmlFor="flexCheckChecked">
                    Ancien chef d&apos;établissement :
                </label>
                <input
                    className="form-check-input"
                    id="flexCheckChecked"
                    type="checkbox"
                    {...register('isOldHeadMaster')}
                />
            </div>
        </>
    );
};

export default Functions;
