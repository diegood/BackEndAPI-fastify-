const ENV = process.env;
const AWS = require('aws-sdk');

AWS.config.update({
    region: ENV.SQS_QUEUE_REGION,
    accessKeyId: ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV.AWS_ACCESS_KEY_SECRET,
});

const SQS = new AWS.SQS();

module.exports = {sqs : SQS}
