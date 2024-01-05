const sequence = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'sequence',
    subfields: {
        name: {
            label: 'name',
            type: 'text',
            valueSources: ['value']
        },
        next_val: {
            label: 'next_val',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default sequence;
