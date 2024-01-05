import express from 'express';

import sequelize from '../../../db';
import auth from '../../../middlewares/auth';
import User from '../../../models/User';

const router = express.Router();

router.post(`/:id`, auth(), async (req, res) => {
    let { id } = req?.params || {};
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
        console.log('user not found');
        res.status(404).json({ message: 'user not found' });
    } else {
        const t = await sequelize.transaction();
        try {
            await User.update(
                {
                    isArchived: false
                },
                {
                    where: {
                        id: id
                    }
                },
                { transaction: t }
            );
        } catch (e) {
            await t.rollback();
            console.log(e);
            return res.status(500).json(e);
        }
        await t.commit();

        res.json({ ok: true, id: id });
    }
});
export default router;
