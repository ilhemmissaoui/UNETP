const academie = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'academie',
    subfields: {
        id_academie: {
            label: 'id_academie',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        nom: {
            label: 'nom',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default academie;
