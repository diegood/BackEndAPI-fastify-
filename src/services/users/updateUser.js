const userDomain = require('../../domain/users/domain');
const userAddressDomain = require('../../domain/users/userAddress/domain');
const responseMapper = require('../_mappers/users');

/**
 * @function updateUser
 * @param {object} userData
 * @return {Promise<*>}
 */
const updateUser = async(user, userId) => {
    try {
        const userUpdate= {
            firstName: user.firstName,
            lastName: user.lastName,
            documentType: user.documentType,
            documentNumber: user.documentNumber,
            phoneNumber: user.phoneNumber,
            settings: user.settings,
            avatar: user.avatar,
            birthDate: user.birthDate,
            gender: user.gender,
            acceptTerms: user.acceptTerms,
            acceptCookies: user.acceptCookies
        }
        const result = await userDomain.updateUser(userUpdate, userId)
        return Array.isArray(result)? responseMapper.user(result[1]) : false ;
    } catch (error) {
        throw new Error(error.message);
    }
};


/**
 * @function createUserAddress
 * @param {object} address
 * @param {object} userId
 * @return {Promise<*>}
 */
const createUserAddress = async(address, userId) => {
    try {
        address.userId = userId;
        const userAddresses = await userAddressDomain.getByUserAndType(userId, address.type)
        if (userAddresses.length > 0 && address.priority) {
            const addressesIds = userAddresses.map((address) => address.id);
            const addressPriority = await userAddressDomain.updateAddressesByType(addressesIds);
            const createdAddress = await userAddressDomain.createUserAddress(address, addressPriority);
            return createdAddress;
        } else {
            return await userAddressDomain.createUserAddress(address)
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * @function updateUserAddress
 * @param {object} address
 * @param {object} userId
 * @return {Promise<*>}
 */
const updateUserAddress = async(address, userAddressId, userId) => {
    try {
        //return await userAddressDomain.updateUserAddress(address , userAddressId , userId)
        const userAddresses = await userAddressDomain.getByUserAndType(userId, address.type)
        if (userAddresses.length > 0 && address.priority) {
            const addressesIds = userAddresses.map((address) => address.id);
            const addressPriority = await userAddressDomain.updateAddressesByType(addressesIds);
            const updatedAddress = await userAddressDomain.updateUserAddress(address , userAddressId , userId, addressPriority);
            return updatedAddress;
        } else {
            return await userAddressDomain.updateUserAddress(address , userAddressId , userId)
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * @function removeUserAddress
 * @param {object} userId
 * @return {Promise<*>}
 */
const removeUserAddress = async(userAddressId) => {
    try {
        return await userAddressDomain.removeUserAddress(userAddressId)
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * @function getAllUserAddress
 * @param {object} userId
 * @return {Promise<*>}
 */
const getAllUserAddress = async(userId, addressType) => {
    try {
        return await userAddressDomain.getByUserAndType(userId, addressType);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    updateUser,
    createUserAddress,
    updateUserAddress,
    removeUserAddress,
    getAllUserAddress,
};
