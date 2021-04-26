var express = require('express');
var router = express.Router();

// api의 라우터를 관리함
// http://localhost:3000/api/chk_DB
router.use('/chk_DB', require('./chk_DB'));

module.exports = router;