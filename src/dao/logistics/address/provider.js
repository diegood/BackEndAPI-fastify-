const model = require('./model');

/**
 * Get Address by id
 * @return {Promise<*>}
 */
const getById = async(id) => {
    try {
        return await model.findAll({
            where: {id},
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

/**
 * Create Address Store
 * @param {object} address
 * @return {Promise<*>}
 */
const createAddress = async(address) => {
    try {
        return await model.create(address);
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

module.exports = {
    getById,
    createAddress,
};
