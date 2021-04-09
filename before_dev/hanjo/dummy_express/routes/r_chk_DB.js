var express = require('express');
var router = express.Router();

// 
var models  = require('../models');

router.get('/', function(req, res, next) {

  // 
  const tt = models.test_table.findAll({});
  console.log(tt.dataValues);


  res.render('chk_DB', {tt});
});

module.exports = router;
