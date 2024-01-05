const unitorg_has_unitorg = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'unitorg_has_unitorg',
    subfields: {
        id_unitorg_parent: {
            label: 'id_unitorg_parent',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        },
        id_unitorg_fils: {
            label: 'id_unitorg_fils',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default unitorg_has_unitorg;
