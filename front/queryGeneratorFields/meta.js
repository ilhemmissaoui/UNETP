const meta = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'meta',
    subfields: {
        nom: {
            label: 'nom',
            type: 'text',
            valueSources: ['value']
        },
        valeur: {
            label: 'valeur',
            type: 'text',
            valueSources: ['value']
        }
    }
};
export default meta;
