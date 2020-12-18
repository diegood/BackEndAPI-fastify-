'use strict';
const ENV = process.env;
const s3 = require('../../config/constants').S3;
const { v4: uuidv4 } = require('uuid');
const domain = require('../../domain/images/domain');

const REGEX_EXTENSION = /\.[0-9a-z]+$/i;


// TODO Resolver bien el tema de los ALT
/**
 * @function uploadImage
 * @param {Blob} file
 * @param {String} belongsTo
 * @return {*}
 */
const uploadImage = async (file, belongsTo) => {
    try {
        const id = uuidv4();
        const fileExtension = file.name.match(REGEX_EXTENSION)[0];
        const params = {
            Bucket: ENV.AWS_S3_BUCKET_NAME,
            Key: `${belongsTo}/${id}${fileExtension}`,
            Body: file.data,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, function (err, data) {
                if (err) reject(err);
                domain.saveImage(id, data.key, belongsTo, belongsTo);
                resolve({ url: data.Location, path: data.key });
            });
        })
    } catch (error) {
        throw new Error(error);
    }
};


// TODO Esto tiene que ser seguro aplicar encriptacion de AWS S3
/**
 * @function uploadImage
 * @param {Blob} file
 * @param {String} belongsTo
 * @return {*}
 */
const uploadTicket = async (file, belongsTo, orderId) => {
    try {
        const id = orderId;
        const fileExtension = file.name.match(REGEX_EXTENSION)[0];
        const params = {
            Bucket: ENV.AWS_S3_BUCKET_NAME,
            Key: `${belongsTo}/${id}${fileExtension}`,
            Body: file.data,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, function (err, data) {
                if (err) reject(err);
                domain.saveImage(id, data.key, belongsTo, belongsTo);
                resolve({ url: data.Location, path: data.key});
            });
        })
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    uploadImage,
    uploadTicket
};
