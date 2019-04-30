/**
 * @description 请求处理中间件
 * @author yq
 * @date 2019-04-29 15:12
 */
const UUID = require('uuid');
const Logger = require('log4js').getLogger('request-handler');

module.exports = async (ctx, next) => {
  const start = Date.now();
  // 设置请求ID
  const reqId = UUID();
  ctx.session = { reqId };
  // 设置请求参数
  ctx.requestParams = Object.assign({}, ctx.params, ctx.query, ctx.request.body, {
    language: ctx.headers.language || 'zh_cn',
  });
  const result = await next();
  const ms = Date.now() - start;
  Logger.info(`${reqId} ${ctx.ip} ${ctx.method} ${ctx.url} - ${ms}`);
  return result;
};
