import { createContext, useContext } from 'react';

const FormParamsContext = createContext();

const useFormParams = () => useContext(FormParamsContext);
export const FormParamsProvider = ({ children, ...props }) => (
    <FormParamsContext.Provider value={props}>{children}</FormParamsContext.Provider>
);
export default useFormParams;
