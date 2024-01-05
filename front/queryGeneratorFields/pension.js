const pension = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'pension',
    subfields: {
        id_pension: {
            label: 'id_pension',
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
export default pension;
