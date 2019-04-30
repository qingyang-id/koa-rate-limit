/**
 * @description 错误处理中间件
 * @author yq
 * @date 2019-04-29 14:36
 */
const Logger = require('log4js').getLogger('error-handler');
const BaseResponse = require('../response/baseResponse');

module.exports = async function (ctx, next) {
  try {
    await next();
    if (ctx.status >= 400) ctx.throw(ctx.status);
  } catch (err) {
    Logger.error('request failed: ', err);
    if (err instanceof BaseResponse) {
      ctx.body = err.setLanguage(ctx.requestParams.language);
      return;
    }
    const code = (err.statusCode || err.status) || 500;
    const message = ctx.app.env !== 'production' ? err.message : '请求失败，请稍后重试';
    ctx.body = BaseResponse.create(code, message).setLanguage(ctx.requestParams.language);
  }
};
