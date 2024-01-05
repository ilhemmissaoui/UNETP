import { useMemo } from 'react';

export const FormatPrice = ({ value, currency = 'EUR' }) => {
    const formatter = useMemo(
        () =>
            new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency
            }),
        [currency]
    );
    return formatter.format(value);
};
