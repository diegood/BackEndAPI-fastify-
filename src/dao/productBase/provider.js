const model = require('./model');

/**
 * Get All Products
 * @return {Promise<*>}
 */
const getAll = async(role) => {
    try {
        return await model.findAll({
            raw: true,
        });
    } catch (error) {
        console.error(error, error.stack);
        throw new Error(error);
    }
};

module.exports = {
    getAll,
};
