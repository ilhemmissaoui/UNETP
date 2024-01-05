const departement = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'departement',
    subfields: {
        id_departement: {
            label: 'id_departement',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        libelle: {
            label: 'libelle',
            type: 'text',
            valueSources: ['value']
        },
        code_departement: {
            label: 'code_departement',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default departement;
