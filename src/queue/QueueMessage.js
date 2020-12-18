const ENV = process.env;
const {sqs} = require('./config')

class QueueMessage{
    reference;
    newStatus;
    service;
    body;
    constructor(service, reference, newStatus, body){
        this.reference = reference;
        this.newStatus = newStatus;
        this.service = service;
        this.body = {reference, newStatus, ...body}
    }

    send(){
        return submit(this)
    }

    set setBody(value){
        this.body = {reference: this.reference, ...value}
    }
    get getBody(){
        return this.body
    }
    get getService(){
        return this.service
    }
    get getReference(){
        return this.reference
    }
    get getNewStatus(){
        return this.newStatus
    }
}

const submit = (QueueMessage)=>{
    const params = {
        MessageBody: JSON.stringify(QueueMessage),
        QueueUrl:  ENV.SQS_QUEUE_URL
    };
    return sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });
}


module.exports ={
    QueueMessage
}