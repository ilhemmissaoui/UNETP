import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import { CRUDProvider, useMultiCRUDContext } from '../../../hooks/use-crud';
import useToast from '../../../hooks/use-toast';
import coordinateSchema from '../../../schemas/coordinatesSchema';
import settings from '../../../settings';
import UpdateModal from '../Modals/Update';
import Form from '../SharedComponents/Coordinates/Form';

const { endpointUrl } = settings;
const Coordinates = ({ data }) => {
    const { refetch } = useMultiCRUDContext();
    const updateForm = useForm({
        resolver: yupResolver(coordinateSchema),
        defaultValues: data?.coordinates[0]
    });
    const { setToast } = useToast();

    const coordinateId =
        data?.coordinates.find((e) => e?.isDefault)?.id || data?.coordinates[0]?.id;

    const update = async (item) => {
        try {
            await axios.post(`${endpointUrl}/coordinates/user-coordinate/${coordinateId}`, {
                item
            });
            refetch();
            setToast({
                message: 'Coordonnée a été mis à jour avec succès',
                variant: 'success'
            });
        } catch (e) {
            setToast({
                message: `Erreur lors de la mise à jour du Coordonnée `,
                variant: 'danger'
            });
        }
    };
    const [isUpdate, setIsUpdate] = useState();
    const toggleIsUpdate = () => {
        setIsUpdate((v) => !v);
    };
    const phoneNumber =
        data?.coordinates.find((e) => e?.isDefault)?.phoneNumber ||
        data?.coordinates[0]?.phoneNumber;
    const phoneNb = phoneNumber.toString().replace(/\B(?=(\d{2})+(?!\d))/g, '.');
    const mail = data?.coordinates.find((e) => e?.isDefault)?.email || data?.coordinates[0]?.email;
    const coordinates = data?.coordinates.find((e) => e.isDefault) || data?.coordinates[0];
    const names = data?.name.substring(0, 3);
    return (
        <>
            <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2 py-5">
                Renseignements :
            </span>
            <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-3 mt-2 py-5">
                    Coordonnées par défaut de l&apos;établissement :
                </span>

                <span className="col-lg-4 fw-bold  text-gray-600 fs-6">{data?.name}</span>
                <span className="fw-bolder col-lg-8 fs-5 ps-10">
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
                </span>
                <div className="row mb-2 py-4">
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">Téléphone :</span>
                    <span className="fw-bolder col-lg-8 fs-5">{phoneNb}</span>
                </div>
                <div className="row mb-2">
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">
                        Mail établissement :
                    </span>
                    <span className="fw-bolder col-lg-8 fs-5">
                        <a target="_blank" href={`mailto:nathalie@unetp.eu`} rel="noreferrer">
                            {mail}
                        </a>
                    </span>
                </div>

                <div className="row mb-2">
                    <span className="col-lg-4 fw-bold text-gray-600 fs-6">Adresse :</span>
                    <span className="fw-bolder col-lg-8 fs-5">
                        {names} <br /> {coordinates?.voiceNumber} {coordinates?.voiceLabel} <br />{' '}
                        {coordinates?.zipCode} {coordinates?.city} <br />
                        {coordinates?.country?.label}
                    </span>
                </div>
            </div>

            <FormProvider {...updateForm}>
                <CRUDProvider update={update}>
                    <UpdateModal
                        id={coordinateId}
                        isShow={isUpdate}
                        toggleShow={toggleIsUpdate}
                        collectionLabel="Coordonnée"
                        formId="update-coordinate"
                        size="lg"
                        label={data?.name}>
                        <form id="update-coordinate">
                            <Form />
                        </form>
                    </UpdateModal>
                </CRUDProvider>
            </FormProvider>
        </>
    );
};
export default Coordinates;
