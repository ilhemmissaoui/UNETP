import Link from 'next/link';

const EmptyState = ({
    action,
    actionIcon = 'bi bi-plus-circle fs-4 me-2',
    actionLabel = 'Création',
    secondaryAction,
    secondaryActionIcon,
    secondaryActionLabel,
    statement = "Il n'y a aucun élément à afficher."
}) => {
    return (
        <div className="card">
            <div className="card-body text-center">
                <p className="text-gray-400 fs-4 fw-bold mb-10">{statement}</p>
                {action ? (
                    <>
                        {typeof action === 'string' ? (
                            <Link href={action} passHref>
                                <a className="btn btn-primary">
                                    <i className={actionIcon} />
                                    {actionLabel}
                                </a>
                            </Link>
                        ) : (
                            <button className="btn btn-primary" type="button" onClick={action}>
                                <i className={actionIcon} />
                                {actionLabel}
                            </button>
                        )}

                        {secondaryAction ? (
                            typeof secondaryAction === 'string' ? (
                                <Link href={secondaryAction} passHref>
                                    <a className="ms-5 btn btn-primary">
                                        <i className={secondaryActionIcon} />
                                        {secondaryActionLabel}
                                    </a>
                                </Link>
                            ) : (
                                <button
                                    className="ms-5 btn btn-primary"
                                    type="button"
                                    onClick={secondaryAction}>
                                    <i className={secondaryActionIcon} />
                                    {secondaryActionLabel}
                                </button>
                            )
                        ) : null}
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default EmptyState;
