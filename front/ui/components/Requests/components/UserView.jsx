import clsx from 'clsx';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import NumberFormat from 'react-number-format';

import useData from '../../../../../hooks/use-data';
import Access from './Access';
import Function from './Function';
import GlobalInformation from './GlobalInformation';
import History from './History';
import SubscriptionFees from './SubscriptionFees';
const tabs = [
    {
        label: 'Informations Générales',
        component: GlobalInformation
    },
    {
        label: 'Fonctions',
        component: Function
    },
    {
        label: 'Historiques',
        component: History
    },
    {
        label: 'Cotisations',
        component: SubscriptionFees
    },
    {
        label: "Compte d'accés",
        component: Access
    }
];

const UserView = () => {
    const { data } = useData();
    const [currentTab, setCurrentTab] = useState(tabs[0].label);
    const handleSelectedTab = (tab) => (e) => {
        e.preventDefault();
        setCurrentTab(tab);
    };
    const { component: Component } = tabs.find((e) => e.label === currentTab) || {};
    const { firstName, lastName } = data;
    const shortName = `${firstName[0]}${lastName[0]}`;
    const currentFunction = data?.functions[data?.functions?.length - 1];

    const { email, phoneNumber, addressLine1, zipCode, city, fax, website } =
        data?.coordinates[0] || {};
    return (
        <>
            <div className="d-flex flex-wrap flex-sm-nowrap">
                <div className="me-7 mb-4">
                    <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                        <div className="symbol-label display-1 bg-light-danger text-danger text-uppercase">
                            {data?.lastName !== '' ? (
                                <div className="symbol-label display-1 bg-light-danger text-danger text-uppercase">
                                    {shortName}
                                </div>
                            ) : (
                                <div className="symbol-label display-1 bg-light-danger text-danger text-uppercase">
                                    {data?.firstName[0]?.toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center mb-2">
                                <a
                                    href="#"
                                    className="text-gray-900 text-hover-primary fs-2 fw-bolder me-1">
                                    {data?.civility.abbreviation} {firstName} {lastName}
                                </a>
                            </div>

                            <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                                {currentFunction?.functionLabel?.length ? (
                                    <a
                                        href="#"
                                        className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                        <span className="svg-icon svg-icon-4 me-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none">
                                                <path
                                                    opacity="0.3"
                                                    d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>

                                        {currentFunction?.functionLabel?.singularMaleName}
                                    </a>
                                ) : null}

                                {email?.length ? (
                                    <a
                                        target="_blank"
                                        hrel="noreferrer"
                                        rel="noreferrer"
                                        href={`mailTo:${email}`}
                                        className="d-flex align-items-center text-gray-400 text-hover-primary mb-2">
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
                                        {email}
                                    </a>
                                ) : null}
                            </div>
                            <div className="mb-4 d-flex flex-column">
                                <label className=" fw-bold">
                                    Date de naissance :
                                    <span className="fw-bold fs-6 text-gray-600">
                                        {' '}
                                        {data?.dob ? moment(data?.dob).format('DD/MM/YYYY') : '-'}
                                    </span>
                                </label>
                                <label className=" fw-bold">
                                    Téléphone :
                                    <span className="fw-bold fs-6 text-gray-600">
                                        <NumberFormat
                                            displayType="text"
                                            format="## ## ## ## ##"
                                            value={phoneNumber ? phoneNumber : '-'}
                                        />
                                    </span>
                                </label>
                                <label className=" fw-bold">
                                    Adresse :{' '}
                                    <span className="fw-bold fs-6 text-gray-600">
                                        {addressLine1} {zipCode} {city}
                                    </span>
                                </label>
                                <label className=" fw-bold">
                                    Fax :{' '}
                                    <span className="fw-bold fs-6 text-gray-600">
                                        {fax?.length ? fax : '-'}
                                    </span>
                                </label>
                                <label className=" fw-bold">
                                    Site internet :{' '}
                                    <span className="fw-bold fs-6 text-gray-600">
                                        {website?.length ? website : '-'}
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="d-flex my-4">
                            <Link href={`/personnes/modifier/${data.id}`}>
                                <a
                                    href="#"
                                    className="btn btn-sm btn-primary me-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#kt_modal_offer_a_deal">
                                    <i className="fa fa-edit"></i>
                                    Modifier
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="d-flex flex-wrap flex-stack">
                        <div className="d-flex flex-column flex-grow-1 pe-8">
                            <div className="d-flex flex-wrap">
                                <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                    <div className="d-flex align-items-center">
                                        <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none">
                                                <path
                                                    d="M20 14H18V10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14ZM21 19V17C21 16.4 20.6 16 20 16H18V20H20C20.6 20 21 19.6 21 19ZM21 7V5C21 4.4 20.6 4 20 4H18V8H20C20.6 8 21 7.6 21 7Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    opacity="0.3"
                                                    d="M17 22H3C2.4 22 2 21.6 2 21V3C2 2.4 2.4 2 3 2H17C17.6 2 18 2.4 18 3V21C18 21.6 17.6 22 17 22ZM10 7C8.9 7 8 7.9 8 9C8 10.1 8.9 11 10 11C11.1 11 12 10.1 12 9C12 7.9 11.1 7 10 7ZM13.3 16C14 16 14.5 15.3 14.3 14.7C13.7 13.2 12 12 10.1 12C8.10001 12 6.49999 13.1 5.89999 14.7C5.59999 15.3 6.19999 16 7.39999 16H13.3Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>

                                        <div className="fs-3 fw-bolder counted">
                                            {moment(data?.createdAt).format('DD/MM/YYYY')}
                                        </div>
                                    </div>

                                    <div className="fw-bold fs-6 text-gray-400">
                                        Membre depuis le
                                    </div>
                                </div>

                                {data?.relationship?.length ? (
                                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                        <div className="d-flex align-items-center">
                                            <span className="svg-icon svg-icon-3 svg-icon-danger me-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none">
                                                    <path
                                                        d="M16.0173 9H15.3945C14.2833 9 13.263 9.61425 12.7431 10.5963L12.154 11.7091C12.0645 11.8781 12.1072 12.0868 12.2559 12.2071L12.6402 12.5183C13.2631 13.0225 13.7556 13.6691 14.0764 14.4035L14.2321 14.7601C14.2957 14.9058 14.4396 15 14.5987 15H18.6747C19.7297 15 20.4057 13.8774 19.912 12.945L18.6686 10.5963C18.1487 9.61425 17.1285 9 16.0173 9Z"
                                                        fill="currentColor"
                                                    />
                                                    <rect
                                                        opacity="0.3"
                                                        x={14}
                                                        y={4}
                                                        width={4}
                                                        height={4}
                                                        rx={2}
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M4.65486 14.8559C5.40389 13.1224 7.11161 12 9 12C10.8884 12 12.5961 13.1224 13.3451 14.8559L14.793 18.2067C15.3636 19.5271 14.3955 21 12.9571 21H5.04292C3.60453 21 2.63644 19.5271 3.20698 18.2067L4.65486 14.8559Z"
                                                        fill="currentColor"
                                                    />
                                                    <rect
                                                        opacity="0.3"
                                                        x={6}
                                                        y={5}
                                                        width={6}
                                                        height={6}
                                                        rx={3}
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </span>

                                            <div className="fs-3 fw-bolder counted text-capitalize">
                                                {data?.relationship}
                                            </div>
                                        </div>

                                        <div className="fw-bold fs-6 text-gray-400">
                                            Relation UNETP
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x fs-5 fw-bolder mt-5 mb-10">
                {tabs.map((e) => (
                    <li className="nav-item" key={e.label}>
                        <a
                            href="#"
                            className={clsx('nav-link nav-link text-active-primary', {
                                active: currentTab === e.label
                            })}
                            onClick={handleSelectedTab(e.label)}>
                            {e.label}
                        </a>
                    </li>
                ))}
            </ul>
            <Component data={data} />
        </>
    );
};

export default UserView;
