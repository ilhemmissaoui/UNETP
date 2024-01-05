import React, { createContext, useEffect, useState } from 'react';
import Fade from 'react-bootstrap/Fade';
export const ToastContext = createContext();

const DEFAULT_DURATION = 2 * 1000;
const Toast = ({ children }) => {
    const [toast, setToast] = useState();
    const clearToast = () => setToast();
    useEffect(() => {
        if (toast) {
            setTimeout(clearToast, toast?.duration || DEFAULT_DURATION);
        }
    }, [toast]);
    return (
        <ToastContext.Provider value={{ setToast, clearToast }}>
            <Fade in={!!toast} mountOnEnter unmountOnExit>
                <div className={`custom-toast toast-${toast?.variant}`}>
                    <div>
                        <i className="icon" />
                        {toast?.message}
                    </div>
                </div>
            </Fade>

            {children}
        </ToastContext.Provider>
    );
};
export default Toast;
