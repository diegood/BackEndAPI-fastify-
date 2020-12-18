const domain = require('../../domain/postalCodes/domain');
/**
 * @function getAllPostalCodes
 * @return {Promise<*>}
 */
const getAllPostalCodes = async() => {
    try {
        return  await domain.getAllPostalCodes();
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllPostalCodes,
};
