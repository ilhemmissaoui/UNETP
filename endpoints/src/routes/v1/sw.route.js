import express from 'express';
import { Op } from 'sequelize';

import models from '../../models/index';
import queryCollection, { extractParamsFromRequest } from '../../utils/queryCollection';

const {
    DiplomaGrade,
    DiplomaSpecialty,
    Coordinate,
    Country,
    Department,
    Diploma,
    DiplomaType,
    Establishment,
    EstablishmentHasDiploma,
    Organization,
    OrganizationHasCountryPairing,
    OrganizationHasPensions,
    Pension
} = models;
const route = express.Router();

route.get('/level', async (req, res) => {
    try {
        const data = await DiplomaGrade.findAll({ attributes: ['id', 'label'] });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).end();
    }
});
route.get('/specialty', async (req, res) => {
    try {
        const data = await DiplomaSpecialty.findAll({ attributes: ['id', 'label'] });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).end();
    }
});
route.get('/establishments/search', async (req, res) => {
    const params = extractParamsFromRequest(req);
    const { filters } = params;
    try {
        const data = await queryCollection({
            collection: Establishment,
            params: extractParamsFromRequest(req),
            baseQuery: filters.mixityId
                ? {
                      mixed: {
                          [Op.like]: `%${filters.mixityId || ''}%`
                      }
                  }
                : undefined,
            include: [
                {
                    model: Organization,
                    attributes: ['name'],
                    where: filters?.name
                        ? {
                              [Op.and]: {
                                  name: {
                                      [Op.like]: `%${filters?.name}%`
                                  }
                              }
                          }
                        : undefined,
                    as: 'organization',
                    include: [
                        {
                            model: EstablishmentHasDiploma,
                            include: {
                                model: Diploma,
                                where: {
                                    [Op.and]: {
                                        diplomaTypeId: {
                                            [Op.like]: `%${filters?.eduType || ''}%`
                                        },
                                        diplomaGradeId: {
                                            [Op.like]: `%${filters?.levelId || ''}%`
                                        },
                                        diplomaSpecialtyId: {
                                            [Op.like]: `%${filters?.specialityId || ''}%`
                                        }
                                    }
                                }
                            }
                        },
                        {
                            model: OrganizationHasPensions,
                            include: {
                                model: Pension,
                                where: filters?.pensionId
                                    ? {
                                          [Op.and]: {
                                              id: {
                                                  [Op.like]: `%${filters?.pensionId}%`
                                              }
                                          }
                                      }
                                    : undefined
                            }
                        },
                        {
                            model: OrganizationHasCountryPairing,
                            include: {
                                model: Country,
                                where: filters?.twinId
                                    ? {
                                          [Op.and]: {
                                              id: {
                                                  [Op.eq]: `${filters?.twinId}`
                                              }
                                          }
                                      }
                                    : undefined
                            }
                        },
                        {
                            model: Coordinate,
                            where: {
                                label: {
                                    [Op.ne]: 'Email nouvelles'
                                }
                            }
                        }
                    ]
                },
                {
                    model: Department,
                    where: filters?.department
                        ? {
                              [Op.and]: {
                                  departmentCode: {
                                      [Op.like]: `%${filters?.department}%`
                                  }
                              }
                          }
                        : undefined
                }
            ],
            filterTransformation: (filters) => {
                delete filters?.name;
                delete filters?.department;
                delete filters?.levelId;
                delete filters?.specialityId;
                delete filters?.mixityId;
                delete filters?.eduType;
                delete filters?.twinId;
                delete filters?.pensionId;
                return filters;
            }
        });

        res.status(200).json(data);
    } catch (e) {
        res.status(500).end();
    }
});

route.get('/pension', async (req, res) => {
    try {
        const data = await Pension.findAll();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).end();
    }
});

route.get('/country-pairing', async (req, res) => {
    try {
        const data = await Country.findAll({
            attributes: ['id', 'label']
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).end();
    }
});

route.get('/mixity', async (req, res) => {
    const mixedTypes = ['mixte', 'fille', 'garçon', 'ne'];
    try {
        res.status(200).json(mixedTypes);
    } catch (e) {
        res.status(500).end();
    }
});

route.get('/diplome-type', async (req, res) => {
    try {
        const data = await DiplomaType.findAll({
            attributes: ['id', 'label']
        });
        res.status(200).json(data);
    } catch (e) {
        res.status(500).end();
    }
});

route.get('/department', async (req, res) => {
    try {
        const data = await Department.findAll();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).end();
    }
});
route.get('/establishments/:id', async (req, res) => {
    const { organization, establishmentNumber } = await Establishment.findOne({
        where: { id: req?.params.id },
        include: [
            {
                model: Organization,
                as: 'organization',
                include: {
                    model: Coordinate,
                    include: Country,
                    where: {
                        label: {
                            [Op.ne]: 'Email nouvelles'
                        }
                    }
                }
            },
            Department
        ]
    });
    const coordinate = organization?.coordinates[0];
    const establishment = {
        name: organization?.name,
        number: establishmentNumber,
        coordinates: {
            phoneNumber: coordinate?.phoneNumber,
            email: coordinate?.email,
            website: coordinate?.website,
            address: {
                address: coordinate?.addressLine1,
                city: coordinate?.city,
                zipCode: coordinate?.zipCode,
                country: coordinate?.country?.label
            }
        },
        apprenticesCount: 35,
        headMaster: 'M. Eric MAUDUIT',
        manager: 'Mme Sophie LEFEBVRE',
        diplomas: ['BTS Professions immobilières', 'BTS Management commercial opérationnel']
    };
    res.status(200).json(establishment);
});
export default route;
