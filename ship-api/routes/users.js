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

let query = async function () {
  let orders = await queryOrder();

  let orderids = Array();
  orders.forEach(order => {
    orderids.push(order.id);
  });
  orderids = orderids.join(',')
  let orderinfo = await queryOrderInfo(orderids);
  
  let infoids = Array();
  orderinfo.forEach(info=>{
    infoids.push(info.id);
  })
  infoids = infoids.join(',');
  let orderrelish = await queryOrderRelish(infoids);

  

}

/* GET users listing. */
router.get('/getorders', function (req, res, next) {
  query();


  // pool.getConnection(function (err, connection) {
  //   if (err) {
  //     throw err;
  //   }

  // connection.query(orderSQL.queryLimit, [6], function (err, orders) {
  //   if (err) {
  //     throw err;
  //   }
  //   if (orders) {
  //     orders.forEach(order => {
  //       connection.query(orderSQL.queryInfo, [order.id], function (err, dishes) {
  //         if (err) {
  //           throw err;
  //         }
  //         if (dishes) {
  //           dishes.forEach(dish => {
  //             connection.query(orderSQL.queryRelish, [dish.id], function (err, relish) {
  //               if (err) {
  //                 throw err;
  //               }
  //               if (relish) {
  //                 dish['relish'] = relish;
  //               }
  //             });
  //           });
  //         }
  //         order['order_info'] = dishes;
  //       });
  //     });
  //   }
  //   responseJSON(res, orders);
  //   connection.release();
  // });
  // });
});

module.exports = router;
