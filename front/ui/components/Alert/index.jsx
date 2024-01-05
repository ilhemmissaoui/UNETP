import clsx from 'clsx';

const Alert = ({ title, description, variant = 'danger', isSolid, isDashed, isShow, close }) => {
    return isShow ? (
        <div
            className={clsx(
                'alert alert-dismissible border border-danger d-flex flex-column flex-sm-row w-100 p-5 mb-10',
                `bg${isSolid ? '' : '-light'}-${variant}`,
                isDashed && 'border-dashed'
            )}>
            <span className={`svg-icon svg-icon-2hx svg-icon-${variant} me-4 mb-5 mb-sm-0`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none">
                    <rect
                        opacity="0.3"
                        x={2}
                        y={2}
                        width={20}
                        height={20}
                        rx={10}
                        fill="currentColor"
                    />
                    <rect
                        x={11}
                        y={14}
                        width={7}
                        height={2}
                        rx={1}
                        transform="rotate(-90 11 14)"
                        fill="currentColor"
                    />
                    <rect
                        x={11}
                        y={17}
                        width={2}
                        height={2}
                        rx={1}
                        transform="rotate(-90 11 17)"
                        fill="currentColor"
                    />
                </svg>
            </span>

            <div className="d-flex flex-column">
                <h5 className="mb-1">{title}</h5>
                <span>{description}</span>
            </div>
            {close && (
                <button
                    type="button"
                    className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
                    data-bs-dismiss="alert"
                    onClick={close}>
                    <i className="bi bi-x fs-1 text-danger" />
                </button>
            )}
        </div>
    ) : null;
};
export default Alert;
