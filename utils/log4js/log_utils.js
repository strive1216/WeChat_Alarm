"use strict"
var log4js = require("log4js")
var fs = require("fs")
var path = require("path")
var log_config = require("./log_config")

// 检查配置文件所需的目录是否存在，不存在时创建  


//加载配置文件
log4js.configure(log_config)

var logUtil = {}

var errorLogger = log4js.getLogger("errorLogger")
var resLogger = log4js.getLogger("resLogger")

var logDebug = log4js.getLogger("logDebug")
var logInfo = log4js.getLogger("logInfo")
var logWarn = log4js.getLogger("logWarn")
var logErr = log4js.getLogger("logErr")

//封装错误日志
logUtil.logError = function(ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime))
    }
}

//封装响应日志
logUtil.logResponse = function(ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime))
    }
}

//封装其他日志
logUtil.writeDebug = function(msg) {
    if (msg == null)
        msg = ""
    logDebug.debug(msg)
}

logUtil.writeInfo = function(msg) {
    if (msg == null)
        msg = ""
    logInfo.info(msg)
}

logUtil.writeWarn = function(msg) {
    if (msg == null)
        msg = ""
    logWarn.warn(msg)
}

logUtil.writeErr = function(msg, exp) {
    if (msg == null)
        msg = ""
    if (exp != null)
        msg += "\r\n" + exp
    logErr.error(msg)
}


//格式化响应日志
var formatRes = function(ctx, resTime) {
    var logText = new String()

    //响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n"

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime)

    //响应状态码
    logText += "response status: " + ctx.status + "\n"

    //响应内容
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n"

    //响应日志结束
    logText += "*************** response log end ***************" + "\n"
    return logText
}

//格式化错误日志
var formatError = function(ctx, err, resTime) {
    var logText = new String()

    //错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n"

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime)

    //错误名称
    logText += "err name: " + err.name + "\n"

    //错误信息
    logText += "err message: " + err.message + "\n"

    //错误详情
    logText += "err stack: " + err.stack + "\n"

    //错误信息结束
    logText += "*************** error log end ***************" + "\n"
    return logText
}

//格式化请求日志
var formatReqLog = function(req, resTime) {
    var logText = new String()
    var method = req.method

    //访问方法
    logText += "request method: " + method + "\n"

    //请求原始地址
    logText += "request originalUrl:  " + req.originalUrl + "\n"

    //客户端ip
    logText += "request client ip:  " + req.ip + "\n"

    //开始时间
    // var startTime
    //请求参数
    if (method === "GET") {
        logText += "request query:  " + JSON.stringify(req.query) + "\n"

        // startTime = req.query.requestStartTime
    } else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n"

        // startTime = req.body.requestStartTime
    }
    //服务器响应时间
    logText += "response time: " + resTime + "\n"
    return logText
}

module.exports = logUtil