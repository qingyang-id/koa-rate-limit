/**
 * @description 漏桶算法限流熔断逻辑
 * @author yq
 * @date 2019-04-30 15:35
 */
const Logger = require('log4js').getLogger('token-bucket-handler');
const BaseResponse = require('../../response/baseResponse');
const ErrorCode = require('../../response/errorCode');

// 漏桶限流熔断配置信息
const RATE_LIMIT = {
  max: 2, // 最大请求数，超过该数量时，新的请求会被直接拒绝
  limit: 1, // 请求并发数，最大同时处理的请求数
  counter: 0, // 当前请求数
  queues: [], // 请求队列
  time: Date.now()
};

module.exports = async function (ctx, next) {
  try {
    Logger.info('request: ', ctx.session.reqId, ctx.path, ctx.method, ctx.requestParams);
    RATE_LIMIT.counter += 1;
    const { counter, max, limit } = RATE_LIMIT;
    console.log('increase counter: ', ctx.session.reqId, RATE_LIMIT.counter, counter);
    // Destroy the connection that was closed by the client
    ctx.res.on('close', () => {
      Logger.info(`The client (${ctx.session.reqId}) has closed the connection`);
      const index = RATE_LIMIT.queues.findIndex(item => item.reqId === ctx.session.reqId);
      if (index > -1) {
        const rejects = RATE_LIMIT.queues.splice(index, 1);
        rejects[0].reject('The client has closed the connection');
      }
    });
    if (counter > max) {
      // 抛出错误
      throw BaseResponse.create(ErrorCode.SYSTEM_BUSY);
    } else if (counter > limit) {
      // 放入队列
      await new Promise((resolve, reject) => {
        Logger.info(`add the request (${ctx.session.reqId}) to queue`);
        RATE_LIMIT.queues.push({
          resolve,
          reject,
          reqId: ctx.session.reqId
        });
      });
    }
    // await 不能去掉，不然会会直接执行finally
    return await next();
  } finally {
    RATE_LIMIT.counter -= 1;
    console.log('decrease counter: ', ctx.session.reqId, RATE_LIMIT.counter);
    // 执行队列中的任务
    if (RATE_LIMIT.queues.length > 0) {
      const nextRequest = RATE_LIMIT.queues.shift();
      Logger.info(`handle the next request (${nextRequest.reqId})`);
      nextRequest.resolve();
    }
  }
};
