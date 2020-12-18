const domain = require('../../domain/orders/request/domain');

/**
 * @function getAllRequestByUserId
 * @param userId
 * @return {Promise<*>}
 */
const getAllRequestByUserId = async(userId) => {
    try {
        return await domain.findRequestByUserID(userId);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllRequestByUserId,
};