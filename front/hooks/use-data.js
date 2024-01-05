import { createContext, useContext } from 'react';

const DataContext = createContext();

const useData = () => useContext(DataContext);
export const DataProvider = ({ children, data, loading }) => {
    return <DataContext.Provider value={{ data, loading }}>{children}</DataContext.Provider>;
};

export default useData;
