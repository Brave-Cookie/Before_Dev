var express = require('express');
var router = express.Router();

// python-shell 모듈을 불러오고 options을 미리 설정
// 나중에 옵션 참고 : https://yunknows.tistory.com/entry/%EB%AC%B8%EA%B3%BC-%EA%B0%9C%EB%B0%9C%EC%9E%90-Node-with-Pythonpython-shell
var {PythonShell} = require('python-shell');
var options = {
  // py 파일 모아놓은 폴더 경로 지정
  scriptPath: './py_files',
};


router.get('/', function(req, res, next) {

  // py 파일명과 옵션 지정 + 반환값은 에러값과 print의 결과값이므로 두 값을 바로 받아서 조작.
  PythonShell.run('test.py', options, function (err, results) {
    if (err) throw err;
    console.log('results: %j', results);
  });

  res.render('run_py');
});

module.exports = router;
