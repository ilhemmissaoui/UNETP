import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import { Controller, useFormContext } from 'react-hook-form';

import useToast from '../../../hooks/use-toast';
import settings from '../../../settings';
const { endpointUrl } = settings;

const NestedConfirm = ({
    title,
    prefix,
    isShow = false,
    toggleIsShow,
    successMessage,
    errorMessage,
    size,
    data
}) => {
    const [serverError, setServerError] = useState();
    const { setToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState();
    const establishmentId = data?.organization?.establishment?.id;
    const updateForm = useFormContext();

    const isHeadMaster = data?.organization?.functions.find(
        (e) => e?.functionLabel?.singularMaleName === "Chef d'établissement"
    );
    const recipient =
        isHeadMaster?.user?.coordinates?.find((e) => e?.isDefault)?.email ||
        isHeadMaster?.user?.coordinates[0]?.email;

    const {
        handleSubmit,
        watch,
        register,
        formState: { errors },
        control
    } = updateForm;

    const submit = async () => {
        const data = watch();
        data.establishmentId = establishmentId;
        setIsSubmitting(true);

        try {
            await axios.post(`${endpointUrl}/${prefix}`, { data });
            setToast({
                message: `${successMessage}`,
                variant: 'success'
            });
            toggleIsShow();
        } catch (e) {
            setServerError(e?.message);
            setToast({
                message: `${errorMessage}`,
                variant: 'danger'
            });
        }
        setIsSubmitting(false);
    };

    return (
        <Modal show={isShow} onHide={toggleIsShow} size={size}>
            <Modal.Header>
                <Modal.Title className="text-uppercase">
                    <a
                        target="_blank"
                        hrel="noreferrer"
                        rel="noreferrer"
                        className="d-flex align-items-center text-primary-400 text-primary mb-2">
                        <span className="svg-icon svg-icon-4 me-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    opacity="0.3"
                                    d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                        {title}
                    </a>
                </Modal.Title>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={toggleIsShow}
                />
            </Modal.Header>
            <form id="mailing" onSubmit={handleSubmit(submit)}>
                <Modal.Body>
                    {serverError && <Alert variant="danger">{serverError}</Alert>}
                    <div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label required">
                                    Destinataire :
                                </label>
                                <input
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.recipient
                                    })}
                                    name="recipient"
                                    type="text"
                                    defaultValue={recipient}
                                    {...register('recipient')}
                                />
                                <span className="invalid-feedback">
                                    {errors?.recipient?.message}
                                </span>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="" className="form-label required">
                                    Sujet :
                                </label>
                                <input
                                    className={clsx('form-control ', {
                                        'is-invalid': errors?.subject
                                    })}
                                    name="subject"
                                    type="text"
                                    {...register('subject')}
                                />
                                <span className="invalid-feedback">{errors?.subject?.message}</span>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="form-group">
                                <label htmlFor="model" className="form-label required">
                                    Message :
                                </label>

                                <Controller
                                    name="partialModel"
                                    className={clsx('form-control', {
                                        'is-invalid': errors?.partialModel
                                    })}
                                    control={control}
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
                                    {errors?.partialModel?.message}
                                </span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex w-100 justify-content-between">
                        <button className="btn btn-secondary" onClick={toggleIsShow} type="button">
                            <i className="far fa-times-circle fs-4 me-2" />
                            Annuler
                        </button>

                        <button
                            className="btn btn-success"
                            form="mailing"
                            type="submit"
                            onClick={submit}
                            disabled={isSubmitting}>
                            <span
                                className={clsx('indicator-label', {
                                    'd-none': isSubmitting
                                })}>
                                <i className="fa fa-envelope"></i>
                                Envoyer
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
            </form>
        </Modal>
    );
};

export default NestedConfirm;
