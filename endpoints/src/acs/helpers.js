import Establishment from '../models/Establishment';
import Function from '../models/Function';
import FunctionLabel from '../models/FunctionLabel';
import Organization from '../models/Organization';
import SubscriptionFee from '../models/SubscriptionFee';
import User from '../models/User';

export const establishmentOwnership = async (userId) => {
    const user = (
        await User.findOne({
            where: { id: userId },
            include: [
                {
                    model: Function,
                    include: [
                        { model: FunctionLabel, where: { isHeadMaster: true } },
                        {
                            model: Organization,
                            include: {
                                model: Establishment,
                                as: 'establishment'
                            }
                        }
                    ]
                }
            ]
        })
    )?.get();
    return { id: { $in: user?.functions.map((e) => e.organization.establishment.id) } };
};
export const subscriptionFeesOwnership = async (userId) => {
    const user = (
        await User.findOne({
            where: { id: userId },
            include: [
                {
                    model: Function,
                    include: [
                        { model: FunctionLabel, where: { isHeadMaster: true } },
                        {
                            model: Organization,
                            include: {
                                model: SubscriptionFee
                            }
                        }
                    ]
                }
            ]
        })
    )?.get();
    return {
        id: {
            $in: user?.functions.map((e) => e.organization.subscriptionFees.map((e) => e.id)).flat()
        }
    };
};
export const userOwnership = (userId) => ({
    id: userId
});
