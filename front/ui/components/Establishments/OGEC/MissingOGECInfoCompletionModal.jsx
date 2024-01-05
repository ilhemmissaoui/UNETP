import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import useAuth from '../../../../hooks/use-auth';
import useToast from '../../../../hooks/use-toast';
import settings from '../../../../settings';
import EstablishmentItem from './EstablishmentItem';

const { endpointUrl } = settings;

const MissingOGECInfoCompletionModal = () => {
    const [establishements, setEstablishements] = useState([]);
    const [isShow, setIsShow] = useState();
    const toggleShow = () => setIsShow((v) => !v);
    const [fixedEstablishment, setFixedEstablishments] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState();

    const [currentTab, setCurrentTab] = useState(0);
    const { setToast } = useToast();
    const gotoNextStep = () => setCurrentTab((v) => v + 1);
    const { logout } = useAuth();

    const lastItem = establishements[currentTab] == establishements[establishements?.length - 1];

    const addEstablishment = async (data) => {
        const finalFields = data;

        if (lastItem) {
            const initialFields = establishements[establishements?.length - 1];

            let changes = [
                Object.entries(finalFields)
                    .reduce((acc, cv) => {
                        if (
                            JSON.stringify(finalFields[cv[0]]) !=
                            JSON.stringify(initialFields[cv[0]])
                        )
                            acc.push(cv);
                        return acc;
                    }, [])
                    .reduce((acc, cv) => {
                        acc[cv[0]] = cv[1];
                        return acc;
                    }, {})
            ];

            update([...fixedEstablishment, changes[0]]);
        } else {
            const initialFields = establishements[currentTab];

            let changes = [
                Object.entries(finalFields)
                    .reduce((acc, cv) => {
                        if (
                            JSON.stringify(finalFields[cv[0]]) !=
                            JSON.stringify(initialFields[cv[0]])
                        )
                            acc.push(cv);
                        return acc;
                    }, [])
                    .reduce((acc, cv) => {
                        acc[cv[0]] = cv[1];
                        return acc;
                    }, {})
            ];

            setFixedEstablishments((v) => [...v, changes[0]]);
            gotoNextStep();
        }
    };

    const update = async (data) => {
        setIsSubmitting(true);
        try {
            await axios.post(`${endpointUrl}/establishments/submit-ogec-info`, data);

            setToast({
                message:
                    "Les informations de coordonnées de l’organisme de gestion ont été soumises avec succès, veuillez attendre la modération de l'administrateur.",
                variant: 'success'
            });
            toggleShow();
        } catch (e) {
            setToast({
                message: 'Erreur lors de la soumission des informations',
                variant: 'danger'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchEstablishments = async () => {
        try {
            const { data } = await axios.get(
                `${endpointUrl}/establishments/establishment-without-ogec`
            );
            const establishments = data.map(({ organization }) => ({
                ogecName: organization?.establishment?.ogecName,
                ogecAddress: organization?.establishment?.ogecAddress,
                ogecPhoneNumber: organization?.establishment?.ogecPhoneNumber,
                ogecCity: organization?.establishment?.ogecCity,
                ogecEmail: organization?.establishment?.ogecEmail,
                establishmentId: organization?.establishment?.id,
                name: organization?.name
            }));

            setEstablishements(establishments);

            setIsShow(!!establishments?.length);
        } catch (e) {
            setToast('Erreur lors de la récupération de cotisations');
        }
    };
    useEffect(async () => {
        await fetchEstablishments();
    }, []);

    return (
        <Modal show={isShow} size="xl">
            <Modal.Header>
                <Modal.Title>{'Coordonnées de l’organisme de gestion'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
                    id="kt_create_account_stepper"
                    data-kt-stepper="true">
                    <div className="card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-250px w-xxl-400px me-9">
                        <div className="card-body  px-lg-8 px-xxl-20">
                            {establishements.map(({ name }, i) => (
                                <div className="stepper-nav" key={name}>
                                    <div
                                        className={clsx(
                                            'stepper-item',
                                            {
                                                current: currentTab === i
                                            },
                                            {
                                                panding: currentTab < i
                                            },
                                            {
                                                completed: currentTab > i
                                            }
                                        )}>
                                        <div className="stepper-wrapper">
                                            <div className="d-flex align-items-center">
                                                <div className="stepper-icon symbol symbol-50px me-5">
                                                    <i className="stepper-check fas fa-check" />
                                                    <span className="stepper-number">{i + 1}</span>
                                                </div>
                                                <div className="stepper-label">
                                                    <a
                                                        href="#"
                                                        className={clsx(
                                                            ' text-active-primary text-gray-700 fw-bolder fs-5',
                                                            {
                                                                active: currentTab === i
                                                            }
                                                        )}>
                                                        {name}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        {i !== establishements?.length - 1 && (
                                            <div className="stepper-line h-40px" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card d-flex flex-row-fluid">
                        <EstablishmentItem
                            index={currentTab}
                            key={establishements[currentTab]?.establishmentId}
                            data={establishements[currentTab]}
                            addEstablishment={addEstablishment}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex w-100 justify-content-between">
                    <button className="btn btn-primary" onClick={logout}>
                        <span className="svg-icon svg-icon-4 me-1">
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect
                                    opacity="0.5"
                                    x={6}
                                    y={11}
                                    width={13}
                                    height={2}
                                    rx={1}
                                    fill="currentColor"
                                />
                                <path
                                    d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                        Quitter et remplir plus tard
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success"
                        disabled={isSubmitting}
                        form={`establishment-${currentTab}`}>
                        <span
                            className={clsx('indicator-label', {
                                'd-none': isSubmitting
                            })}>
                            {lastItem ? 'Valider' : 'Continuer'}
                        </span>

                        <span className="svg-icon svg-icon-4 ms-1 me-0">
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect
                                    opacity="0.5"
                                    x={18}
                                    y={13}
                                    width={13}
                                    height={2}
                                    rx={1}
                                    transform="rotate(-180 18 13)"
                                    fill="currentColor"
                                />
                                <path
                                    d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>

                        <span
                            className={clsx('indicator-progress', {
                                'd-block': isSubmitting
                            })}>
                            S&apos;il vous plaît, attendez...
                            <span className="spinner-border spinner-border-sm align-middle ms-2" />
                        </span>
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default MissingOGECInfoCompletionModal;
