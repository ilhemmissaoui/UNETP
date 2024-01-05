import { useEffect, useState } from 'react';

import Confirm from '../../Modals/confirm';
import DTRow from './EstablishmentView';

const establishmentKeyEndings = [
    {
        key: '0'
    },
    {
        key: '1',
        name: 'CFA/UFA'
    },
    {
        key: '2',
        name: 'CFC/CFP'
    },
    {
        key: '3'
    },
    {
        key: '4'
    }
];

const EstablishmentItem = ({ data }) => {
    const [fullName, setFullName] = useState([]);
    const [isConfirm, setIsConfirm] = useState();
    const [title, setTitle] = useState();
    const toggleIsConfirm = (name) => {
        setTitle(name);
        setIsConfirm((v) => !v);
    };

    useEffect(() => {
        establishmentKeyEndedByZero(data);
        establishmentKeyEndedByThree(data);
        establishmentKeyEndedByFour(data);
    }, [data]);

    const establishmentKeyEndedByZero = async (nodes) => {
        const establishmentKeyEndedByZero = nodes.find((e) =>
            establishmentKeyEndings[0]?.key.includes(
                e?.organization?.establishment?.establishmentKey.charAt(
                    e?.organization?.establishment?.establishmentKey.length - 1
                )
            )
        );

        if (establishmentKeyEndedByZero) {
            const establishmentKeyEndedByOne = !!nodes.find((e) =>
                establishmentKeyEndings[1]?.key.includes(
                    e?.organization?.establishment?.establishmentKey.charAt(
                        e?.organization?.establishment?.establishmentKey.length - 1
                    )
                )
            );
            const establishmentKeyEndedByTwo = !!nodes.find((e) =>
                establishmentKeyEndings[2]?.key.includes(
                    e?.organization?.establishment?.establishmentKey.charAt(
                        e?.organization?.establishment?.establishmentKey.length - 1
                    )
                )
            );

            if (!establishmentKeyEndedByOne && !establishmentKeyEndedByTwo) {
                setFullName((oldArray) => [...oldArray, `${establishmentKeyEndings[1]?.name} `]);
                setFullName((oldArray) => [...oldArray, `${establishmentKeyEndings[2]?.name}`]);
            } else if (!establishmentKeyEndedByTwo) {
                setFullName((oldArray) => [...oldArray, `${establishmentKeyEndings[2]?.name}`]);
            } else if (!establishmentKeyEndedByOne) {
                setFullName((oldArray) => [...oldArray, `${establishmentKeyEndings[1]?.name}`]);
            }
        }
    };

    const establishmentKeyEndedByThree = async (nodes) => {
        const establishmentKeyEndedByThree = nodes.find((e) =>
            establishmentKeyEndings[3]?.key.includes(
                e?.organization?.establishment?.establishmentKey.charAt(
                    e?.organization?.establishment?.establishmentKey.length - 1
                )
            )
        );

        if (establishmentKeyEndedByThree) {
            const establishmentKeyEndedByTwo = !!nodes.find((e) =>
                establishmentKeyEndings[2]?.key.includes(
                    e?.organization?.establishment?.establishmentKey.charAt(
                        e?.organization?.establishment?.establishmentKey.length - 1
                    )
                )
            );

            if (!establishmentKeyEndedByTwo) {
                setFullName((oldArray) => [...oldArray, `${establishmentKeyEndings[2]?.name} `]);
            }
        }
    };

    const establishmentKeyEndedByFour = async (nodes) => {
        const establishmentKeyEndedByFour = nodes.find((e) =>
            establishmentKeyEndings[4]?.key.includes(
                e?.organization?.establishment?.establishmentKey.charAt(
                    e?.organization?.establishment?.establishmentKey.length - 1
                )
            )
        );

        if (establishmentKeyEndedByFour) {
            const establishmentKeyEndedByOne = !!nodes.find((e) =>
                establishmentKeyEndings[1]?.key.includes(
                    e?.organization?.establishment?.establishmentKey.charAt(
                        e?.organization?.establishment?.establishmentKey.length - 1
                    )
                )
            );

            if (!establishmentKeyEndedByOne) {
                setFullName((oldArray) => [...oldArray, `${establishmentKeyEndings[1]?.name}`]);
            }
        }
    };

    return (
        <>
            <div>
                {fullName?.map((e) => (
                    <div key={e}>
                        <div className="d-flex ps-10 mb-n1">
                            <div className="d-flex align-items-center">
                                <span className="bullet me-3  menu-state-bullet-primary" />
                                <span
                                    className="btn btn-link  fw-semibold fs-6 text-primary"
                                    onClick={() => toggleIsConfirm(e)}>
                                    {e}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="separator separator-dashed mt-5" />
                <Confirm
                    isShow={isConfirm}
                    toggleIsShow={toggleIsConfirm}
                    title={`Déclaration ${title}`}
                    size="lg">
                    <DTRow />
                </Confirm>
            </div>
        </>
    );
};

export default EstablishmentItem;
