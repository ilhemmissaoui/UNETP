import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useMultiCRUDContext } from '../../../../hooks/use-crud';
import useFormParams from '../../../../hooks/use-form-params';
import { functionBaseSchema } from '../../../../schemas/globalFunctionSchema';
import settings from '../../../../settings';
import { Ability } from '../../GUARDS';
import NestedDelete from '../../Modals/NestedDelete';
import NestedUpdate from '../../Modals/NestedUpdate';
import View from '../../Modals/View';
import UserView from '../../Users/components/View';
import Period from '../../Utils/Period';
import Form from './Form';
const DTRow = ({ data }) => {
    const [viewUser, setViewUser] = useState();
    const toggleViewUser = () => setViewUser((v) => !v);
    const { endpointUrl } = settings;
    const { functionLabels, civilities } = useMultiCRUDContext();
    const params = useFormParams();
    const { control } = useFormContext();
    const updateForm = useForm({
        resolver: yupResolver(functionBaseSchema),
        defaultValues: { ...data, 'user.mode': 'update' }
    });

    const [user, setUser] = useState();
    const [isDelete, setIsDelete] = useState();
    const [isUpdate, setIsUpdate] = useState();

    const toggleIsDelete = () => setIsDelete((v) => !v);
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };

    const [isUserLoading, setIsUserLoading] = useState(true);

    const getDefaultValues = async () => {
        const fetchUser = await axios.get(`${endpointUrl}/users/${data.user.id}`);
        setUser({ ...fetchUser.data });
        if (fetchUser) setIsUserLoading(false);
    };
    useEffect(() => {
        if (data?.user?.mode === 'search') {
            getDefaultValues();
        } else {
            setIsUserLoading(false);
        }
    }, [data?.user?.mode === 'search']);
    return (
        <>
            <tr key={data?.id} className="align-middle text-center fs-8 text-gray-800">
                <td className="align-items-center">
                    <button
                        className="btn btn-link d-flex align-items-center p-0"
                        onClick={toggleViewUser}>
                        <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                            <button className="btn btn-link p-0">
                                {data?.user?.mode === 'search' ? (
                                    <>
                                        {user?.lastName ? (
                                            <div className="symbol-label fs-3 bg-light-danger text-danger">
                                                {user?.firstName?.charAt(0).toUpperCase()}
                                                {user?.lastName?.charAt(0).toUpperCase()}
                                            </div>
                                        ) : (
                                            <div className="symbol-label fs-3 bg-light-danger text-danger">
                                                {user?.firstName?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {data?.user.lastName ? (
                                            <div className="symbol-label fs-3 bg-light-danger text-danger">
                                                {data?.user?.firstName?.charAt(0).toUpperCase()}
                                                {data?.user?.lastName?.charAt(0).toUpperCase()}
                                            </div>
                                        ) : (
                                            <div className="symbol-label fs-3 bg-light-danger text-danger">
                                                {data?.user?.firstName?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </>
                                )}
                            </button>
                        </div>

                        {!data?.user?.mode && (
                            <>
                                <span className="fw-bolder text-gray-800">
                                    {' '}
                                    {`${data?.user?.civility?.abbreviation}   ${data?.user?.firstName}`}{' '}
                                </span>
                                {'  '}
                                <span className="text-gray-800 ms-1">
                                    {' '}
                                    {` ${data?.user?.lastName}`}
                                </span>
                            </>
                        )}
                        {data?.user?.mode === 'search' && !isUserLoading && (
                            <>
                                {' '}
                                {`${user?.civility?.abbreviation} ${user?.firstName} ${user?.lastName}`}
                            </>
                        )}
                        {data?.user?.mode === 'add' && !civilities.loading && (
                            <>
                                {' '}
                                {`${
                                    civilities?.page?.nodes?.find(
                                        (e) => e?.id == data?.user?.civilityId
                                    )?.abbreviation
                                } ${data?.user?.firstName} ${data?.user?.lastName}`}
                            </>
                        )}
                    </button>
                </td>
                <td>
                    <>
                        <span className="fs-6">
                            {data?.functionLabel?.pluralMaleName
                                ? data?.functionLabel?.pluralMaleName
                                : functionLabels?.page?.nodes?.find((v) => v?.id == data?.labelId)
                                      ?.pluralMaleName}
                        </span>
                    </>
                </td>
                <td>
                    <Period {...data} />
                </td>

                <td className="text-center sm">
                    <div className="btn-group">
                        <Ability I="write" an="user">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-edit">Modifier</Tooltip>}>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-icon btn-sm"
                                    onClick={toggleIsUpdate}>
                                    <i className="fa fa-edit"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>

                        <Ability I="delete" an="user">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-delete">Supprimer</Tooltip>}>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-icon btn-sm"
                                    onClick={toggleIsDelete}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </OverlayTrigger>
                        </Ability>
                    </div>
                </td>
            </tr>
            <FormProvider {...updateForm}>
                <NestedUpdate
                    id={data?.id}
                    isShow={isUpdate}
                    toggleShow={toggleIsUpdate}
                    collectionLabel="Fonction"
                    formId="update-function"
                    size="lg"
                    label={
                        <>
                            {!data?.user?.mode && (
                                <>
                                    {' '}
                                    {`${data?.user?.civility?.abbreviation} ${data?.user?.firstName} ${data?.user?.lastName}`}
                                </>
                            )}
                            {data?.user?.mode === 'search' && !isUserLoading && (
                                <>
                                    {' '}
                                    {`${user?.civility?.abbreviation} ${user?.firstName} ${user?.lastName}`}
                                </>
                            )}
                            {data?.user?.mode === 'add' && !civilities.loading && (
                                <>
                                    {' '}
                                    {`${
                                        civilities?.page?.nodes?.find(
                                            (e) => e?.id == data?.user?.civilityId
                                        )?.abbreviation
                                    } ${data?.user?.firstName} ${data?.user?.lastName}`}
                                </>
                            )}
                        </>
                    }
                    control={control}
                    name={params.functions.arrayName}>
                    <form id="update-function">
                        <Form isUpdate={true} />
                    </form>
                </NestedUpdate>
            </FormProvider>
            <NestedDelete
                name={params.functions.arrayName}
                id={data?.id}
                isShow={isDelete}
                toggleShow={toggleIsDelete}
                collectionLabel="Fonction"
                singleName="Fonction"
                control={control}
            />
            <View
                isShow={viewUser}
                toggleIsShow={toggleViewUser}
                size="xl"
                customTitle="Fiche personne"
                pluralName="users"
                id={data?.user?.id}
                label={`${data?.user?.civility?.abbreviation} ${data?.user?.firstName} ${data?.user?.lastName} `}>
                <UserView isMultipleTables={true} />
            </View>
        </>
    );
};

export default DTRow;
