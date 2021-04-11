/*
var express = require('express');
var path = require('path');
var router = express.Router();


	'/' url로 접근했을 경우,
	결과값으로 public에 있는 index.html을 반환함을 의미
	여기서 index.html은 아까 위에서 우리가 배포가능한 형태로 바꾼 Vue!

router.get('/', function(req, res, next) {
	
	//res.send('index');


  res.sendFile(path.join(__dirname, '../public', 'index.html'));
})


module.exports = router;
*/

var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

module.exports = router;