import React from 'react';

import List from './List';

const Users = ({ data }) => {
    console.log(data);
    return (
        <>
            <List data={data} />
        </>
    );
};

export default Users;
