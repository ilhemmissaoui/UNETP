import Civility from '../../models/Civility';
import User from '../../models/User';

const migrate = async (sequelize) => {
    const t = await sequelize.transaction();
    try {
        // just a simple example,this needs to be completed later
        const miss = await Civility.findOne({ where: { name: 'Mademoiselle' } });
        const mrs = await Civility.findOne({ where: { name: 'Madame' } });

        await User.update(
            { civilityId: mrs.id },
            { where: { civilityId: miss.id } },
            { transaction: t }
        );
        await t.commit();
    } catch (e) {
        console.error(e);
        await t.rollback();
        throw e;
    }
};

const getMigration = () => {
    return {
        name: 'Civilities',
        migrate
    };
};
export default getMigration;
