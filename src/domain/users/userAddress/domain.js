const provider = require('../../../dao/users/userAddress/provider');
const postalCodesProvider = require('../../../dao/postalsCodes/provider');

/**
 * Get by User id
 * @param {string} userId
 * @return {Promise<*>}
 */
const getByUserId = async(userId) => {
    try {
        return await provider.getUserAddress(userId);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Get by UserId and type
 * @param {string} userId
 * @param {string} type
 * @return {Promise<*>}
 */
const getByUserAndType = async(userId, type) => {
    try {
        return await provider.getAllUserAddresses(userId, type);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Create User address
 * @param {object} address
 * @return {Promise<*>}
 */
const createUserAddress = async(address) => {
    try {
        const pcData = await postalCodesProvider.getPostalCodeById(address.postalCodeId);
        const userAddress = {
            userId: address.userId,
            priority: address.priority,
            name: address.name,
            address:{
                postalCodeId: address.postalCodeId,
                type: address.type,
                roadType: address.roadType,
                street: address.street,
                streetNumber: address.streetNumber,
                city: pcData.cityName,
                country: pcData.country,
                localtown: pcData.localtown,
                postalCode: pcData.postalCode,
                extra: address.extra
            }
        }
        return await provider.createUserAddress(userAddress);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Update User address
 * @param {object} userAddressId
 * @return {Promise<*>}
 */
const updateUserAddress = async(address, userAddressId, userId) => {
    try {
        address.userId = userId;
        await removeUserAddress(userAddressId);
        return await createUserAddress(address);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Update User address
 * @param {Array} addressesArray
 * @return {Promise<*>}
 */
const updateAddressesByType = async(addressesArray) => {
    try {
        return await provider.updateUserAddresses(addressesArray);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * remove User address
 * @param {object} userAddressId
 * @return {Promise<*>}
 */
const removeUserAddress = async(userAddressId) => {
    try {
        return await provider.disableUserAddress(userAddressId);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getByUserId,
    createUserAddress,
    updateUserAddress,
    removeUserAddress,
    getByUserAndType,
    updateAddressesByType,
};
