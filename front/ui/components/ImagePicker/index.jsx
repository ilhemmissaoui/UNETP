import { useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Cropper from 'react-easy-crop';
import { useFormContext } from 'react-hook-form';

const ActionWithLabel = ({ label, children }) =>
    label?.length ? (
        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top">{label}</Tooltip>}>
            {children}
        </OverlayTrigger>
    ) : (
        children
    );
const createImage = (url) =>
    new Promise((resolve, reject) => {
        const img = new Image();

        img.addEventListener('load', () => resolve(img));

        img.addEventListener('error', (error) => reject(error));

        img.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox

        img.src = url;
    });

function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
}

/**

 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop

 * @param {File} image - Image File url

 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop

 * @param {number} rotation - optional rotation parameter

 */

const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
    const image = await createImage(imageSrc);

    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');

    const maxSize = Math.max(image.width, image.height);

    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set each dimensions to double largest dimension to allow for a safe area for the

    // image to rotate in without being clipped by canvas context

    canvas.width = safeArea;

    canvas.height = safeArea;

    // translate canvas context to a central location on image to allow rotating around the center.

    ctx.translate(safeArea / 2, safeArea / 2);

    ctx.rotate(getRadianAngle(rotation));

    ctx.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.

    ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context

    canvas.width = pixelCrop.width;

    canvas.height = pixelCrop.height;

    // paste generated rotate image with correct offsets for x,y crop values.

    ctx.putImageData(
        data,

        Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),

        Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    // As Base64 string

    // return canvas.toDataURL('image/jpeg');

    // As a blob

    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            resolve(file);
        }, 'image/jpeg');
    });
};

const ImagePicker = ({
    fieldName = 'image',
    defaultImage,
    withCrop,
    children,
    setLabel,
    clearLabel
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [isCrop, setIsCrop] = useState(false);
    const [croppedArea, setCroppedArea] = useState();
    const [name, setName] = useState();

    const [zoom, setZoom] = useState(1);
    const [imageObjectUrl, setImageObjectUrl] = useState(defaultImage);
    const { setValue } = useFormContext();
    const handleImage = ({ target: { files } }) => {
        const [image] = files;
        if (image) {
            if (!withCrop) setValue(fieldName, files);
            if (image) setImageObjectUrl(URL.createObjectURL(image));
            if (withCrop) {
                setName(image.name);
                setIsCrop(true);
            }
        }
    };
    const clearImage = () => {
        setImageObjectUrl();
        setValue(fieldName);
        input.current.value = '';
    };
    const cancelCrop = () => {
        setImageObjectUrl();
        setValue(fieldName);
        setIsCrop(false);
        input.current.value = '';
    };
    const getImage = async () => {
        const blob = await getCroppedImg(imageObjectUrl, croppedArea);

        const file = new File([blob], name, { type: blob.type });

        setValue(fieldName, [file]);
        setImageObjectUrl(URL.createObjectURL(file));
        setIsCrop(false);
    };
    const input = useRef();
    return (
        <div className="image-input image-input-outline" data-kt-image-input="true">
            {imageObjectUrl ? (
                <img
                    alt=""
                    className="image-input-wrapper w-125px h-125px "
                    src={imageObjectUrl ? imageObjectUrl : '/images/blank-image.svg'}
                />
            ) : (
                children
            )}
            <ActionWithLabel label={setLabel}>
                <label
                    className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                    data-kt-image-input-action="change">
                    <i className="bi bi-pencil-fill fs-7" />

                    <input
                        type="file"
                        ref={input}
                        className="d-none"
                        accept="image/*"
                        onChange={handleImage}
                    />
                    <input type="hidden" name="avatar_remove" />
                </label>
            </ActionWithLabel>
            <span
                className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                data-kt-image-input-action="cancel"
                data-bs-toggle="tooltip"
                title
                data-bs-original-title="Cancel avatar">
                <i className="bi bi-x fs-2" onClick={clearImage} />
            </span>

            {imageObjectUrl && (
                <ActionWithLabel label={clearLabel}>
                    <span
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                        data-kt-image-input-action="remove"
                        data-bs-toggle="tooltip"
                        title
                        data-bs-original-title="Remove avatar">
                        <i className="bi bi-x fs-2" onClick={clearImage} />
                    </span>
                </ActionWithLabel>
            )}

            <Modal show={isCrop} size="xl" onHide={cancelCrop}>
                <Modal.Header className="mb-2">
                    <Modal.Title>Centrer et détourer l&apos;image</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div style={{ height: 500 }}>
                        <Cropper
                            image={imageObjectUrl}
                            crop={crop}
                            aspect={1}
                            onCropChange={setCrop}
                            zoom={zoom}
                            onZoomChange={setZoom}
                            onCropComplete={(_, v) => setCroppedArea(v)}
                            showGrid
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <div className="row">
                        <div className="col-lg">
                            <button className="btn btn-secondary mr-1" onClick={cancelCrop}>
                                Annuler
                            </button>
                        </div>
                        <div className="col-lg">
                            <button className="btn btn-primary" onClick={getImage}>
                                Confirmer
                            </button>
                        </div>{' '}
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ImagePicker;
