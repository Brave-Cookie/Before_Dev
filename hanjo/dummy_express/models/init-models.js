var DataTypes = require("sequelize").DataTypes;
var _test_table = require("./test_table");
var _test_table2 = require("./test_table2");

function initModels(sequelize) {
  var test_table = _test_table(sequelize, DataTypes);
  var test_table2 = _test_table2(sequelize, DataTypes);


  return {
    test_table,
    test_table2,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
