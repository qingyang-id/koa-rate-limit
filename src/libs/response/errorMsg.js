/**
 * @description 错误信息，TODO 后期配置到数据库
 * @author      yq
 * @date        2019-04-29 14:00
 */
const ErrorCode = require('./errorCode.js');

module.exports = {
  [ErrorCode.SUCCESS]: {
    zh_cn: '成功',
    en_us: 'success',
  },
  [ErrorCode.FAILED]: {
    zh_cn: '请求失败，请稍后重试',
    en_us: 'Request failed, please try again later',
  },
  [ErrorCode.INVALID_PARAMS]: {
    zh_cn: '请求参数错误',
    en_us: 'Incorrect request parameter',
  },
  [ErrorCode.SYSTEM_ERROR]: {
    zh_cn: '系统错误',
    en_us: 'System error',
  },
  [ErrorCode.SYSTEM_BUSY]: {
    zh_cn: '系统繁忙',
    en_us: 'The system is busy',
  },
};
