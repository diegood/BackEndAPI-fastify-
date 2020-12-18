const categoriesDomain = require('../../domain/categories/domain');
const { mapCategoriesResponse } = require('../_mappers/categories');

/**
 * @function getAll
 * @return {Promise<*>}
 */
const getAll = async() => {
    try {
        const categories = await categoriesDomain.getAll();
        return mapCategoriesResponse(categories);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAll,
};
