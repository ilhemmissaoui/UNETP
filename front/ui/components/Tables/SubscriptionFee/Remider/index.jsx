import { yupResolver } from '@hookform/resolvers/yup';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import clsx from 'clsx';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Collapse, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

import useCRUD, { CRUDProvider } from '../../../../../hooks/use-crud';
import useToast from '../../../../../hooks/use-toast';
import reminderSchema from '../../../../../schemas/reminderSchema';
import settings from '../../../../../settings';
import { getCurrentYear } from '../../../../utils/time';
import withAbility, { Ability } from '../../../GUARDS';

const PaymentRemainder = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((v) => !v);
    const currentYear = getCurrentYear();
    const crud = useCRUD({
        pluralName: 'meta/recipients',
        lazy: true
    });

    const [data, setData] = useState();

    const { _export } = crud;
    const {
        getValues,
        trigger,
        reset,
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({
        resolver: yupResolver(reminderSchema)
    });
    const { endpointUrl } = settings;
    useEffect(() => {
        fetchUnpaidEstablishment();
        fetchMeta();
    }, []);
    const fetchUnpaidEstablishment = async () => {
        try {
            const { data } = await axios.get(
                `${endpointUrl}/subscription-fees/unpaid-establishement`
            );
            setIsLoading(false);
            setData(data);
        } catch (e) {
            setToast({
                message: 'Échec de la récupération des données',
                variant: 'danger'
            });
        }
    };
    const fetchMeta = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/meta/reminder`);
            reset({
                from: data?.from,
                label: data?.label,
                subject: data?.subject,
                model: data?.model
            });
        } catch (e) {
            setToast({
                message: 'Échec de la récupération des données',
                variant: 'danger'
            });
        }
    };
    const { setToast } = useToast();

    const submit = async (data) => {
        try {
            await axios.post(`${endpointUrl}/meta/send-reminder-email`, { data });
            setToast({
                message: 'relance a été envoyé avec succès',
                variant: 'success'
            });
        } catch (e) {
            setToast({
                message: "Erreur lors de l'envoi du relance",
                variant: 'danger'
            });
        }
    };
    const update = async () => {
        const model = getValues('model');
        if (await trigger('model')) {
            try {
                await axios.post(`${endpointUrl}/meta/email-template`, { model });
                setToast({
                    message: 'Modèle a été mis à jour avec succès.',
                    variant: 'success'
                });
            } catch (e) {
                setToast({
                    message: 'Erreur lors de mis à jour de modèle',
                    variant: 'danger'
                });
            }
        }
    };

    const handleExport = async () => {
        await _export({
            title: `Liste des destinataires - ${moment().format('DD/MM/YYYY - HH:mm')}.xlsx`
        });
        setToast({
            message: 'Liste des destinataires a été exporté avec succès',
            variant: 'success'
        });
    };

    return (
        <CRUDProvider {...crud}>
            {isLoading ? (
                <div className="d-flex w-100 justify-content-center my-20">
                    <Spinner animation="border" />
                </div>
            ) : (
                <form className="card" id="update" onSubmit={handleSubmit(submit)}>
                    <div className="card-header">
                        <div className="card-title">
                            {' '}
                            Relances des cotisations en Solde initial.
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="notice d-flex bg-light rounded  mb-9 p-6">
                            <div className="d-flex flex-stack flex-grow-1">
                                <div className="fw-bold">
                                    <h4 className="text-gray-900 fw-bolder">
                                        Vous avez la possibilité de personnaliser le message avec
                                        les mots clefs suivants :
                                    </h4>
                                    <div className="fs-5 text-gray-900">#NOM :</div>
                                    <div className="fs-6 text-gray-800">
                                        sera remplacé par le nom de la personne ou de
                                        l&apos;établissement. .
                                    </div>
                                    <div className="fs-6 text-gray-800">
                                        Lorsque vous validerez le formulaire, une liste des mots
                                        clefs détectés dans l&apos;e-mail sera affichée. S&apos;il
                                        en manque, cela signifie que vous les avez mal orthographié.
                                        <span className="text-dark bold">
                                            (Attention aux majuscules...)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label required">
                                    E-mail de l&apos;expéditeur :
                                </label>
                                <input
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.from
                                    })}
                                    name="from"
                                    type="text"
                                    {...register('from')}
                                />
                                <span className="invalid-feedback">{errors?.from?.message}</span>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="" className="form-label">
                                    Nom de l&apos;expéditeur :
                                </label>
                                <input
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.label
                                    })}
                                    name="label"
                                    type="text"
                                    {...register('label')}
                                />
                                <span className="invalid-feedback">{errors?.label?.message}</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label">
                                    Sujet :
                                </label>
                                <input
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.subject
                                    })}
                                    name="subject"
                                    type="text"
                                    {...register('subject')}
                                />
                                <span className="invalid-feedback">{errors?.subject?.message}</span>
                            </div>{' '}
                        </div>
                        <div className="row mt-4">
                            <div className="form-group">
                                <label htmlFor="model" className="form-label required">
                                    Message :
                                </label>

                                <Controller
                                    name="model"
                                    control={control}
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.model
                                    })}
                                    render={({ field }) => (
                                        <Editor
                                            onEditorChange={(v) => field.onChange(v)}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            ref={field.ref}
                                            init={{
                                                height: 500,
                                                branding: false,
                                                language_url: `/tinymce/langs/fr.js`,
                                                language: 'fr_FR',
                                                menubar:
                                                    'file edit view insert format tools table help',
                                                plugins: [
                                                    'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
                                                ],
                                                toolbar: `undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl`
                                            }}
                                        />
                                    )}
                                />
                                <span className="d-flex invalid-feedback">
                                    {errors?.model?.message}
                                </span>
                            </div>
                        </div>
                        <div className="separator my-5" />

                        <h4 className="text-gray-900 fw-bolder">
                            {' '}
                            Nombre de destinataires :{' '}
                            {data?.establishments?.length == undefined
                                ? 0
                                : data?.establishments?.length}
                            {data?.totalWithoutEmail && (
                                <>
                                    <span className="text-back ps-1">dont</span>
                                    <span className="fw-bold text-danger fs-5 ps-1">
                                        {data?.totalWithoutEmail} sans e-mail
                                    </span>
                                </>
                            )}{' '}
                        </h4>
                        {data?.establishments && (
                            <div>
                                {' '}
                                <ul>
                                    {data?.establishments?.slice(0, 5)?.map((e) => {
                                        return (
                                            <li key={e.id}>
                                                {e?.name}{' '}
                                                {!e?.email && (
                                                    <span className="fw-bold text-danger">
                                                        [pas d&apos;e-mail]
                                                    </span>
                                                )}{' '}
                                            </li>
                                        );
                                    })}
                                    <Collapse in={open}>
                                        <div>
                                            {data?.establishments?.slice(5)?.map((e) => {
                                                return (
                                                    <li key={e.id}>
                                                        {e?.name}{' '}
                                                        {!e?.email && (
                                                            <span className="fw-bold text-danger">
                                                                [pas d&apos;e-mail]
                                                            </span>
                                                        )}{' '}
                                                    </li>
                                                );
                                            })}
                                        </div>
                                    </Collapse>
                                </ul>
                                {data?.establishments?.length > 6 && (
                                    <button
                                        type="button"
                                        className="btn btn-link"
                                        onClick={toggleOpen}>
                                        {!open
                                            ? 'voir destinataires ...'
                                            : 'fermer destinataires ...'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <Link href="/structures-etablissement" className="btn btn-secondary me-2">
                            <i className="fa fa-arrow-left" /> Annuler
                        </Link>
                        <div>
                            <Ability I="email" an="subscriptionFees.relaunchInitialFees">
                                {data?.establishments?.length ? (
                                    <button
                                        type="submit"
                                        className="btn btn-primary me-2"
                                        form="update">
                                        <i className="fa fa-envelope"></i>
                                        Envoyer la relance
                                    </button>
                                ) : (
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip>
                                                vous devez ajouter une cotisation pour l&apos;année{' '}
                                                {currentYear}
                                            </Tooltip>
                                        }>
                                        <span style={{ cursor: 'not-allowed' }}>
                                            <button className="btn btn-primary me-2 " disabled>
                                                <i className="fa fa-envelope"></i>
                                                Envoyer la relance
                                            </button>
                                        </span>
                                    </OverlayTrigger>
                                )}
                            </Ability>

                            <Ability I="export" an="subscriptionFees.relaunchInitialFees">
                                {data?.establishments?.length ? (
                                    <button
                                        className="btn btn-danger me-2"
                                        type="button"
                                        onClick={handleExport}>
                                        <i className="fa fa-download"></i>
                                        Exporter liste des destinataires
                                    </button>
                                ) : (
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip>
                                                vous devez ajouter une cotisation pour l&apos;année{' '}
                                                {currentYear}
                                            </Tooltip>
                                        }>
                                        <span style={{ cursor: 'not-allowed' }}>
                                            <button className="btn btn-danger me-2" disabled>
                                                <i className="fa fa-download"></i>
                                                Exporter liste des destinataires
                                            </button>
                                        </span>
                                    </OverlayTrigger>
                                )}
                            </Ability>
                            <Ability I="write" an="subscriptionFees.relaunchInitialFees">
                                <button
                                    className="btn btn-success me-2 active"
                                    type="button"
                                    onClick={update}>
                                    <i className="fa fa-wrench"></i>
                                    Mettre à jour le modéle
                                </button>
                            </Ability>
                        </div>
                    </div>
                </form>
            )}
        </CRUDProvider>
    );
};
export default withAbility(PaymentRemainder, {
    a: 'subscriptionFees.relaunchInitialFees',
    I: 'list'
});
