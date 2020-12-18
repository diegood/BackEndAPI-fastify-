const domain = require('../../domain/orders/domain');
/**
 * @function getOrderById
 * @param id
 * @return {Promise<*>}
 */
const getOrderById = async(id) => {
    try {
        return  await domain.getOrderById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getOrderById,
};
