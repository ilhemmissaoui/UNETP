import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import useToast from '../../hooks/use-toast';
import settings from '../../settings';
import Accept from '../../ui/components/Modals/Accept';
import ApplyRequest from '../../ui/components/Modals/ApplyRequest';
import Decline from '../../ui/components/Modals/Decline';
import Layout from '../../ui/layouts';
const { endpointUrl } = settings;

const fieldLabels = {
    ogecName: 'Nom de coordonnées de l’organisme de gestion',
    ogecAddress: 'Code postale de coordonnées de l’organisme de gestion',
    ogecPhoneNumber: 'Numéro de téléphone de coordonnées de l’organisme de gestion',
    ogecEmail: 'E-mail de coordonnées de l’organisme de gestion',
    ogecCity: 'Ville de téléphone de coordonnées de l’organisme de gestion'
};

const Request = () => {
    const [isAccept, setIsAccept] = useState();
    const [isApply, setIsApply] = useState();
    const toggleIsApply = () => setIsApply((v) => !v);
    const toggleIsAccept = () => setIsAccept((v) => !v);
    const [isDecline, setIsDecline] = useState();
    const toggleIsDecline = () => setIsDecline((v) => !v);
    const [acceptedFields, setAcceptedFields] = useState([]);
    const [declinedFields, setDeclinedFields] = useState([]);
    const { setToast } = useToast();

    const { query } = useRouter();
    const [data, setData] = useState();
    const fetchRequest = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/request-change/request/${query?.id}`);
            data.json = JSON.parse(data?.json);
            setData(data);
        } catch (e) {
            setToast('Erreur lors de la récupération de demande');
        }
    };

    useEffect(() => {
        if (query?.id) fetchRequest();
    }, [query?.id]);
    const addToAccepted = (field) => () => setAcceptedFields((v) => [...v, field]);
    const addToDeclined = (field) => () => setDeclinedFields((v) => [...v, field]);
    return (
        <Layout>
            <Head>
                <title>Gestion des demandes | {process.env.platformName} </title>
            </Head>

            <div className="container-fluid fs-6 my-5">
                <div className="card">
                    <div className="card-body">
                        <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light">
                            <div className="flex-shrink-0">
                                <div className="ps-5 my-5">
                                    {' '}
                                    Une <strong>demande de modification </strong> a été faite sur
                                    cet établissement. L&apos;enregistrement de cet établissement
                                    sera vérouillé tant que vous ne l&apos;aurez pas traité. Vous
                                    pouvez voir ci- <br /> dessous la liste des champs de
                                    l&apos;établissement qui font l&apos;objet d&apos;une demande de
                                    modification.
                                    <br />
                                    Pour chaque champ, les actions possibles sont : <br />
                                    <lu>
                                        <li>
                                            {' '}
                                            <strong>appliquer : </strong> reporte la modification
                                            dans l&apos;onglet correspondant.
                                        </li>
                                        <li>
                                            <strong>ignorer : </strong> ne pas tenir compte de la
                                            demande.
                                        </li>
                                    </lu>
                                    Si vous vous tromper dans le choix d&apos;une action, fermez
                                    l&apos;établissement puis ré-ouvrez le. Il n&apos;est en effet
                                    pas possible de revenir en arrière.
                                    <br />
                                    Une fois tous les champs traités, le bouton
                                    d&apos;enregistrement se réactive. <br />
                                    En cliquant dessus : <br />
                                    <lu>
                                        <li> les modifications sont enregistrées. </li>
                                        <li>
                                            la demande de modération (cet onglet) est supprimée.
                                        </li>
                                    </lu>
                                </div>
                            </div>
                        </div>
                        <div className="border border-dashed border-gray-400 rounded p-3 mt-3 bg-light mb-10">
                            <div className="flex-shrink-0">
                                <span className="text-gray-700 fs-4 fw-bolder me-2 d-block lh-1 pb-2 mt-2">
                                    Nom de la structure d&apos;établissement
                                </span>
                                <span className="text-dark fs-1 fw-bolder">
                                    {data?.establishment?.organization?.name}
                                </span>
                            </div>{' '}
                        </div>

                        {Object.entries(data?.json || {})
                            ?.filter((e) => fieldLabels[e[0]]?.length)
                            .map(([key, value]) => (
                                <div className="form-group my-3 d-flex justify-content-between" key>
                                    <div>
                                        <label htmlFor="" className="me-2">
                                            {fieldLabels[key]} :
                                        </label>
                                        <strong>{value}</strong>
                                    </div>
                                    {!acceptedFields.includes(key) &&
                                    !declinedFields.includes(key) ? (
                                        <div className="btn-group">
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="tooltip-edit">appliquer</Tooltip>
                                                }>
                                                <button
                                                    className="btn btn-sm btn-success btn-icon"
                                                    type="button"
                                                    onClick={addToAccepted(key)}>
                                                    <i className="fa fa-check"></i>
                                                </button>
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="tooltip-edit">ignorer</Tooltip>
                                                }>
                                                <button
                                                    className="btn btn-sm btn-danger btn-icon"
                                                    type="button"
                                                    onClick={addToDeclined(key)}>
                                                    <i className="fa fa-times"></i>
                                                </button>
                                            </OverlayTrigger>
                                        </div>
                                    ) : acceptedFields?.includes(key) ? (
                                        <span className="bg-success text-white fw-bold rounded py-2 w-100px text-center">
                                            Appliqué
                                        </span>
                                    ) : (
                                        <span className="bg-danger text-white fw-bold rounded py-2 w-100px text-center">
                                            ignoré
                                        </span>
                                    )}
                                </div>
                            ))}
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <button
                            className="btn btn-danger btn-sm"
                            type="button"
                            onClick={toggleIsDecline}>
                            <i className="fa fa-times"></i>
                            Ignorer toutes les demandes
                        </button>
                        <div>
                            <button
                                className="btn btn-success btn-sm me-2"
                                type="button"
                                onClick={toggleIsAccept}>
                                <i className="fa fa-check"></i>
                                Appliquer toutes les demandes
                            </button>
                            {(!!acceptedFields?.length || !!declinedFields?.length) && (
                                <button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                    onClick={toggleIsApply}>
                                    <i className="fa fa-check"></i>
                                    Appliquer les demandes séléctionnées
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Accept
                isShow={isAccept}
                toggleIsShow={toggleIsAccept}
                collectionLabel="request"
                singleName="Request"
                id={query?.id}
                organizationId={data?.establishment?.organization?.id}
            />
            <ApplyRequest
                isShow={isApply}
                toggleIsShow={toggleIsApply}
                id={query?.id}
                acceptedFields={acceptedFields}
                organizationId={data?.establishment?.organization?.id}
            />

            <Decline
                id={query?.id}
                isShow={isDecline}
                toggleShow={toggleIsDecline}
                collectionLabel="Personne"
                singleName="Personne"
            />
        </Layout>
    );
};

export default Request;
