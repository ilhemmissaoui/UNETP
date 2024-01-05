import Head from 'next/head';
import React, { useState } from 'react';

import { Ability } from '../../GUARDS';
import Remove from '../../Modals/Remove';

const Empty = () => {
    const [isDeleteUser, setDeleteUser] = useState(false);
    const [isDeleteOrg, setDeleteOrg] = useState(false);

    const toggleIsDeleteUser = () => setDeleteUser((v) => !v);
    const toggleIsDeleteOrg = () => setDeleteOrg((v) => !v);

    return (
        <>
            <Head>
                <title>Archives | {process.env.platformName} </title>
            </Head>
            <Ability I="delete" an="archives.users">
                <button
                    className="btn btn-link fw-bold fs-6 text-gray-700 text-hover-primary d-block"
                    onClick={toggleIsDeleteUser}>
                    <i className="fa fa-arrow-right fs-4 text-gray-700"></i>Supprimer définitivement
                    les personnes
                </button>
            </Ability>

            <Ability I="delete" an="archives.organization">
                <button
                    className="btn btn-link fw-bold fs-6 text-gray-700 text-hover-primary"
                    onClick={toggleIsDeleteOrg}>
                    <i className="fa fa-arrow-right fs-4 text-gray-700"></i>Supprimer définitivement
                    les organisations
                </button>
            </Ability>

            <Remove
                name="Liste des personnes"
                isShow={isDeleteUser}
                toggleShow={toggleIsDeleteUser}
                collectionLabel="Liste des personnes"
                singleName="Liste des personnes"
                prefix="users/remove-archive"
            />

            <Remove
                name="Liste des organismes"
                isShow={isDeleteOrg}
                toggleShow={toggleIsDeleteOrg}
                collectionLabel="Liste des organismes"
                singleName="Liste des organismes"
                prefix="organizations/remove-archive"
            />
        </>
    );
};

export default Empty;
