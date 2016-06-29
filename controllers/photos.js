var express = require('express'), router = express.Router(), aws = require('aws-sdk');
var db = require('../helpers/db');


router.get('/sign', function(req, res) {
    aws.config.update({accessKeyId: db.AWS_ACCESS_KEY, secretAccessKey: db.AWS_SECRET_KEY});
    var s3 = new aws.S3()
    var options = {
      Bucket: db.S3_BUCKET,
      Key: req.query.file_name,
      Expires: 60,
      ContentType: req.query.file_type,
      ACL: 'public-read'
    }
    s3.getSignedUrl('putObject', options, function(err, data){
      if(err) {
        console.log(err);
        return res.send('Error with S3')
      }
        console.log('Response: ' + data);
        res.json({
        signed_request: data,
        url: 'https://s3.amazonaws.com/' + db.S3_BUCKET + '/' + req.query.file_name
      })
   })
})

  module.exports = router
