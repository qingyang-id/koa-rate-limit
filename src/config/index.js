/**
 * @description 配置信息
 * @author yq
 * @date 2019-04-29 14:24
 */
let config;

switch (process.env.NODE_ENV) {
  case 'production':
    config = require('./prod');
    break;
  case 'test':
    config = require('./test');
    break;
  default:
    config = require('./dev');
}

module.exports = config;
