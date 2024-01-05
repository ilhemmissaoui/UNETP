import moment from 'moment';
import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';

import { CRUDProvider } from '../../../../../../hooks/use-crud';
import Confirm from '../../../../Modals/confirm';

const GeneralCalls = ({ data }) => {
    const [isConfirm, setIsConfirm] = useState();
    const toggleIsConfirm = () => setIsConfirm((v) => !v);
    const count = data?.establishments?.filter((a) => !a?.email)?.length;
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((v) => !v);

    return (
        <CRUDProvider>
            <div className="mt-4">
                <div>
                    <span className="text-gray-600 fs-5 fw-bolder">Dernier appel en date : </span>{' '}
                    <span className="text-gray-900 fs-5 fw-bolder">
                        {' '}
                        {data?.lastCallDate
                            ? moment(data?.lastCallDate).format('DD/MM/YYYY')
                            : 'Aucun'}
                    </span>
                </div>
                <div>
                    <span className="text-gray-600 fs-5 fw-bolder">Prochain appel :</span>{' '}
                    <span className="text-gray-900 fs-5 fw-bolder">
                        {' '}
                        {data?.remindDate !== null
                            ? moment(data?.remindDate).format('DD/MM/YYYY')
                            : 'Non progammé'}
                    </span>
                </div>
                <div className="notice d-flex bg-light rounded border p-5 my-2">
                    <div className="">
                        <span className="text-gray-800 fw-bolder fs-6  me-2 d-block lh-1 pb-1">
                            Vous pouvez envoyer manuellement l&apos;appel général de cotisations en{' '}
                            cliquant sur le lien ci-dessous.
                            <br />
                            <br />
                            L&apos;appel sera envoyé aux établissements adhérents. Ce sont le(s)
                            chef(s) de ces établissements qui recevront l&apos;e-mail.
                            <br /> <br /> Ces personnes doivent avoir une coordonnée avec pour
                            libellé &apos;Email perso&apos;
                        </span>
                    </div>
                </div>
                {data?.establishments?.length > 0 && (
                    <button className="btn  btn-link" type="button" onClick={toggleIsConfirm}>
                        <i className="las la-envelope fs-1"></i> Envoyez l&apos;appel général de
                        cotisations.
                    </button>
                )}
                <div className="separator my-5" />
                {data?.lastLogCall && (
                    <div>
                        <span className="fw-bold text-gray-600 fs-6">
                            Infos sur le dernier appel :{' '}
                        </span>{' '}
                        <span className="  text-gray-900 fs-5 fw-bolder"> {data?.lastLogCall}</span>
                    </div>
                )}
                <div>
                    <span className="fw-bold text-gray-600 fs-6">
                        Nombre d&apos;e-mails à envoyer :{' '}
                    </span>{' '}
                    <span className="text-gray-900 fw-bolder fs-5">
                        {' '}
                        {data?.establishments?.length || 0}
                    </span>
                </div>

                {data?.establishments?.length > 0 && (
                    <div className="notice bg-light rounded border p-7">
                        {' '}
                        <span className="fw-bold text-gray-600 fs-6">
                            Liste des destinataires : <span className="text-back">dont</span>{' '}
                            {count && (
                                <span className="fw-bold text-danger fs-5">
                                    {count} sans e-mail
                                </span>
                            )}
                        </span>
                        <ul>
                            {data?.establishments?.slice(0, 5)?.map((e) => {
                                const hasMail = !!e?.email;
                                return (
                                    <li className="text-primary fs-5 me-2 fw-bold" key={e.id}>
                                        <span className="fw-bolder col-lg-8 fs-5">
                                            <a
                                                target="_blank"
                                                href={`mailto:${e?.email}`}
                                                rel="noreferrer">
                                                {e?.email}
                                            </a>
                                        </span>{' '}
                                        {!hasMail && (
                                            <>
                                                {' '}
                                                {e?.establishments?.name}
                                                <span className="badge badge-primary">
                                                    {e?.establishment?.establishmentKey}
                                                </span>
                                                <span className="fw-bold text-danger">
                                                    [pas d&apos;e-mail]
                                                </span>
                                            </>
                                        )}{' '}
                                    </li>
                                );
                            })}

                            <Collapse in={open}>
                                <div>
                                    {data?.establishments?.slice(0)?.map((e) => {
                                        const hasMail = !!e?.email;
                                        return (
                                            <li
                                                className="text-primary fs-5 me-2 fw-bolder"
                                                key={e.id}>
                                                <a
                                                    target="_blank"
                                                    href={`mailto:${e?.email}`}
                                                    rel="noreferrer">
                                                    {e?.email}
                                                </a>
                                                {!hasMail && (
                                                    <>
                                                        {e?.name}
                                                        <span className="badge badge-primary mx-1">
                                                            {e?.establishment?.establishmentKey}
                                                        </span>
                                                        <span className="fw-bold text-danger">
                                                            [pas d&apos;e-mail]
                                                        </span>
                                                    </>
                                                )}{' '}
                                            </li>
                                        );
                                    })}
                                </div>
                            </Collapse>
                        </ul>
                        {data?.establishments?.length > 6 && (
                            <div className="d-flex justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={toggleOpen}>
                                    {!open ? 'Voir destinataires' : 'Fermer destinataires'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Confirm
                isShow={isConfirm}
                toggleIsShow={toggleIsConfirm}
                prefix="subscription-params/send-subscription-fees"
                title="confirmation d'envoi"
                action="Etes-vous sûr que vous voulez envoyer"
                label="l'appel général de cotisations ?"
                successMessage="les mails sont envoyés avec succès ."
                errorMessage="Une erreur s'est produite lors de l'envoi des e-mails ."
                id={data?.id}
            />
        </CRUDProvider>
    );
};

export default GeneralCalls;
