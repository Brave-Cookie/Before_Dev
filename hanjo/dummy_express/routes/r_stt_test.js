const router = require('express').Router();

router.get('/', function(req, res, next) {
  res.render('stt_test');
});

module.exports = router;
