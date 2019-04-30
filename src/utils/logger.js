/**
 * @description 日志工具类
 * @author yq
 * @date 2019-04-29 10:24
 */
const log4js = require('log4js');
const { logConfig } = require('../config');

log4js.configure(logConfig);

function getLogger(name) {
  return log4js.getLogger(name);
}

module.exports.getLogger = getLogger;
