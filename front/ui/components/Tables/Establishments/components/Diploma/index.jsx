import React from 'react';

import DiplomaItem from './Item';

const Diploma = ({ data }) => {
    return (
        <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
            <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2">
                Formations dispensées :
            </span>

            {!data?.organization?.diplomas.length ? (
                "Il n'y a aucun diplome à afficher ."
            ) : (
                <div>
                    {data?.organization?.diplomas?.map((e) => (
                        <DiplomaItem data={e} key={e.id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Diploma;
