import Head from 'next/head';
import { useState } from 'react';

import Accountants from '../../ui/components/AdvancedSearch/Predefined/Components/Accountants';
import Delegate from '../../ui/components/AdvancedSearch/Predefined/Components/Delegate';
import EstablishmentRegulations from '../../ui/components/AdvancedSearch/Predefined/Components/EstablishmentRegulations';
import Establishments from '../../ui/components/AdvancedSearch/Predefined/Components/Establishments';
import Groups from '../../ui/components/AdvancedSearch/Predefined/Components/Groups';
import HeadMasters from '../../ui/components/AdvancedSearch/Predefined/Components/HeadMasters';
import UnetpMembers from '../../ui/components/AdvancedSearch/Predefined/Components/UnetpMembers';
import Users from '../../ui/components/AdvancedSearch/Predefined/Components/Users';
import Layout from '../../ui/layouts';

const presets = {
    accountants: {
        label: 'Comptables',
        component: Accountants
    },
    establishmentRegulation: {
        label: 'Réglement des établissements',
        component: EstablishmentRegulations
    },
    establishments: {
        label: 'Établissements',
        component: Establishments
    },
    headmaster: {
        label: 'Chefs des établissements',
        component: HeadMasters
    },
    delegate: {
        label: 'Délégués',
        component: Delegate
    },

    groups: {
        label: 'Groupes',
        component: Groups
    },
    users: {
        label: 'Personnes',
        component: Users
    },
    UnetpMember: {
        label: "Membres d'UNETP",
        component: UnetpMembers
    }
};
const Predefined = () => {
    const [selectedSearch, setSelectedSearch] = useState(Object.keys(presets)[0]);
    const handleSelectedSearch = ({ target: { value } }) => setSelectedSearch(value);
    const { component: Component } = presets[selectedSearch];
    return (
        <Layout>
            <Head>
                <title>Recherches prédéfinies | {process.env.platformName} </title>
            </Head>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="fs-4 text-gray-700 fw-bolder">
                            Veuillez choisir une requête :{'  '}
                        </div>
                        <br />
                        <select
                            name=""
                            id=""
                            className="form-select"
                            onChange={handleSelectedSearch}>
                            {Object.entries(presets)?.map(([key, { label }]) => (
                                <option value={key} key={key}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <div className="mt-4">
                            <Component key={selectedSearch} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Predefined;
