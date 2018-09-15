
const awsBucketUrl = 'https://s3-sa-east-1.amazonaws.com/mybucket.test.com'; //insert your own bucket URL
const awsBucketName = 'insert-the-bucket-name'; //mybucket.test.com
const acessKeyId = 'key-id';
const secretAccessKey = 'secret-key-id';
const expireTime = 60; //expires in 60 seconds, for more information of params read the docs on AWS s3

const getFileByName = (req, res) => {

    var AWS = require('aws-sdk');
    s3 = new AWS.S3({signatureVersion : 'v4', region: 'sa-east-1',accessKeyId : acessKeyId, secretAccessKey : secretAccessKey});
    
    const file = req.params.file;
    const s3Params = {
        Bucket: awsBucketName, 
        Key:file, 
        Expires : expireTime
    };

    s3.getSignedUrl('getObject', s3Params, (err, data) => {
        if(err){
            return res.send(err);
        }
        res.send(data);
    })
};

const getSignedUrl = (req, res) => {

    req.check("filename", "The input filename is required.").notEmpty();
    req.check("filetype", "The input filetype is required.").notEmpty();

    req.asyncValidationErrors().then(async function() {

        const fileName = req.query['filename']
        const fileType = req.query['filetype']

        var AWS = require('aws-sdk');
        s3 = new AWS.S3({signatureVersion : 'v4', region: 'sa-east-1',accessKeyId : accessKeyId, secretAccessKey : secretAccessKey});
        
        const s3Params = {
            Bucket: awsBucketName, 
            Key: fileName,
            ContentType : fileType, 
            Expires : expireTime, 
            ACL : 'private'
        };

        
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if(err){
                return res.send(err);
            }
            const returnData = {
                getSignedUrl : data,
                url: awsBucketUrl+"/"+fileName
            };
            res.send(returnData);
        })

    }).catch(function(errors) {
        return res.status(422).send(errors);
    });
};

module.exports = {
    getFileByName,
    getSignedUrl
}