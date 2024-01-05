const civilite = {
    type: '!struct',
    tooltip: 'Group of fields',
    label: 'civilite',
    subfields: {
        id_civilite: {
            label: 'id_civilite',
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
        },
        abbreviation: {
            label: 'abbreviation',
            type: 'text',
            valueSources: ['value']
        },
        civilite: {
            label: 'civilite',
            type: 'select',
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'M', title: 'M' },
                    { value: 'F', title: 'F' },
                    { value: 'Mixte', title: 'Mixte' }
                ]
            }
        },

        ordre: {
            label: 'ordre',
            type: 'number',
            fieldSettings: {
                min: 1
            },
            valueSources: ['value']
        }
    }
};
export default civilite;
