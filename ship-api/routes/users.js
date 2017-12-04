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

const MAX_DISH = 16;

let queryOrder = function () {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      connection.query(orderSQL.queryLimit, [6], function (err, orders) {
        if (err) {
          throw err;
        }
        if (orders) {
          resolve(orders);
          connection.release();
        }
      });
    });
  });
};

let queryOrderInfo = function (orderids) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      connection.query(orderSQL.queryInfo, orderids, function (err, dishes) {
        if (err) {
          throw err;
        }
        if (dishes) {
          resolve(dishes);
          connection.release();
        }
      });
    });
  });
};

let queryOrderRelish = function (infoids) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      connection.query(orderSQL.queryRelish, infoids, function (err, relish) {
        if (err) {
          throw err;
        }
        if (relish) {
          resolve(relish);
          connection.release();
        }
      })
    });
  });
}

let query = async function (req, res, next) {
  let orders = await queryOrder();

  let orderids = Array();
  orders.forEach(order => {
    orderids.push(order.id);
  });
  orderids = orderids.join(',')
  let orderinfo = await queryOrderInfo(orderids);

  let infoids = Array();
  orderinfo.forEach(info => {
    infoids.push(info.id);
  })
  infoids = infoids.join(',');
  let orderrelish = await queryOrderRelish(infoids);

  orderinfo.forEach(info => {
    info.relish = Array();
    orderrelish.forEach(relish => {
      if (info.id == relish.info_id) {
        info.relish.push(relish);
      }
    })
  })

  orders.forEach(order => {
    order.infos = Array();
    orderinfo.forEach(info => {
      if (info.order_id == order.id) {
        order.infos.push(info);
      }
    });
  })

  res.json({data:orders});
}

/* GET users listing. */
router.get('/getorders', function (req, res, next) {
  let orders = query(req, res, next);
});

module.exports = router;
