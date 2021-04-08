var express = require('express');
var router = express.Router();

// app.js에서 '/next' 라는 이름으로 url을 할당받음

// 그래서 '/'를 쓰면 default url인 '/next + /' 임
router.get('/', function(req, res, next) {
    context={
        a : '어쩌구'
    }
    res.render('next1', context);
});

// '/next2' 를 쓰면 url은 --> '/next' + '/next2' 가 된다!
router.get('/next2', function(req, res, next) {
    context={
        a : '이거슨 콘텍스트 넥스트2'
    }
    res.render('next2', context);
});


module.exports = router;
