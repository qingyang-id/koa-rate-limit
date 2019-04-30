/**
 * @description 网关控制层
 * @author yq
 * @date 2019-04-29 14:28
 */

class GatewayController {
  async leakyBucket(ctx) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return `Hello ${ctx.query.name}, this is rate limit of leaky bucket!`;
  }
}

module.exports = GatewayController;
