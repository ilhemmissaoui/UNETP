import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Async from 'react-select/async';

import useCRUD from '../../../../hooks/use-crud';
import settings from '../../../../settings';
const SearchUser = ({ changeMode, defaultSelected }) => {
    const { endpointUrl } = settings;
    const {
        control,
        formState: { errors },
        setValue
    } = useFormContext();
    const { handleSearch } = useCRUD({
        singleName: 'user',
        pluralName: 'users',
        pageSize: null
    });
    const [isLoading, setIsLoading] = useState(true);

    const getDefaultValues = async () => {
        const user = await axios.get(
            `${endpointUrl}/users/${
                defaultSelected?.id?.value ? defaultSelected?.id?.value : defaultSelected?.id
            }`
        );
        setValue('user', {
            id: {
                value: user?.data?.id,
                label: `${user?.data?.firstName} - ${user?.data?.lastName}  `
            }
        });
        if (user) setIsLoading(false);
    };
    useEffect(() => {
        if (defaultSelected?.id) {
            getDefaultValues();
        } else {
            setIsLoading(false);
        }
    }, []);
    const onSearch = async (value) => {
        const { nodes } = await handleSearch(value);
        return nodes?.map((e) => ({
            value: e.id,
            label: `${e.firstName} ${e.lastName}`
        }));
    };

    return (
        <div>
            <div className="form-group mb-3">
                <label htmlFor="" className="h5">
                    Rechercher une personne existante
                </label>
            </div>
            <div className="row">
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">
                        Nom : <span className="text-danger">*</span>
                    </label>
                </div>{' '}
                <div className="form-group mb-3">
                    {!isLoading && (
                        <Controller
                            control={control}
                            name="user.id"
                            render={({ field }) => (
                                <Async {...field} isSearchable loadOptions={onSearch} />
                            )}
                        />
                    )}
                    <span className="invalid-feedback d-flex">{errors?.user?.id?.message}</span>

                    <span className="fw-bold fs-7 text-gray-600">
                        Vous n&apos;avez pas trouvé le personne recherché ?{' '}
                        <a href="#" type="button" onClick={changeMode('add')}>
                            Crééz un maintenenant
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SearchUser;
