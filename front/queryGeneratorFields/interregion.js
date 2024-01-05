const interregion = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'interregion',
    subfields: {
        id_interregion: {
            label: 'id_interregion',
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
export default interregion;
