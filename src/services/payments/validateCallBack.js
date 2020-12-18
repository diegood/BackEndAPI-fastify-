const Redsys = require('node-redsys-api').Redsys;
const orderRequestDomain = require('../../domain/orders/request/domain');
const paymentDomain = require('../../domain/payments/domain');
const constants = require('./../../config/constants');
const mrwService = require('./../shipping/createShippingByRequestId');
const ENV = process.env;

/**
 * @function decryptPayment
 * @param formBody
 * @param requestId
 * @return {Promise<*>}
 */
const decryptPayment = async(formBody, requestId) => {
    const redsys = new Redsys();
    const merchantParams = formBody.Ds_MerchantParameters || formBody.DS_MERCHANTPARAMETERS;
    const signature = formBody.Ds_Signature || formBody.DS_SIGNATURE;
    try {
        const merchantParamsDecoded = redsys.decodeMerchantParameters(merchantParams);
        const merchantSignatureNotif = redsys.createMerchantSignatureNotif(ENV.TPV_SECRET, merchantParams);
        const dsResponse = parseInt(merchantParamsDecoded.Ds_Response || merchantParamsDecoded.DS_RESPONSE);

        // if (redsys.merchantSignatureIsValid(signature , merchantSignatureNotif) && dsResponse > -1 && dsResponse < 100 ) {
        if (redsys.merchantSignatureIsValid(signature , merchantSignatureNotif)) {
            console.log(`TPV payment is OK, request id : ${requestId}, amount:${merchantParamsDecoded.Ds_Amount},  code: ${dsResponse}, isSecured: ${merchantParamsDecoded.Ds_SecurePayment ? 'yes' : 'no'}`);
            return await paymentDomain.createPaymentByRedysFormData(merchantParamsDecoded, requestId);
            // await orderRequestDomain.updateRequestStatus(requestId, constants.REQUEST_STATE.PREAUTHORIZED);
            // return mrwService.createShippingByRequestId(requestId);
        } 
        // else {
        //     await paymentDomain.createPaymentByRedysFormData(merchantParamsDecoded, requestId);
        //     return orderRequestDomain.updateRequestStatus(requestId, constants.REQUEST_STATE.PREAUTHORIZED_REJECT);
        // }
    } catch (error) {
        throw new Error(error.message);
    }
};



module.exports = {
    decryptPayment,
};
