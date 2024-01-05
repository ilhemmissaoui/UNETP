import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import settings from '../../../../settings';
import NestedConfirm from '../../Modals/NestendConfirm';
import List from './List';
import Paymnets from './Payment';
const { endpointUrl } = settings;
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import useToast from '../../../../hooks/use-toast';
import partialReminderSchema from '../../../../schemas/partialReminder';

const SubscriptionFees = () => {
    const updateFrom = useFormContext();
    const data = updateFrom.watch();
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const { setToast } = useToast();

    const updateForm = useForm({
        resolver: yupResolver(partialReminderSchema)
    });
    const { reset } = updateForm;

    useEffect(() => {
        if (data?.status === 'Solde partiel') {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [data?.status]);

    const fetchMeta = async () => {
        try {
            const { data } = await axios.get(`${endpointUrl}/meta/reminder`);

            reset({
                subject: data?.subject,
                partialModel: data?.partialModel
            });
        } catch (e) {
            setToast({
                message: 'Échec de la récupération des données',
                variant: 'danger'
            });
        }
    };

    const toggleIsShow = () => setShow((v) => !v);

    const toggleIsClick = async () => {
        toggleIsShow();
        await fetchMeta();
    };

    return (
        <>
            <div className="separator my-5" />
            <div className="notice d-flex bg-light rounded border p-3 mb-3">
                <div className="flex-shrink-0 mb-3">
                    <span className="text-dark fs-5 fw-bolder me-2 d-block lh-1 pb-1 p-3">
                        Solde{' '}
                    </span>
                </div>{' '}
            </div>
            <List columnsCount={6} data={data} status={data?.status} />
            <div className="separator my-5" />

            <FormProvider {...updateFrom}>
                <Paymnets />
            </FormProvider>

            <Collapse in={open}>
                <button className="btn btn-sm btn-primary" type="button" onClick={toggleIsClick}>
                    <i className="fa fa-envelope"></i> Envoyer la relance de cotisation
                </button>
            </Collapse>
            <FormProvider {...updateForm}>
                <NestedConfirm
                    isShow={show}
                    toggleIsShow={toggleIsShow}
                    prefix="subscription-fees/send-reminder-email"
                    title="Relance de cotisation par mail"
                    successMessage="Les mails sont envoyés avec succès ."
                    errorMessage="Une erreur s'est produite lors de l'envoi des e-mails ."
                    size="lg"
                    data={data}
                />
            </FormProvider>
        </>
    );
};
export default SubscriptionFees;
