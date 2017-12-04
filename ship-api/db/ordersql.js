let OrderSQL = {
    queryLimit:'SELECT id,buy_time,send_time,order_sn,type,remark FROM bh_orders ORDER BY buy_time LIMIT ?',
    queryInfo:'SELECT * FROM bh_orders_info where FIND_IN_SET(order_id, (?))',
    queryRelish:'SELECT * FROM bh_orders_info_relish WHERE FIND_IN_SET(info_id, (?))',
};

module.exports = OrderSQL;