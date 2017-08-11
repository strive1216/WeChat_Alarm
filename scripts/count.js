var moment = require("moment-timezone")
const _mssql = require("../utils/mssql/util")
moment.tz.setDefault("Asia/Shanghai")

exports.alarm = function() { //YYYY-MM-DD hh:mm:ss
    var sql = "SELECT * FROM WChart2  ORDER BY id ASC"
    return _mssql.select(sql)
}

exports.delalarm = function(id) {
    var sql = `DELETE FROM WChart2 WHERE id =${id} `
    return _mssql.select(sql)
}