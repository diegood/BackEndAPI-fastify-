const Redsys = require('node-redsys-api').Redsys;
const FormData = require('form-data');
const fetch = require('node-fetch');
const Decimal = require('decimal.js');
const orderRequestDomain = require('../../domain/orders/request/domain');
const orderRequestProvider = require('../../dao/orders/request/provider');
const paymentDomain = require('../../domain/payments/domain');
const { REQUEST_STATE, REDSYS_TRANSACTIONS_TYPES } = require('../../config/constants');
const ENV = process.env;

/**
 * @function createPayment
 * @return {Promise<*>}
 */
const createPayment = async(requestId) => {
    try {
        const request = await orderRequestDomain.findRequestById(requestId);
        return buildform(request);
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * @function confirmPayment
 * @return {Promise<*>}
 */
const confirmPayment = async(orderRequest) => {
    try {
        const payment = await paymentDomain.findByRequestIdAndTrasaction(orderRequest.id, REDSYS_TRANSACTIONS_TYPES.PREAUTHORIZATION, REQUEST_STATE.AUTHORIZED);
        const signedBody = await buildform(orderRequest, payment);
        const paymentConfirmed = sendConfirmation(signedBody);
        if (paymentConfirmed) {
            await orderRequestProvider.updateRequestStatus(orderRequest.id, REQUEST_STATE.AUTHORIZED);
            return paymentConfirmed 
        } else {
            console.error('Payment Rejected');
            //TODO rollback orders
            throw new Error('Rejected');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

const sendConfirmation = async(signedBody)=>{

    const formData = new FormData();
    formData.append('Ds_Signature', signedBody.signature);
    formData.append('Ds_MerchantParameters', signedBody.merchantParameters);
    formData.append('Ds_SignatureVersion', 'HMAC_SHA256_V1');

    const confirmation = await fetch(ENV.TPV_ENDPOINT_URL, {
        method: 'POST',
        body: formData,
        headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    return confirmation;
}

function buildform(request, payment){
    const redsys = new Redsys();
    let transactionType = REDSYS_TRANSACTIONS_TYPES.PREAUTHORIZATION;
    let paymentId = new Date().getTime().toString().substring(3, 12);
    let merchantAmount = Math.round(request.retainedPrice*100).toString();

    //   "DS_MERCHANT_AMOUNT": Math.round(request.retainedPrice*100).toString(),
    //TODO calc final amount to charge from ticket price
    if(request.status !== REQUEST_STATE.NEW){
        transactionType = REDSYS_TRANSACTIONS_TYPES.PREAUTHORIZATION_CONFIRMATION;
        paymentId = payment[0].gatewayOrder;
        merchantAmount = new Decimal(request.realPrice).toPrecision(4);
    }

    const mParams = {
        "Ds_Merchant_MerchantName": "El Mercado del Pescado",
        "DS_MERCHANT_AMOUNT": merchantAmount,
        "DS_MERCHANT_ORDER": paymentId,
        "DS_MERCHANT_MERCHANTCODE": ENV.TPV_MERCHANT_CODE,
        "DS_MERCHANT_CURRENCY": ENV.TPV_CURRENCY,
        "DS_MERCHANT_TRANSACTIONTYPE": transactionType,
        "DS_MERCHANT_TERMINAL": ENV.TPV_TERMINAL,
        "DS_MERCHANT_MERCHANTURL": `${ENV['TPV_URLS_REDIRECT_CALLBACK_BASE_PATH']}/${request.id}`,
        "DS_MERCHANT_URLOK": `${ENV['TPV_URLS_REDIRECT_OK']}/${request.id}`,
        "DS_MERCHANT_URLKO": `${ENV['TPV_URLS_REDIRECT_KO']}/${request.id}`
    };
    return  new Promise(resolve => 
        resolve({
            signature: redsys.createMerchantSignature(ENV.TPV_SECRET, mParams), 
            merchantParameters: redsys.createMerchantParameters(mParams), 
            raw: mParams}
        )
    )
}

module.exports = {
    confirmPayment,
    createPayment
};
