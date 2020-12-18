const ENV = process.env;
const {sqs} = require('./config');
const { Consumer } = require('sqs-consumer');
const {QueueMessage} = require('./QueueMessage');

const dispatcher = require('./dispatcher');


const consumer = Consumer.create({
    queueUrl: ENV.SQS_QUEUE_URL,
    waitTimeSeconds: 15,
    pollingWaitTimeMs: 5000,
    handleMessage: async (message) => {
        if (message) {
            const body= JSON.parse(message.Body)
            console.log('Message:', body)
            return await dispatcher.dispatchService(new QueueMessage(body.service, body.reference, body))
        }
    },
    sqs: sqs
  });

  consumer.on('error', (err) => {
    console.error(err.message);
  });

  consumer.on('processing_error', (err) => {
    console.error(err.message);
  });

  consumer.on('timeout_error', (err) => {
    console.error(err.message);
  });

  consumer.start();

module.exports = {
    consumer
}