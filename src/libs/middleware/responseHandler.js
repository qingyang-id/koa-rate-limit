/**
 * @description 请求返回处理
 * @author yq
 * @date 2019-04-29 14:27
 */
const BaseResponse = require('../response/baseResponse');

module.exports = async function (ctx, next) {
  const result = await next();
  ctx.body = BaseResponse.SUCCESS.clone().setData(result);
};
