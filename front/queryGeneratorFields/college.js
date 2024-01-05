const college = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'college',
    subfields: {
        id_college: {
            label: 'id_college',
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
        }
    }
};
export default college;
