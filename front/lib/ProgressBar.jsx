import Router from 'next/router';
import React, { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import BProgressBar from 'react-bootstrap/ProgressBar';
export const ProgressBarContext = createContext();

export const ProgressBarCore = ({ show, ...props }) => {
    const [progress, setProgress] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [currentProgress, setCurrentProgress] = useState(0);
    const [step, setStep] = useState(0.5);
    useEffect(() => {
        if (show) {
            const interval = setInterval(function () {
                let currentProgress;
                setCurrentProgress((v) => {
                    currentProgress = v + step;
                    return currentProgress;
                });
                setProgress(
                    Math.round((Math.atan(currentProgress) / (Math.PI / 2)) * 100 * 1000) / 1000
                );
                if (progress >= 70) {
                    setStep(0.1);
                }
            }, 100);
            return () => {
                clearInterval(interval);
                setCurrentProgress(0);
                setProgress(0);
                setStep(0.5);
            };
        }
    }, [show]);
    return show ? <BProgressBar variant="primary" now={progress} {...props} /> : null;
};
const ProgressBar = ({ children }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleStart = (_, { shallow }) => {
            if (!shallow) setShow(true);
        };
        const handleEnd = (_, { shallow }) => {
            if (!shallow) setShow(false);
        };
        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleEnd);
        return () => {
            Router.events.off('routeChangeStart', handleStart);
            Router.events.off('routeChangeComplete', handleEnd);
        };
    }, []);
    return (
        <ProgressBarContext.Provider value={{ show, setShow }}>
            {show && <ProgressBarCore show={show} className="top-progress-bar" />}
            {children}
        </ProgressBarContext.Provider>
    );
};

export default ProgressBar;
