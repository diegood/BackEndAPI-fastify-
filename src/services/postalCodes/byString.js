const domain = require('../../domain/postalCodes/domain');
/**
 * @function getPostalCodesByString
 * @return {Promise<*>}
 */
const getPostalCodesByString = async(text) => {
    try {
        return  await domain.getPostalCodesByString(text);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getPostalCodesByString,
};
