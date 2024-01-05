import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Builder, Query, Utils as QbUtils } from 'react-awesome-query-builder';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';

import fields from '../../../../../queryGeneratorFields';
import BootstrapConfig from '../../../../utils/AwesomeQueryBuilderBootstrap';
const queryValue = { id: QbUtils.uuid(), type: 'group' };

const config = {
    ...BootstrapConfig,
    fields
};
const findFieldsIncluded = (object, key, value) => {
    Object.keys(object)?.map(function (k) {
        if (k === key) {
            value.add(object[key]?.split('.')[0]);
        }
        if (object[k] && typeof object[k] === 'object') {
            value = findFieldsIncluded(object[k], key, value);
            return value !== undefined;
        }
    });
    return value;
};

const Form = ({ tree, data }) => {
    // Liste des champs possibles
    const [fieldsOptions] = useState(
        Object.entries(fields)
            .map(([key, value]) => {
                return Object.keys(value.subfields).map((e) => ({
                    label: `${key}.${e}`,
                    value: `${key}.${e}`
                }));
            })
            .flat(1)
    );

    const utils = {
        tree: QbUtils?.checkTree(QbUtils?.loadTree(tree ? JSON.parse(tree) : queryValue), config),
        config: config
    };

    const [state, setState] = useState(utils);

    const addForm = useFormContext();
    const {
        register,
        setValue,
        clearErrors,
        watch,
        control,
        formState: { errors }
    } = addForm;
    const [request, fieldSelected] = watch(['request', 'fieldSelected']);

    const updateQuery = (tree, config) => {
        let includedTables = new Set();

        const selectPart = fieldSelected?.length
            ? fieldSelected
                  .map((e) => {
                      includedTables.add(e.label.split('.')[0]);
                      return e.label;
                  })
                  .join(',\n\t')
            : '*';
        const fromPart = Array.from(
            findFieldsIncluded(QbUtils.getTree(state.tree), 'field', includedTables)
        );
        const wherePart = QbUtils.sqlFormat(tree || state.tree, config || state.config);

        //result
        setValue(
            'request',
            fromPart?.length
                ? `select \n\t${selectPart} \nfrom\n\t${fromPart.join(',\n\t')}\n${
                      wherePart ? `where\n\t${wherePart}` : ''
                  }`
                : ``
        );
        setValue('tree', JSON.stringify(tree || state.tree));
    };
    const onChange = (immutableTree, config) => {
        try {
            clearErrors('request');
            setState({ tree: immutableTree, config: config });
            updateQuery(immutableTree, config);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (!fieldSelected?.length) setValue('request', '');
    }, [fieldSelected]);

    return (
        <>
            <div className="form-group mb-3 mt-7">
                <label className="form-label text-dark fw-bolder required">
                    Libellé de la requête :
                </label>
                <input
                    type="text"
                    name="label"
                    {...register('label')}
                    className={clsx('form-control', {
                        'd-flex is-invalid': errors?.label
                    })}
                />
                <span className="invalid-feedback">{errors?.label?.message}</span>
            </div>
            <div className="form-group mb-3">
                <label className="form-label text-dark fw-bolder required">
                    Liste des champs à afficher :
                </label>
                <Controller
                    name="fieldSelected"
                    control={control}
                    render={({ field }) => (
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            {...field}
                            options={fieldsOptions}
                        />
                    )}
                />{' '}
                <span className="invalid-feedback">{errors?.label?.message}</span>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="" className="form-label text-dark fw-bolder required">
                    Requête SQL :
                </label>
                <div className="query-builder qb-lite">
                    <Query
                        {...config}
                        value={state.tree}
                        onChange={onChange}
                        renderBuilder={(props) => <Builder {...props} />}
                    />
                </div>
                <span className={clsx('invalid-feedback', { 'd-flex': errors?.request })}>
                    {errors?.request?.message}
                </span>
                {request?.length ? (
                    <div>
                        Résultat Requête SQL:
                        <pre>{request}</pre>
                    </div>
                ) : data?.request ? (
                    <div>
                        Résultat Requête SQL:
                        <pre>{data?.request}</pre>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        </>
    );
};

export default Form;
