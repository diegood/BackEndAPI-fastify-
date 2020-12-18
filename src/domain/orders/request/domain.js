const provider = require('../../../dao/orders/request/provider');
const {ENTITIES_TYPES} = require('../../../config/constants')
const QueueMessage = require('../../../queue/QueueMessage').QueueMessage

/**
 * create request by cart
 * @param request
 * @return {Promise<*>}
 */
const createRequest = async(request) => {
    try {
        return await provider.createRequest(request)
    } catch (error) {
        throw new Error(error.message);
    }
};
/**
 * Find Order Request By Id
 * @param {string} id
 * @return {Promise<*>}
 */
const findRequestById = async(id) => {
    try {
        return await provider.findRequestById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};
/**
 * Get Find request By user Id
 * @return {Promise<*>}
 */
const findRequestByUserID = async(storeId) => {
    try {
        return await provider.findRequestByUserID(storeId);
    } catch (error) {
        throw new Error(error.message);
    }
};
/**
 * Update Request Status
 * @param {string} status
 * @return {Promise<*>}
 */
const updateRequestStatus = async(requestId, status) => {
    try {
        const lastRequest = provider.findRequestById(requestId)
        const result = await provider.updateRequestStatus(requestId, status);
        if(lastRequest.status !== status) new QueueMessage(ENTITIES_TYPES.REQUEST, requestId, status, lastRequest).send()
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createRequest,
    findRequestById,
    findRequestByUserID,
    updateRequestStatus
};
