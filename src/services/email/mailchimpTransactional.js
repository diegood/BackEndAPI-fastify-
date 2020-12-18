const ENV = process.env;
const mailchimpTx= require('@mailchimp/mailchimp_transactional')(ENV.MANDRILL_API_KEY);
//const md5 = require("md5");

/**
 * @function transactionalPing
 * @return {response}
 */
const txPing = async() => {
    const response = await mailchimpTx.users.ping();
    console.log(response);
    return response;
}
/**
 * @function formatMessage
 * @param {String} from
 * @param {String} to
 * @param {String} subject
* @param {String} text
 * @return {Object}
 */
const formatMessage = (from, to, subject, text) => {
    return {
        from_email: from,
        subject,
        text,
        to: [{
            email: to,
            type: "to"
        }]
    }
};
/**
 * @function formatMessage
 * @param {String} from
 * @param {String} to
 * @param {String} subject
* @param {String} text
 * @return {Response}
 */
const sendMessage = async (from, to, subject, text) => {
    try {
        const message = formatMessage(from, to, subject, text);
        const response = await mailchimpTx.messages.send({message});
        console.log(response);
        return response;
    } catch (error) {
        console.error('Send Message ', error);
        return error;
    }
}

module.exports = {
    txPing,
    sendMessage,
};