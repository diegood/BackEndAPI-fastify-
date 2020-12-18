const ENV = process.env;
const mailchimp = require('@mailchimp/mailchimp_marketing');
const fetch = require('node-fetch');
const md5 = require("md5");

mailchimp.setConfig({
    apiKey: ENV.MAILCHIMP_API_KEY,
    server: ENV.MAILCHIMP_SERVER,
});

/**
 * @function callPing
 * @return {response}
 */
async function callPing() {
    return await mailchimp.ping.get();
}

/**
 * @function subscribeUserEmail
 * @param {Object} user
 * @return {response}
 */
async function subscribeUserEmail(user) {
    return await mailchimp.lists.addListMember(ENV.MAILCHIMP_LIST_ID, {
      email_address: user.email,
      status: "subscribed",
      merge_fields: {
        FNAME: user.firstName,
        LNAME: user.lastName
      }
    });
}

/**
 * @function unsubscribeUserEmail
 * @param {String} email
 * @return {response}
 */
async function unsubscribeUserByEmail(email) {
    updateUserStatusByEmail(email, { status: "unsubscribed" });
}

/**
 * @function addTagToUserEmail
 * @param {String} email
 * @param {String} tag
 * @return {response}
 */
async function addTagToUserEmail(email, tag) {
  updateTagToUserEmail(email, tag, true);
}

/**
 * @function removeTagToUserEmail
 * @param {String} email
 * @param {String} tag
 * @return {response}
 */
async function removeTagToUserEmail(email, tag) {
  updateTagToUserEmail(email, tag, false);
}

/**
 * @function updateTagToUserEmail
 * @param {String} email
 * @param {String} tag
 * @param {Boolean} add
 * @return {response}
 */
async function updateTagToUserEmail(email, tag, add=true) {
  try {
    const subscriberHash = await md5(email.toLowerCase());
    const status = add ? 'active': 'inactive';
    await fetch(`https://${ENV.MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${ENV.MAILCHIMP_LIST_ID}/members/${subscriberHash}/tags`,
      {
      method: 'POST',
      body: `{"tags": [{"name": "${tag}", "status": "${status}"}]}`,
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + ENV.MAILCHIMP_API_KEY
      }}
    )
    return getTagsToUserEmail(email)
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * @function getTagsToUserEmail
 * @param {string} email
 * @return {response}
 */
async function getTagsToUserEmail(email) {
  try {
    const subscriberHash = md5(email.toLowerCase());
    const response = await mailchimp.lists.getListMemberTags(ENV.MAILCHIMP_LIST_ID, subscriberHash);
    return JSON.stringify(response);
  } catch (error) {
    throw new Error(error)
  }
}


/**
 * @function updateUserByEmail
 * @param {String} email
 * @param {Object} params
 * @return {response}
 */
async function updateUserStatusByEmail(email, params) {
    const subscriberHash = md5(email.toLowerCase());
    return await mailchimp.lists.updateListMember( ENV.MAILCHIMP_LIST_ID, subscriberHash, {...params });
}

/**
 * @function checkSubscriptionByUserEmail
 * @description return status subscription status on mailchimp 
 * returning "subscribed", "pending", "cleaned" and "unsubscribed" or error if this email not exist.
 * @param {string} email
 * @return {string}
 */
async function checkSubscriptionByUserEmail(email) {
    const subscriberHash = md5(email.toLowerCase());
    try {
      const response = await mailchimp.lists.getListMember( ENV.MAILCHIMP_LIST_ID, subscriberHash );
      return {response, status: response.status}
    } catch (e) {
      if (e.status === 404) {console.error(`This email is not subscribed to this list`, e)}
      else {throw new Error(e) }
    }
}


module.exports = {
    callPing,
    subscribeUserEmail,
    checkSubscriptionByUserEmail,
    unsubscribeUserByEmail,
    updateUserStatusByEmail,
    addTagToUserEmail,
    removeTagToUserEmail,
    getTagsToUserEmail
}




