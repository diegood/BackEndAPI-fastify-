'use strict';
const provider = require('../../dao/payments/provider');
const {redsysResponsesCodes} = require('../../config/constants'); 
const {ENTITIES_TYPES} = require('../../config/constants')
const QueueMessage = require('../../queue/QueueMessage').QueueMessage

/**
 * Create Payment
 * @param {redsysmerchantParams} merchantParams
 * @param {uuid} requestId
 * @return {Promise<*>}
 */
const createPaymentByRedysFormData = async(merchantParams, requestId) => {
    const dateArray =  [...merchantParams.Ds_Date.split('/').reverse(), ...merchantParams.Ds_Hour.split(':')];
    try {
        const payment= {
            requestId : requestId,
            transactionDate : new Date(dateArray[0], dateArray[1], dateArray[2], dateArray[3], dateArray[4]).getTime(),
            transactionType : merchantParams.Ds_TransactionType,
            transactionCode : redsysResponsesCodes( merchantParams.Ds_Response),
            transactionCodeRaw : merchantParams.Ds_Response,
            currency : merchantParams.Ds_Currency,
            amount : merchantParams.Ds_Amount / 100,
            isSecure : merchantParams.Ds_SecurePayment,
            gatewayOrder : merchantParams.Ds_Order,
            cardCountry : merchantParams.Ds_Card_Country,
            cardType : merchantParams.Ds_Card_Type,
            cardBrand : merchantParams.Ds_Card_Brand,
        }
        const dbpayment = await provider.create(payment);
        new QueueMessage(ENTITIES_TYPES.PAYMENT, dbpayment.id, payment.transactionCodeRaw, payment).send()
        return dbpayment
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Find By Request Id
 * @requires requestId
 * @return {Promise<*>}
 */
const findByRequestId = async(requestId) => {
    try {
        return await provider.findByRequestId(requestId);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Find By Request Id and Transaction-row-code and transaction-type
 * @requires requestId
 * @param {string} transactionType
 * @param {string} transactionCode
 * @return {Promise<*>}
 */
const findByRequestIdAndTrasaction = async(requestId, transactionType, transactionCode) => {
    try {
        return await provider.findByParams(requestId, transactionType, transactionCode)
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Find By payment Id
 * @requires id
 * @return {Promise<*>}
 */
const findById = async(id) => {
    try {
        return await provider.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createPaymentByRedysFormData,
    findByRequestIdAndTrasaction,
    findByRequestId,
    findById
};
