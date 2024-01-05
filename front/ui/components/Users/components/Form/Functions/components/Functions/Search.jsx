import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select/creatable';

import settings from '../../../../../../../../settings';
const { endpointUrl } = settings;
const SearchEstablishment = () => {
    const { watch, control, setValue, getValues } = useFormContext();
    const [organizations, setOrganizations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const type = watch('type');
    useEffect(() => {
        fetchOrganization();
    }, [type]);
    const fetchOrganization = async () => {
        setIsLoading(true);
        const { data } = await axios.get(`${endpointUrl}/organizations/${type}`);
        setOrganizations(data?.nodes);
        if (parseInt(type) === 7) {
            setValue('organizationId', '');
            setValue('organization.name', '');
        } else if ([1, 2, 3].includes(parseInt(type))) {
            setValue('organizationId', {
                label: data?.nodes[0]?.name,
                value: data?.nodes[0]?.id
            });
            setValue('organization.name', data?.nodes[0]?.name);
        } else if ([4, 5, 6].includes(parseInt(type))) {
            const organizationId = getValues('organizationId');
            console.log({ organizationId });
            if (organizationId) {
                const organization = data?.nodes.find(
                    (e) => e.id == (organizationId.value ? organizationId.value : organizationId)
                );
                setValue('organizationId', {
                    label: organization?.name || '',
                    value: organization?.id || ''
                });
                setValue('organization.name', organization?.name || '');
            } else {
                setValue('organizationId', '');
                setValue('organization.name', '');
            }
        }
        setValue('organization.establishment.establishmentKey', '');
        setIsLoading(false);
    };
    return [4, 5, 6].includes(parseInt(type)) && !isLoading ? (
        <div className="form-group mb-3">
            <label htmlFor="" className="form-label">
                {type == 5 ? 'Région' : 'Organisme'} :
            </label>
            {organizations && (
                <Controller
                    control={control}
                    name="organizationId"
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={organizations?.map((e) => ({ value: e.id, label: e.name }))}
                            onChange={(v) => {
                                setValue('organization.name', v?.label);
                                setValue('organization.id', v?.value);
                                setValue('organization.establishment.establishmentKey', '');
                                field.onChange(v);
                            }}
                        />
                    )}
                />
            )}
        </div>
    ) : null;
};

export default SearchEstablishment;
