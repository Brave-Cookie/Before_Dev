// express 모듈 불러오기
var express = require('express');
// express 모듈내의 Router 객체로 사용하기
var router = express.Router();

router.get('/', function(req, res, next) {
  // views의 index.ejs를 렌더링
  res.render('index');
});

module.exports = router;
