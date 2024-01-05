/* eslint-disable no-undef */
import express from 'express';

import sequelize from '../../db';
import auth from '../../middlewares/auth';
import models from '../../models/index';
import queryCollection, { extractParamsFromRequest } from '../../utils/queryCollection';
const route = express.Router();
import { Op } from 'sequelize';

import Coordinate from '../../models/Coordinate';
import Department from '../../models/Department';
import Establishment from '../../models/Establishment';
import History from '../../models/History';
import Organization from '../../models/Organization';
import User from '../../models/User';
const { Request } = models;
//listing requests
route.get('/requests', async (req, res) => {
    try {
        const params = extractParamsFromRequest(req);
        const { search } = params;
        const users = await sequelize.query(
            `SELECT * FROM personne WHERE MATCH(nom,prenom) AGAINST('${search}' IN NATURAL LANGUAGE MODE)`
        );
        const orgs = await sequelize.query(
            `SELECT * FROM etablissement join unitorg on etablissement.id_unitorg = unitorg.id_unitorg WHERE MATCH(nom) AGAINST('${search}' IN NATURAL LANGUAGE MODE)`
        );
        const establishmentsIds = orgs?.filter((e) => e?.length).map((e) => e[0].id_etablissement);
        const usersIds = users?.filter((e) => e?.length).map((e) => e[0].id_personne);
        let { nodes, pageInfo } = await queryCollection({
            collection: Request,
            sortableFields: ['id', 'createdAt'],
            searchableFields: [],
            filterOptions: Request.filterOptions,
            internalFields: Request.internalFields,
            params,
            baseQuery:
                params?.filters?.status?.length && search?.length
                    ? {
                          [Op.or]: {
                              establishmentId: {
                                  [Op.in]: establishmentsIds
                              },
                              userId: {
                                  [Op.in]: usersIds
                              }
                          }
                      }
                    : undefined,
            include: [
                {
                    model: User
                }
            ]
        });
        nodes = await Promise.all(
            nodes.map(async (e) => {
                const obj = e?.get();
                //temp fetch only establishement
                obj.object = await Establishment.findOne({
                    where: { id: e.objectId },
                    include: [
                        { model: Department },
                        { model: Organization, as: 'organization', include: Coordinate }
                    ]
                });
                return obj;
            })
        );
        res.json({ nodes, pageInfo });
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});
//listing request by id
route.get(
    `/request/:id`,
    // auth(),
    async (req, res) => {
        let { id } = req?.params || {};
        const request = await Request.findOne({ where: { id: id } });
        if (!request) {
            res.status(404).json({ message: 'request not found' });
        } else {
            const establishment = await Establishment.findOne({
                where: { id: request.objectId },
                include: [
                    { model: Department },
                    { model: Organization, as: 'organization', include: Coordinate }
                ]
            });
            const finalRequest = request?.get();
            finalRequest.establishment = establishment;
            res.status(200).json(finalRequest);
        }
    }
);
// approve change request
route.post('/approve/:id', auth(), async (req, res) => {
    const { id } = req.params;
    const { organizationId } = req.body;
    const now = new Date();
    const transaction = await sequelize.transaction();
    let { json, objectId, userId } = await Request.findOne({
        where: { id }
    });
    json = JSON.parse(json);
    try {
        const data = await User.findOne({
            where: {
                id: userId
            }
        });
        const fullName = `${data?.firstName} ${data?.lastName}`;

        await Establishment.update(json, { where: { id: objectId }, transaction });
        await History.create(
            {
                historyIdType: 3,
                organizationId: organizationId,
                userId: req?.user?.profile?.id,
                label: `modération (modification - ${fullName})`,
                date: now,
                createdAt: now
            },
            { transaction }
        );

        await Request.destroy({ where: { id } }, { transaction });
        await transaction.commit();
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).end();
    }
    res.end();
});
route.post('/apply/:id', auth(), async (req, res) => {
    const { id } = req.params;
    const { acceptedFields, organizationId } = req.body;
    const now = new Date();

    const transaction = await sequelize.transaction();
    let { json, objectId, userId } = await Request.findOne({
        where: { id }
    });
    json = JSON.parse(json);
    const finalObject = {};
    acceptedFields?.forEach((field) => {
        finalObject[field] = json[field];
    });
    try {
        const data = await User.findOne({
            where: {
                id: userId
            }
        });
        const fullName = `${data?.firstName} ${data?.lastName}`;
        await Establishment.update(finalObject, { where: { id: objectId }, transaction });
        await History.create(
            {
                historyIdType: 3,
                organizationId: organizationId,
                userId: req?.user?.profile?.id,
                label: `modération (modification - ${fullName})`,
                date: now,
                createdAt: now
            },
            { transaction }
        );
        await Request.destroy({ where: { id } }, { transaction });
        await transaction.commit();
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).end();
    }
    res.end();
});
route.post('/decline/:id', async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();
    try {
        const { status } = await Request.findOne({
            where: { id }
        });
        if (status != 'pending') {
            res.status(404).json({ message: 'La demande a déjà été traitée' });
        } else {
            await Request.update(
                {
                    status: 'refused'
                },
                {
                    where: { id: id },
                    transaction
                }
            );
            await transaction.commit();
            res.status(200).json({ ok: true, status: 'refused' });
        }
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).end();
    }
});
// approve by field
route.post('/approve-field/:id', auth(), async (req, res) => {
    const id = req.params.id;
    //approved field
    const { field } = req?.body || {};
    const transaction = await sequelize.transaction();
    try {
        const { json, objectId } = await Request.findOne({
            where: { id }
        });
        const parsedInfo = JSON.parse(json);
        await Establishment.update(
            {
                [field]: parsedInfo[field]
            },
            { where: { id: objectId }, transaction }
        );
        delete parsedInfo[field];
        Object.entries(parsedInfo).map(async (e) => {
            if (e.length == 1) {
                await Request.update(
                    {
                        status: 'approved',
                        json: JSON.stringify(parsedInfo)
                    },
                    {
                        where: { id: id },
                        transaction
                    }
                );
            } else {
                await Request.update(
                    {
                        status: 'partiel',
                        json: JSON.stringify(parsedInfo)
                    },
                    {
                        where: { id: id },
                        transaction
                    }
                );
            }
        });
        await transaction.commit();
        res.status(200).json({ ok: true });
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).end();
    }
});
// decline by field
route.post('/decline-field/:id', auth(), async (req, res) => {
    const id = req.params.id;
    //declined field
    const { field } = req?.body || {};
    try {
        const transaction = await sequelize.transaction();
        const { json } = await Request.findOne({
            where: { id }
        });
        const parsedInfo = JSON.parse(json);
        delete parsedInfo[field];
        Object.entries(parsedInfo).map(async (e) => {
            if (e.length == 1) {
                await Request.update(
                    {
                        status: 'refused',
                        json: JSON.stringify(parsedInfo)
                    },
                    {
                        where: { id: id },
                        transaction
                    }
                );
            } else {
                await Request.update(
                    {
                        status: 'partiel',
                        json: JSON.stringify(parsedInfo)
                    },
                    {
                        where: { id: id },
                        transaction
                    }
                );
            }
        });
        await transaction.commit();
        res.status(200).json({ ok: true });
    } catch (e) {
        console.log(e);
        await transaction.rollback();
        res.status(500).end();
    }
});
export default route;
