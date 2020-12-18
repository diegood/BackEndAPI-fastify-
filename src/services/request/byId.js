const domain = require('../../domain/orders/request/domain');
/**
 * @function orderRequestById
 * @param {string} id
 * @return {Promise<*>}
 */
const orderRequestById = async(id) => {
    try {
        return await domain.findRequestById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {
    orderRequestById,
};