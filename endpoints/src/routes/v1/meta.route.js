import express from 'express';

import Meta from '../../models/Meta';
const router = express.Router();
import ExcelJS from 'exceljs';
import { Op } from 'sequelize';

import config from '../../config/secrets';
import sequelize from '../../db';
import queues from '../../lib/queues';
import auth from '../../middlewares/auth';
import Coordinate from '../../models/Coordinate';
import Organization from '../../models/Organization';
import SubscriptionFee from '../../models/SubscriptionFee';
import SubscriptionParams from '../../models/SubscriptionParams';
import queryCollection, { extractParamsFromRequest } from '../../utils/queryCollection';
import { getCurrentYear } from '../../utils/time';
import contentSchema from '../../validations/reminder.validation';
import { getUnpaidEstablishmentInfo } from './subscriptionFees.route';
router.get('/reminder', auth(), async (req, res) => {
    try {
        const keys = {
            relance_cotisation_de: 'from',
            relance_cotisation_de_libelle: 'label',
            relance_cotisation_logs: 'logs',
            relance_cotisation_modele: 'model',
            relance_cotisation_partiel_modele: 'partialModel',
            relance_cotisation_sujet: 'subject'
        };
        const meta = await Meta.findAll();
        res.json(Object.fromEntries(meta.map((e) => [keys[e.name], e.value])));
    } catch (e) {
        res.status(500).end();
    }
});

router.post('/email-template', async (req, res) => {
    const t = await sequelize.transaction();
    try {
        contentSchema.validateSync(req?.body);
        const { model } = req?.body || {};
        await Meta.update(
            {
                value: model
            },
            { where: { name: 'relance_cotisation_modele' } },
            { transaction: t }
        );
        await t.commit();
        res.json({ ok: true });
    } catch (e) {
        await t.rollback();
        res.status(500).end();
    }
});

const xlsxTransformer = (node) => {
    let object = [];
    const coordinate = node?.dataValues?.organization?.dataValues?.coordinates?.find(
        (e) => e.isDefault
    );
    const organization = node?.dataValues?.organization;

    if (coordinate && organization) {
        const { email } = coordinate;
        const { name } = organization;

        if (email) {
            object = [...object, name, email];
        } else {
            object = [...object, name, "pas d'e-mail"];
        }
    }

    return object;
};

router.get('/recipients/export', auth(), async (req, res) => {
    try {
        const { nodes } = await queryCollection({
            collection: SubscriptionFee,
            searchableFields: SubscriptionFee.searchableFields,
            sortableFields: SubscriptionFee.sortableFields,
            internalFields: SubscriptionFee.internalFields,
            params: extractParamsFromRequest(req),
            include: {
                model: Organization,
                as: 'organization',
                include: [
                    {
                        model: Coordinate,
                        where: {
                            isDefault: 1
                        }
                    }
                ]
            },
            where: {
                statut: { [Op.ne]: 'Validé' }
            }
        });

        res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        const workbook = new ExcelJS.Workbook();
        const ws = workbook.addWorksheet();
        const header = ['name', 'email'];
        header.forEach((e, i) => {
            ws.getCell(`${String.fromCharCode(65 + i)}1`).value = e;
        });
        const rows = nodes.map(xlsxTransformer);
        rows.forEach((e, i) => {
            e.forEach((c, j) => {
                ws.getCell(`${String.fromCharCode(65 + j)}${i + 1}`).value = c;
            });
        });

        workbook.xlsx.write(res);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});
router.post('/send-reminder-email', auth(), async (req, res) => {
    const { data } = req?.body || {};

    try {
        const currentYear = getCurrentYear();
        const { id } = await SubscriptionParams.findOne({ where: { year: currentYear } });
        const nodes = await getUnpaidEstablishmentInfo(id);
        await nodes?.establishments?.map(async (e) => {
            const { email, name } = e;
            const { from, subject } = data;
            const html = data?.model?.replace('#NOM', name);
            if (email) {
                const to = email;
                const msg = { from: from || config.email.from, to, subject, html };
                await queues.mail.add({ msg, establishmentId: e?.establishmentId });
            }
        });
        res.json({ ok: true });
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});

export default router;
