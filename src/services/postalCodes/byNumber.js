const domain = require('../../domain/postalCodes/domain');
/**
 * @function getPostalCodeByNumber
 * @return {Promise<*>}
 */
const getPostalCodeByNumber = async(number) => {
    try {
        return  await domain.getPostalCodeByNumber(number);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getPostalCodeByNumber,
};
