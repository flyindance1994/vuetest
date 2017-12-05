var express = require('express');
var router = express.Router();

let mysql = require('mysql');
let dbConfig = require('../db/DBConfig');
let orderSQL = require('../db/ordersql');

let pool = mysql.createPool(dbConfig.mysql);

let cookieParse = require('cookie-parser');
let session = require('express-session');
let crypto = require('crypto');
let moment = require('moment');

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

function md5(orders) {
  var md5 = crypto.createHash('md5');
  return md5.update(orders).digest('hex');
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

let queryCheckStatu = function (id) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      connection.query(orderSQL.queryCheckStatu, id, function (err, statu) {
        if (err) {
          throw err;
        }
        if (statu) {
          resolve(statu);
          connection.release();
        }
      })
    })
  })
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

  //显示的订单数量
  let box_number = 0;
  orders.forEach(order => {
    box_number += parseInt(order.infos.length / MAX_DISH);
  })

  while (--box_number) {
    orders.pop();
  }

  //对比缓存
  if (req.session.orders) {
    let encode_cache = md5(JSON.stringify(req.session.orders));
    let encode_orders = md5(JSON.stringify(orders));
    if (encode_cache != encode_orders) {
      let cache_orders = req.session.orders;
      req.session.orders = orders;

      cache_orders.forEach(async cache => {
        if (orders.indexOf(cache) == -1) {
          let statu = await queryCheckStatu(cache.id);
          if (statu == 1) {
            cache.over = "已完成";
          }
        }
      })

      orders = cache_orders;
    }
  } else {
    req.session.orders = orders;
  }

  let list = Array();
  let dish_length = orders.length;
  let dish_length_bak = dish_length + 1;

  let continuenum = 0;

  while (dish_length_bak--) {
    if (dish_length - dish_length_bak - continuenum >= orders.length) {
      break;
    }
    list[dish_length - dish_length_bak] = Array();
    list[dish_length - dish_length_bak][0] = "订单编号: " + orders[dish_length - dish_length_bak - continuenum].order_sn.substring(orders[dish_length - dish_length_bak - continuenum].order_sn.length - 4);
    list[dish_length - dish_length_bak][1] = "下单时间: " + moment(orders[dish_length - dish_length_bak - continuenum].buy_time).format('HH:mm:ss');
    list[dish_length - dish_length_bak][2] = "配送时间: " + moment(orders[dish_length - dish_length_bak - continuenum].send_time).format('HH:mm:ss');
    list[dish_length - dish_length_bak][3] = "配送方式: " + orders[dish_length - dish_length_bak - continuenum].type;

    let number = 4;
    let start_index = 0;
    //超过最大数量时，跨格处理
    if (orders[dish_length - dish_length_bak - continuenum].infos.length > MAX_DISH) {
      orders[dish_length - dish_length_bak - continuenum].infos.forEach(dish => {
        if (number > 19) {
          list[dish_length - dish_length_bak + 1] = Array();
          if (start_index == 0) {
            list[dish_length - dish_length_bak + 1][start_index++] = "(接上文)";
            list[dish_length - dish_length_bak + 1][start_index++] = dish.goods_name + 'X' + dish.num;
          } else {
            list[dish_length - dish_length_bak + 1][start_index++] = dish.goods_name + 'X' + dish.num;
          }
        } else {
          list[dish_length - dish_length_bak][number++] = dish.goods_name + 'X' + dish.num;
        }
      });
      if (orders[dish_length - dish_length_bak - continuenum].remark != 'null') {
        list[dish_length - dish_length_bak + 1][start_index] = "备注:" + orders[dish_length - dish_length_bak - continuenum]['remark'];
      } else {
        list[dish_length - dish_length_bak + 1][start_index] = "备注:无";
      }

      if (orders[dish_length - dish_length_bak - continuenum].over != undefined) {
        list[dish_length - dish_length_bak + 1][start_index + 1] = orders[dish_length - dish_length_bak - continuenum].over;
      }
      dish_length_bak--;
      continuenum++;
    } else {
      orders[dish_length - dish_length_bak - continuenum].infos.forEach(dish => {
        list[dish_length - dish_length_bak][number++] = dish.goods_name + 'X' + dish.num;
      });

      if (orders[dish_length - dish_length_bak - continuenum].remark != 'null') {
        list[dish_length - dish_length_bak][number] = "备注: " + orders[dish_length - dish_length_bak - continuenum].remark;
      } else {
        list[dish_length - dish_length_bak][number] = "备注: 无";
      }

      if (orders[dish_length - dish_length_bak - continuenum].over != undefined) {
        list[dish_length - dish_length_bak][number + 1] = orders[dish_length - dish_length_bak - continuenum].over;
      }
    }
  }

  res.json({ data: list });
}

/* GET users listing. */
router.get('/getorders', function (req, res, next) {
  let orders = query(req, res, next);
});

module.exports = router;
