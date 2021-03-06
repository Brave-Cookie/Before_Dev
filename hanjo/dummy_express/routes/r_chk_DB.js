var express = require('express');
var router = express.Router();

// models 폴더에서 js로 작성된 모델을 모두 참조
var models  = require('../models');

router.get('/', function(req, res, next) {
  // 1. models 폴더에서 test_table을 몽땅 가져온다.
  // 2. 가져온 쿼리셋은 promise 문법대로 then 안에서만 조작가능
  models.test_table.findAll().then( 
    // 가져온 쿼리셋은 result로 이름 지어주기
    // function의 인자로 넣거나 람다?(=>)로 사용하기
    result => {
      // forEach도 비슷하게 사용한다. result 리스트의 값들 하나하나를 obj로 지정
      // 한 행(obj)에서 dataValues를 추출한다.
      result.forEach(obj => console.log(obj.dataValues));
      context ={
        tt : result
      };
      res.render('chk_DB', context);
    }
  )
});

module.exports = router;
