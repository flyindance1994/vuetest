var express = require('express');
var router = express.Router();

let mysql = require('mysql');
let dbConfig = require('../db/DBConfig');
let orderSQL = require('../db/ordersql');

let pool = mysql.createPool(dbConfig.mysql);

let responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
}

/* GET users listing. */
router.get('/getorders', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) {
      throw err;
    }
    connection.query(orderSQL.queryLimit, [6], function (err, result) {
      if (err) {
        throw err;
      }
      if (result) {
        result = {
          code: 200,
          msg: '查询成功',
          data: result
        }
      }
      responseJSON(res, result);

      connection.release();
    });
  });
});

module.exports = router;
