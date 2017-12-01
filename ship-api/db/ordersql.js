let OrderSQL = {
    queryLimit:'SELECT id,buy_time,send_time,order_sn,type,remark FROM bh_orders ORDER BY buy_time LIMIT ?',
    queryInfo:'SELECT * FROM bh_orders_info where order_id in (?)',
    queryRelish:'SELECT * FROM bh_orders_info_relish WHERE info_id in (?)',
};

module.exports = OrderSQL;