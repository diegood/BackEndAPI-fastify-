const domain = require('../../domain/presentation/domain');
/**
 * @function getAll
 * @return {Promise<*>}
 */
const getAll = async() => {
    try {
        return await domain.getAll();
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAll,
};
