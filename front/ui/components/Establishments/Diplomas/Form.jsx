import React from 'react';
import { useFormContext } from 'react-hook-form';

import AddDiploma from './AddDiploma';
import SearchDiploma from './SearchDiploma';

const addModes = {
    search: SearchDiploma,
    add: AddDiploma
};
const Form = () => {
    const { watch, setValue } = useFormContext();
    const diploma = watch('diploma');

    const mode = diploma?.mode ?? (diploma?.diplomaId ? 'search' : 'add');
    const changeMode = (mode) => () => {
        setValue('diploma.mode', mode), setValue('diplomaId', '');
    };
    const Component = addModes[mode];

    return <Component changeMode={changeMode} defaultSelected={diploma} />;
};

export default Form;
