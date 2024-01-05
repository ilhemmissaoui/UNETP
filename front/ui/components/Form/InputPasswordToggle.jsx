import clsx from 'clsx';
import { forwardRef, useState } from 'react';

const InputPasswordToggle = forwardRef((props, ref) => {
    const {
        label,
        hideIcon,
        showIcon,
        visible = false,
        className,
        htmlFor,
        placeholder,
        inputClassName,
        children,
        ...rest
    } = props;

    const [inputVisibility, setInputVisibility] = useState(visible);

    const renderIcon = () => {
        if (inputVisibility === false) {
            return hideIcon ? hideIcon : <i className="la la-eye la-lg" />;
        } else {
            return showIcon ? showIcon : <i className="la la-eye-slash la-lg" />;
        }
    };

    return (
        <>
            {label ? <label htmlFor={htmlFor}>{label}</label> : null}
            <div className={clsx('input-group has-validation input-group-lg', className)}>
                <input
                    type={inputVisibility === false ? 'password' : 'text'}
                    placeholder={placeholder ? placeholder : ''}
                    className={clsx('form-control form-control-solid', inputClassName)}
                    {...rest}
                    ref={ref}
                />
                <span className="input-group-text border-0 pw-0">
                    <div
                        className="cursor-pointer"
                        onClick={() => setInputVisibility(!inputVisibility)}>
                        {renderIcon()}
                    </div>
                </span>
                {children}
            </div>
        </>
    );
});

export default InputPasswordToggle;
