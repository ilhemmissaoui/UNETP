import React from 'react';
import { useFormContext } from 'react-hook-form';

import AddEstablishment from './AddEstablishment';
import SearchEstablishment from './SearchEstablishment';

const addModes = {
    search: SearchEstablishment,
    add: AddEstablishment
};
const Form = ({ establishments }) => {
    const { watch, setValue } = useFormContext();
    const mode = watch('mode');
    const changeMode = (mode) => () => setValue('mode', mode);
    const Component = addModes[mode];
    return <Component establishments={establishments} changeMode={changeMode} />;
};

export default Form;
