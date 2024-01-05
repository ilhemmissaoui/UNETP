import { Op } from 'sequelize';

import { amountCalculator } from '../lib/helpers';
import models from '../models';
import IOHistory from '../models/IOHistory';

const {
    Establishment,
    Function,
    Organization,
    OrganizationHasOrganization,
    OrganizationHasGuardianship,
    OrganizationHasPensions,
    OrganizationHasEstablishmentLabel,
    OrganizationHasCountryPairing,
    OrganizationHasCountryPartner,
    History,
    CapacityHistory,
    Coordinate,
    User,
    SubscriptionFee,
    Academy,
    SubscriptionParams,
    EstablishmentHasDiploma,
    Diploma,
    Guardianship,
    HistoryType,
    Country,
    Department,
    Pension,
    EstablishmentLabel,
    Civility
} = models;
// Establishment.findOne({ where: { id: 1 }, include: IOHistory }).then(console.log);
const updateOgecInfo = async ({ payload, transaction }) => {
    const { ogecName, ogecAddress, ogecPhoneNumber, ogecCity, ogecEmail, establishmentId } =
        payload;
    await Establishment.update(
        {
            ogecName,
            ogecAddress,
            ogecPhoneNumber,
            ogecCity,
            ogecEmail
        },
        { where: { id: establishmentId }, transaction }
    );
};
const create = async ({ payload, transaction }) => {
    const {
        ogecName,
        ogecAddress,
        ogecPhoneNumber,
        ogecCity,
        ogecEmail,
        capacityHistories,
        academyId,
        accessDate,
        childEstablishments,
        comments,
        coordinates,
        delegationId,
        departmentId,
        establishmentKey,
        organization,
        establishmentNumber,
        histories,
        labels,
        members,
        guardianships,
        numAcadCFA,
        numExistanceCFP,
        numAcadLP,
        numAcadLT,
        parings,
        partners,
        pensions,
        privateComment,
        mixed,
        users
    } = payload;
    const now = new Date();

    const nameExist = await Organization.findOne({
        where: { name: { [Op.regexp]: `^*${organization?.name}*` } }
    });
    if (!nameExist) {
        const { id: organizationId } = await Organization.create(
            {
                typeId: 4,
                name: organization?.name,
                createdAt: now,
                isArchived: false,
                isDeleted: false
            },
            { transaction }
        );
        await Establishment.create(
            {
                ogecName,
                ogecAddress,
                ogecPhoneNumber,
                ogecCity,
                ogecEmail,
                organizationId,
                delegationId,
                academyId,
                departmentId,
                delegateId,
                establishmentKey,
                establishmentNumber,
                relationship: members,
                numAcadLP,
                numAcadLT,
                numAcadCFA,
                numExistanceCFP,
                mixed,
                comments,
                privateComment,
                accessDate
            },
            { transaction }
        );
        await Promise.all(
            childEstablishments?.map(async (organizationObj) => {
                const { id, establishmentNumber, establishmentKey, organization } = organizationObj;
                let childOrganizationId = id;
                if (!childOrganizationId) {
                    const { id: _childOrganizationId } = await Organization.create(
                        {
                            typeId: 4,
                            name: organization?.name,
                            isDeleted: false,
                            isArchived: false,
                            createdAt: now
                        },
                        { transaction }
                    );
                    childOrganizationId = _childOrganizationId;
                    await Establishment.create(
                        {
                            organizationId: childOrganizationId,
                            establishmentKey,
                            establishmentNumber
                        },
                        { transaction }
                    );
                }
                await OrganizationHasOrganization.create(
                    {
                        as: 'childrenOrganizations',
                        parentOrganizationId: organizationId,
                        childOrganizationId: childOrganizationId
                    },
                    { transaction }
                );
            })
        );
        await Promise.all(
            guardianships?.map(async (guardianshipId) => {
                await OrganizationHasGuardianship.create(
                    {
                        organizationId,
                        guardianshipId
                    },
                    { transaction }
                );
            })
        );
        await Promise.all(
            pensions?.map(async (pensionId) => {
                await OrganizationHasPensions.create(
                    {
                        organizationId,
                        pensionId
                    },
                    { transaction }
                );
            })
        );
        await Promise.all(
            labels?.map(async (labelId) => {
                await OrganizationHasEstablishmentLabel.create(
                    {
                        organizationId,
                        labelId
                    },
                    { transaction }
                );
            })
        );
        await Promise.all(
            parings?.map(async (countryId) => {
                await OrganizationHasCountryPairing.create(
                    {
                        organizationId,
                        countryId
                    },
                    { transaction }
                );
            })
        );
        await Promise.all(
            partners?.map(async (countryPartnerId) => {
                await OrganizationHasCountryPartner.create(
                    {
                        organizationId,
                        countryPartnerId
                    },
                    { transaction }
                );
            })
        );
        await Promise.all(
            histories?.map(async ({ comment, startDate, endDate, historyIdType, label, date }) => {
                await History.create(
                    {
                        historyIdType,
                        organizationId,
                        label,
                        date,
                        comment,
                        startDate,
                        endDate,
                        createdAt: now
                    },
                    { transaction }
                );
            })
        );
        Promise.all(
            capacityHistories?.map(async ({ year }) => {
                await CapacityHistory.create({
                    organizationId,
                    year
                });
            })
        );
        await Promise.all(
            coordinates?.map(async (v) => {
                await Coordinate.create(
                    {
                        ...v,
                        organizationId,
                        isDefault: false,
                        createdAt: now
                    },
                    { transaction }
                );
            })
        );

        let delegateId = undefined;
        await Promise.all(
            users?.map(async ({ user, comment, endDate, startDate, type, labelId }) => {
                //user already exists
                let userId = user?.id;
                if (!userId) {
                    const { civilityId, firstName, lastName } = user;
                    const { id } = await User.create(
                        {
                            civilityId,
                            lastName,
                            firstName,
                            isOldHeadMaster: false,
                            isDeleted: false,
                            isArchived: false,
                            createdAt: now
                        },
                        { transaction }
                    );
                    userId = id;
                    if (labelId == 116) {
                        delegateId = userId;
                    }
                }
                await Function.upsert(
                    {
                        labelId,
                        organizationId,
                        userId,
                        startDate,
                        endDate,
                        type,
                        comment,
                        createdAt: now
                    },
                    { transaction }
                );
            })
        );
    }
};

const update = async ({ id, payload, transaction }) => {
    const now = new Date();
    const oldEstablishment = await Establishment.findOne({
        where: { id },
        include: [
            { model: Organization, as: 'delegation' },
            {
                model: Academy
            },
            { model: Department },
            IOHistory,
            {
                model: Organization,
                as: 'organization',
                required: false,
                include: [
                    {
                        model: CapacityHistory,
                        required: false,
                        separate: true
                    },
                    {
                        model: EstablishmentHasDiploma,
                        include: Diploma,
                        required: false
                    },
                    {
                        model: Guardianship,
                        required: false
                    },
                    {
                        model: History,
                        required: false,
                        separate: true,
                        include: {
                            model: HistoryType,
                            where: {
                                label: {
                                    [Op.not]: 'e-mailing'
                                }
                            }
                        }
                    },
                    Pension,
                    {
                        model: OrganizationHasEstablishmentLabel,
                        include: [EstablishmentLabel]
                    },
                    Country,
                    {
                        model: Coordinate
                    },
                    {
                        model: Organization,
                        as: 'childrenOrganizations'
                    },
                    {
                        model: OrganizationHasCountryPartner,
                        include: Country
                    },
                    {
                        model: OrganizationHasCountryPairing,
                        include: Country
                    },
                    {
                        model: SubscriptionFee,
                        required: false,
                        separate: true
                    },
                    {
                        model: Function,
                        include: [
                            {
                                model: User,
                                include: Civility
                            }
                        ]
                    }
                ]
            }
        ]
    });
    const { organizationId } = oldEstablishment;
    const {
        establishmentKey,
        establishmentNumber,
        mixed,
        numExistanceCFP,
        numAcadLP,
        numAcadLT,
        numAcadCFA,
        members,
        comments,
        privateComment,
        accessDate,
        academyId,
        delegationId,
        departmentId,
        ogecName,
        ogecAddress,
        ogecPhoneNumber,
        ogecCity,
        ogecEmail,
        organization,
        histories,
        capacityHistories,
        pensions,
        guardianships,
        partners,
        parings,
        labels,
        users,
        childEstablishments,
        coordinates,
        diplomas,
        subscriptionFees
    } = payload;

    //update establishment
    await Establishment.update(
        {
            ogecName,
            ogecAddress,
            ogecPhoneNumber,
            ogecCity,
            ogecEmail,
            organizationId,
            delegationId: delegationId,
            academyId: academyId,
            departmentId: departmentId,
            delegateId: delegationId,
            establishmentKey,
            establishmentNumber,
            relationship: members,
            numAcadLP,
            numAcadLT,
            numAcadCFA,
            numExistanceCFP,
            mixed,
            comments,
            privateComment,
            accessDate
        },
        { where: { id }, transaction }
    );
    //update organization
    await Organization.update(
        {
            name: organization?.name
        },
        { where: { id: organizationId }, transaction }
    );
    //history to remove
    const currentHistories = histories?.reduce((a, c) => a.add(parseInt(c?.id)), new Set());
    const historyDelete = oldEstablishment?.organization?.histories?.filter(
        (v) => !currentHistories.has(v?.id)
    );
    await Promise.all(
        historyDelete?.map(({ id }) => {
            return History.destroy(
                {
                    where: { id }
                },
                { transaction }
            );
        })
    );
    //history to add or update
    await Promise.all(
        histories?.map(
            async ({ comment, startDate, endDate, historyIdType, label, date, userId, id }) => {
                await History.upsert(
                    {
                        id,
                        userId,
                        historyIdType,
                        organizationId,
                        label,
                        date,
                        comment,
                        startDate,
                        endDate,
                        updatedAt: now
                    },
                    { transaction }
                );
            }
        )
    );
    //capacityHistory to remove
    const currentCapcityHistory = capacityHistories?.reduce(
        (a, c) => a.add(parseInt(c?.id)),
        new Set()
    );
    const capcityHistoryDelete = oldEstablishment?.organization?.capacityHistories?.filter(
        (v) => !currentCapcityHistory.has(v?.id)
    );
    await Promise.all(
        capcityHistoryDelete?.map(async ({ id }) => {
            await CapacityHistory.destroy(
                {
                    where: { id }
                },
                { transaction }
            );
        })
    );
    //capacity history to add/update
    await Promise.all(
        capacityHistories?.map(
            async ({
                year,
                id,
                collegeContractStudentsCount,
                lpContractStudentsCount,
                lgtContractStudentsCount,
                btsContractStudentsCount,
                supContractStudentsCount,
                cfaUfaApprenticesCount,
                cfpCfcInternsHoursCount
            }) => {
                await CapacityHistory.upsert(
                    {
                        organizationId,
                        year,
                        id,
                        collegeContractStudentsCount,
                        lpContractStudentsCount,
                        lgtContractStudentsCount,
                        btsContractStudentsCount,
                        supContractStudentsCount,
                        cfaUfaApprenticesCount,
                        cfpCfcInternsHoursCount
                    },
                    { transaction }
                );
            }
        )
    );
    //capacityHistory to remove
    // const currentReAddedAt = reAddedAt?.reduce(
    //     (a, c) => a.add(parseInt(c?.id)),
    //     new Set()
    // );
    // const capcityHistoryDelete = oldEstablishment?.capacityHistories?.filter(
    //     (v) => !currentCapcityHistory.has(v?.id)
    // );
    // await Promise.all(
    //     capcityHistoryDelete?.map(async ({ id }) => {
    //         await CapacityHistory.destroy(
    //             {
    //                 where: { id }
    //             },
    //             { transaction }
    //         );
    //     })
    // );
    // //capacity history to add/update
    // await Promise.all(
    //     capacityHistories?.map(
    //         async ({
    //             year,
    //             id,
    //             collegeContractStudentsCount,
    //             lpContractStudentsCount,
    //             lgtContractStudentsCount,
    //             btsContractStudentsCount,
    //             supContractStudentsCount,
    //             cfaUfaApprenticesCount,
    //             cfpCfcInternsHoursCount
    //         }) => {
    //             await CapacityHistory.upsert(
    //                 {
    //                     organizationId,
    //                     year,
    //                     id,
    //                     collegeContractStudentsCount,
    //                     lpContractStudentsCount,
    //                     lgtContractStudentsCount,
    //                     btsContractStudentsCount,
    //                     supContractStudentsCount,
    //                     cfaUfaApprenticesCount,
    //                     cfpCfcInternsHoursCount
    //                 },
    //                 { transaction }
    //             );
    //         }
    //     )
    // );
    //pension to delete
    const currentPension = pensions?.reduce((a, c) => a.add(parseInt(c)), new Set());
    const pensionDelete =
        oldEstablishment?.organization?.pensions?.filter((v) => !currentPension.has(v?.id)) || [];
    await Promise.all(
        pensionDelete?.map(async ({ id }) => {
            await OrganizationHasPensions.destroy(
                {
                    where: {
                        [Op.and]: {
                            organizationId
                        },
                        [Op.and]: {
                            pensionId: id
                        }
                    }
                },
                { transaction }
            );
        })
    );
    await Promise.all(
        [...currentPension]?.map(async (e) => {
            await OrganizationHasPensions.upsert(
                {
                    organizationId,
                    pensionId: e
                },
                {
                    transaction
                }
            );
        })
    );
    //guadianship to delete
    const currentGuardianship = guardianships?.reduce((a, c) => a.add(parseInt(c)), new Set());
    const guardianshipToDelete =
        oldEstablishment?.organization?.guardianships?.filter(
            (v) => !currentGuardianship.has(v?.id)
        ) || [];
    await Promise.all(
        guardianshipToDelete?.map(async ({ id }) => {
            await OrganizationHasGuardianship.destroy(
                {
                    where: {
                        [Op.and]: {
                            organizationId
                        },
                        [Op.and]: {
                            guardianshipId: id
                        }
                    }
                },
                { transaction }
            );
        })
    );
    //guardianship to add/update
    await Promise.all(
        [...currentGuardianship]?.map(async (e) => {
            await OrganizationHasGuardianship.upsert(
                {
                    organizationId,
                    guardianshipId: e
                },
                {
                    transaction
                }
            );
        })
    );

    //partners to delete
    const currentPartners = partners?.reduce((a, c) => a.add(parseInt(c)), new Set());
    const partnersToDelete =
        oldEstablishment?.organization?.organizationHasCountryPartners?.filter(
            (v) => !currentPartners.has(v?.countryPartnerId)
        ) || [];
    await Promise.all(
        partnersToDelete?.map(async ({ countryPartnerId }) => {
            await OrganizationHasCountryPartner.destroy(
                {
                    where: {
                        [Op.and]: {
                            organizationId
                        },
                        [Op.and]: {
                            countryPartnerId
                        }
                    }
                },
                { transaction }
            );
        })
    );
    //partners to add/update
    await Promise.all(
        [...currentPartners]?.map(async (e) => {
            await OrganizationHasCountryPartner.upsert(
                {
                    organizationId,
                    countryPartnerId: e
                },
                {
                    transaction
                }
            );
        })
    );
    //delete  pairings
    const currentParings = parings?.reduce((a, c) => a.add(parseInt(c)), new Set());
    const paringsToDelete = oldEstablishment?.organization?.organizationHasCountryPairings?.filter(
        (v) => !currentParings.has(v?.countryId)
    );
    await Promise.all(
        paringsToDelete?.map(async ({ countryId }) => {
            await OrganizationHasCountryPairing.destroy(
                {
                    where: {
                        [Op.and]: {
                            organizationId
                        },
                        [Op.and]: {
                            countryId
                        }
                    }
                },
                { transaction }
            );
        })
    );
    //pairings to add/update
    await Promise.all(
        [...currentParings]?.map(async (e) => {
            await OrganizationHasCountryPairing.upsert(
                {
                    organizationId,
                    countryId: e
                },
                {
                    transaction
                }
            );
        })
    );
    //delete  labels
    const currentLabels = labels?.reduce((a, c) => a.add(parseInt(c)), new Set());
    const labelsToDelete =
        oldEstablishment?.organization?.organizationHasEstablishmentLabels?.filter(
            (v) => !currentLabels.has(v?.labelId)
        );
    await Promise.all(
        labelsToDelete?.map(async ({ labelId }) => {
            await OrganizationHasEstablishmentLabel.destroy(
                {
                    where: {
                        [Op.and]: {
                            organizationId
                        },
                        [Op.and]: {
                            labelId
                        }
                    }
                },
                { transaction }
            );
        })
    );
    //labels to add/update
    await Promise.all(
        [...currentLabels]?.map(async (e) => {
            await OrganizationHasEstablishmentLabel.upsert(
                {
                    organizationId,
                    labelId: e
                },
                {
                    transaction
                }
            );
        })
    );
    //update function
    const currentKey = users?.reduce((a, c) => a.add(parseInt(c?.id)), new Set());
    const functionsToDelete = oldEstablishment.organization?.functions?.filter(
        (v) => !currentKey.has(v.id)
    );
    await Promise.all(
        functionsToDelete?.map(async ({ id }) => {
            Function.destroy(
                {
                    where: { id }
                },
                { transaction }
            );
        })
    );
    //function to add or update
    await Promise.all(
        users?.map(async ({ user, ...rest }) => {
            let userId = user?.id;
            //create user if not exist
            if (!userId) {
                const { id: _userId } = await User.create(
                    {
                        ...user,
                        isOldHeadMaster: false,
                        isDeleted: false,
                        isArchived: false,
                        createdAt: now
                    },
                    { transaction }
                );
                userId = _userId;
            }
            await Function.upsert(
                {
                    ...rest,
                    organizationId,
                    userId,
                    createdAt: now
                },
                { transaction }
            );
        })
    );

    //child organisaition to delete
    const currentChildOrganization = childEstablishments?.reduce((a, c) => a.add(c?.id), new Set());
    const childOrganizationToDelete =
        oldEstablishment?.organization?.childrenOrganizations?.filter(
            (v) => !currentChildOrganization.has(v?.id)
        ) || [];
    await Promise.all(
        childOrganizationToDelete?.map(async ({ id }) => {
            await OrganizationHasOrganization.destroy(
                {
                    where: {
                        [Op.and]: {
                            parentOrganizationId: organizationId
                        },
                        [Op.and]: {
                            childOrganizationId: id
                        }
                    }
                },
                { transaction }
            );
        })
    );
    //childEstablishments to add /update
    await Promise.all(
        childEstablishments?.map(async ({ id, organization, ...r }) => {
            let childOrganizationId = id;
            //create establishement
            if (!childOrganizationId) {
                const _childOrganizationId = await Organization.create(
                    {
                        name: organization?.name,
                        typeId: 4,
                        isDeleted: false,
                        isArchived: false,
                        createdAt: now
                    },
                    { transaction }
                );
                await Establishment.create(
                    {
                        ...r,
                        organizationId: _childOrganizationId?.id
                    },
                    { transaction }
                );
                childOrganizationId = _childOrganizationId?.id;
            }
            await OrganizationHasOrganization.upsert(
                {
                    parentOrganizationId: organizationId,
                    childOrganizationId
                },
                { transaction }
            );
        })
    );
    //coordinates to remove
    const currentCoordinate = coordinates?.reduce((a, c) => a.add(parseInt(c?.id)), new Set());
    const coordinatesToDelete = oldEstablishment.organization?.coordinates?.filter(
        (v) => !currentCoordinate.has(v.id)
    );
    await Promise.all(
        coordinatesToDelete?.map(async ({ id }) => {
            Coordinate.destroy(
                {
                    where: { id }
                },
                { transaction }
            );
        })
    );
    //coordiante to add or update
    await Promise.all(
        coordinates?.map(async ({ id: coordinateId, ...inf }) => {
            await Coordinate.upsert(
                {
                    id: coordinateId,
                    organizationId,
                    ...inf,
                    isDefault: false,
                    createdAt: now
                },
                { transaction }
            );
        })
    );
    //diplomas to delete
    const currentDiplomas = diplomas?.reduce((a, c) => a.add(parseInt(c?.diplomaId)), new Set());
    const diplomasToDelete =
        oldEstablishment?.organization?.diplomas?.filter(
            (v) => !currentDiplomas.has(v?.diplomaId)
        ) || [];
    await Promise.all(
        diplomasToDelete?.map(async ({ diplomaId }) => {
            await EstablishmentHasDiploma.destroy(
                {
                    where: {
                        [Op.and]: {
                            id: diplomaId
                        },
                        [Op.and]: {
                            establishmentId: organizationId
                        }
                    }
                },
                { transaction }
            );
        })
    );
    //diploma to add /update
    await Promise.all(
        diplomas?.map(async ({ id, diplomaId, complement }) => {
            await EstablishmentHasDiploma.upsert(
                {
                    id,
                    diplomaId,
                    establishmentId: organizationId,
                    complement
                },
                { transaction }
            );
        })
    );

    // subscription-fees to add
    const feesToadd = subscriptionFees.filter((e) => !e?.id);
    await Promise.all(
        feesToadd?.map(async ({ year }) => {
            const subscriptionParam = await SubscriptionParams.findOne(
                {
                    where: {
                        year
                    }
                },
                { transaction }
            );
            const capacityHistory = await CapacityHistory.findOne(
                {
                    where: {
                        [Op.and]: {
                            year,
                            organizationId
                        }
                    }
                },
                { transaction }
            );
            if (subscriptionParam) {
                await SubscriptionFee.create(
                    {
                        year,
                        organizationId,
                        reminderCount: 0,
                        status: 'Solde initial',
                        subscriptionFeeParamsId: subscriptionParam?.id,
                        calculatedAmount: amountCalculator(
                            capacityHistory || {},
                            subscriptionParam,
                            establishmentKey
                        )
                    },
                    { transaction }
                );
            }
        })
    );
};

export default { create, update, updateOgecInfo };
