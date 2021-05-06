var express = require('express');
var app = express();
var socketIO = require('socket.io');
var http = require('http');

//AWS
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const parameters = require('./parameters');
const fs = require('fs');

//AWS
var count = 0;

var server = http.createServer(app);
var io = require('socket.io').listen(server);  //pass a http.Server instance
server.listen(8080);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/favicon.ico',function(req, res){
  res.writeHead(404);
  res.end();
  return;
});

//AWS
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
}));

app.post('/trans_data', function(req, res) {
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
      //FaceDetails[0] 은 이미지하나에 사람한명을 의미 (어차피 각각 얼굴분석하니까 괜찮음)
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

//p2p
io.sockets.on('connection', function(socket) {

  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    var clientsInRoom = io.sockets.adapter.rooms[room];
    var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    if (numClients === 0) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);

    } else if (numClients === 1) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
      //시작 버튼 비활성화 -> 활성화
    } else { // max two clients
      socket.emit('full', room);
    }
  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('bye', function(){
    console.log('received bye');
  });

});
