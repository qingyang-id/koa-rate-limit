/**
 * @description 生产环境配置文件
 * @author yq
 * @date 2019-04-29 10:03
 */
const logConfig = require('./log/log4j_config_dev.js');

module.exports = {
  logConfig,
  appConfig: {
    host: '0.0.0.0',
    port: 8001,
  }
};
