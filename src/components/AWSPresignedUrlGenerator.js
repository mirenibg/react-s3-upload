import AWS from 'aws-sdk';
import { Credentials } from 'aws-sdk';

AWS.config.update({ region: process.env.REACT_APP_REGION })

const URL_EXPIRATION_SECONDS = 300
const Bucket = process.env.REACT_APP_BUCKET_NAME;
const s3 = new AWS.S3({
    credentials: new Credentials({
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    }),
    region: process.env.REACT_APP_REGION,
    signatureVersion: "v4",
});

/**
 * Generate put presigned url
 * 
 * @param {string} Key 
 * @param {string} ContentType 
 */
function GeneratePutUrl(Key, ContentType) {
    return new Promise((resolve, reject) => {
        const params = { Bucket, Key, ContentType };

        s3.getSignedUrl('putObject', params, function (err, url) {
            if (err) {
                reject(err);
            }
            resolve(url);
        });
    });
}

/**
 * Generate get presigned url
 * 
 * @param {string} Key 
 */
function GenerateGetUrl(Key) {
    return new Promise((resolve, reject) => {
        const params = { Bucket, Key, Expires: URL_EXPIRATION_SECONDS };

        s3.getSignedUrl('getObject', params, (err, url) => {
            if (err) {
                reject(err);
            }
            resolve(url);
        });
    });
}

export { GeneratePutUrl, GenerateGetUrl };
