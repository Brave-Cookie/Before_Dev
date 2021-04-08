// express 모듈 불러오기
var express = require('express');
// express 모듈내의 Router 객체로 사용하기
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let context = {
    name : '문자문자',
    num : 5
  };

  // views의 index.ejs를 렌더링
  res.render('index', context);
});

module.exports = router;
