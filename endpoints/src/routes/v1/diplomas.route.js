import express from 'express';
import { Op } from 'sequelize';

import auth from '../../middlewares/auth';
import Coordinate from '../../models/Coordinate';
import Department from '../../models/Department';
import models from '../../models/index';
import Organization from '../../models/Organization';
import diplomasSchema from '../../schemas/diplomas';
import generateCRUD from '../../utils/generateCRUD';

const {
    Diploma,
    DiplomaType,
    DiplomaDomain,
    DiplomaFunction,
    DiplomaGrade,
    DiplomaGroup,
    DiplomaSpecialty,
    DiplomaSubGroup,
    EstablishmentHasDiploma,
    Establishment
} = models;

const sortMap = {
    '': {
        models: [],
        field: ''
    }
};

export const checkIsRefrenceAvailable = async (reference, id) => {
    const data = await Diploma.findOne({
        where: {
            reference
        }
    });
    return data && id ? data.id == id : !data;
};
const route = express.Router();
route.get('/is-available/:refrence', auth(), async (req, res) => {
    const reference = req.params.refrence;
    const { exclude } = req.query;
    try {
        res.json({ isAvailable: await checkIsRefrenceAvailable(reference, exclude) });
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});
generateCRUD(route, Diploma, 'diploma', 'diplomas', diplomasSchema, {
    createFunction: async (item, transaction) => {
        const { reference } = item;
        const { domainId, functionId, gradeId, groupId, specialtyId, subGroupId, typeId } =
            reference;
        const { id: diplomaTypeId } = await DiplomaType.findOne({ where: { code: typeId } });
        const { id: diplomaGroupId } = await DiplomaGroup.findOne({ where: { code: groupId } });
        const { id: diplomaSubGroupId } = await DiplomaSubGroup.findOne(
            {
                where: { code: subGroupId }
            },
            { transaction }
        );
        const { id: diplomaFunctionId } = await DiplomaFunction.findOne(
            {
                where: { code: functionId }
            },
            { transaction }
        );
        const { id: diplomaDomainId } = await DiplomaDomain.findOne({ where: { code: domainId } });
        const { id: diplomaGradeId, label: gradeLabel } = await DiplomaGrade.findOne(
            {
                where: { code: gradeId }
            },
            { transaction }
        );

        const { id: diplomaSpecialtyId, label: specialtyLabel } = await DiplomaSpecialty.findOne(
            {
                where: { code: specialtyId }
            },
            { transaction }
        );

        await Diploma.create(
            {
                name: `${gradeLabel} ${specialtyLabel}`,
                diplomaTypeId,
                diplomaGroupId,
                diplomaSubGroupId,
                diplomaDomainId,
                diplomaGradeId,
                diplomaSpecialtyId,
                diplomaFunctionId,
                reference: gradeId + subGroupId + functionId + specialtyId + typeId
            },
            { transaction }
        );
    },
    updateFunction: async (id, item, transaction) => {
        const { reference } = item;
        const { domainId, functionId, gradeId, groupId, specialtyId, subGroupId, typeId } =
            reference;
        const { id: diplomaTypeId } = await DiplomaType.findOne({ where: { code: typeId } });
        const { id: diplomaGroupId } = await DiplomaGroup.findOne({ where: { code: groupId } });
        const { id: diplomaSubGroupId } = await DiplomaSubGroup.findOne({
            where: { code: subGroupId }
        });
        const { id: diplomaGradeId, label: gradeLabel } = await DiplomaGrade.findOne({
            where: { code: gradeId }
        });
        const { id: diplomaFunctionId } = await DiplomaFunction.findOne({
            where: { code: functionId }
        });
        const { id: diplomaDomainId } = await DiplomaDomain.findOne({ where: { code: domainId } });
        const { id: diplomaSpecialtyId, label: specialtyLabel } = await DiplomaSpecialty.findOne({
            where: { code: specialtyId }
        });

        await Diploma.update(
            {
                name: `${gradeLabel} ${specialtyLabel}`,
                diplomaTypeId,
                diplomaGroupId,
                diplomaSubGroupId,
                diplomaDomainId,
                diplomaGradeId,
                diplomaSpecialtyId,
                diplomaFunctionId,
                reference: gradeId + subGroupId + functionId + specialtyId + typeId
            },
            { where: { id }, transaction }
        );
    },
    queryCollection: {
        searchableFields: ['name'],
        filterOptions: Diploma.filterOptions,
        sortableFields: [
            'id',
            'name',
            'reference',
            'diplomaGradeId',
            'diplomaSpecialtyId',
            'diplomaDomainId',
            'diplomaGroupId',
            'diplomaSubGroupId',
            'diplomaTypeId'
        ],
        baseQuery: (req, filters) => {
            console.log(filters);
            return filters?.name
                ? {
                      name: {
                          [Op.like]: `%${filters?.name}%`
                      }
                  }
                : undefined;
        },
        include: (_, filters) => {
            return [
                DiplomaType,
                DiplomaDomain,
                {
                    model: DiplomaGrade,

                    where: filters?.diplomaGradeId
                        ? {
                              id: filters?.diplomaGradeId
                          }
                        : undefined
                },
                {
                    model: DiplomaGroup,
                    where: filters?.diplomaGroupId
                        ? {
                              id: filters?.diplomaGroupId
                          }
                        : undefined
                },
                {
                    model: DiplomaSpecialty,
                    where: filters?.diplomaSpecialtyId
                        ? {
                              id: filters?.diplomaSpecialtyId
                          }
                        : undefined
                },
                DiplomaSubGroup,
                DiplomaFunction
            ];
        },
        filterTransformation: (filters) => {
            delete filters?.diplomaGradeId;
            delete filters?.diplomaSpecialtyId;
            delete filters?.diplomaGroupId;
            delete filters?.name;

            return filters;
        },
        sortByTransformation: (sort) => {
            return sortMap[sort] || sort;
        }
    },
    guards: {
        list: auth({ action: 'list', subject: 'diploma' }),
        view: auth({ action: 'view', subject: 'diploma' }),
        create: auth({ action: 'create', subject: 'diploma' }),
        write: auth({ action: 'write', subject: 'diploma' }),
        delete: auth({ action: 'delete', subject: 'diploma' })
    },
    options: {
        viewInclude: [
            DiplomaType,
            DiplomaDomain,
            DiplomaFunction,
            DiplomaGrade,
            DiplomaGroup,
            DiplomaSpecialty,
            DiplomaSubGroup,
            {
                model: EstablishmentHasDiploma,
                include: {
                    model: Organization,
                    include: [
                        {
                            model: Establishment,
                            as: 'establishment',
                            include: { model: Department }
                        },
                        {
                            model: Coordinate
                        }
                    ]
                }
            }
        ]
    }
});

export default route;
