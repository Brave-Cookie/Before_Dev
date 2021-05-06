const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const AWS = require('aws-sdk')
const parameters = require('./parameters')
const fs = require('fs')
const sharp = require('sharp')

var count = 0;

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
}));

app.use(bodyParser.json());
//pattern１
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/trans_data', function(req, res) {
  console.log(count);
  var img = req.body.img;
  var buffer = new Buffer.from(img.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');

  var rekognition = new AWS.Rekognition({
    apiVersion: '2016-06-27',
    accessKeyId: parameters.AWS.accessKeyId,
    secretAccessKey: parameters.AWS.secretAccessKey,
    region: parameters.AWS.region
  });

  //로컬에서 불러온 이미지
  var params = {
    Attributes: ["ALL"],
    Image: {
      Bytes: buffer
    }
  };
  rekognition.detectFaces(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      //예지 : FaceDetails[0] 은 이미지하나에 사람한명을 의미 (어차피 각각 얼굴분석하니까 괜찮음)
      console.log(data.FaceDetails[0].Emotions); // successful response
      try {
        if(count===0){
          fs.writeFileSync("./result.json", JSON.stringify(data.FaceDetails[0].Emotions));
          count++;
        }
        else{
          fs.appendFileSync('./result.json',","+JSON.stringify(data.FaceDetails[0].Emotions));
        }
      } catch (err) {
        console.error(err)
      }
    }
  });
  res.redirect('/'); 
});

app.listen(3000, () => {
  console.log('Server started!')
})
