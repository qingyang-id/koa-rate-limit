/**
 * @description 路由文件
 * @author yq
 * @date 2019-04-29 14:01
 */
const Router = require('koa-router');
const leakyBucketHandler = require('../libs/middleware/ratelimit/leakyBucketHandler');
const GatewayController = require('../controllers/gatewayController');

const router = new Router();

router
  .get('/leaky-bucket', leakyBucketHandler, new GatewayController().leakyBucket);

module.exports = router.routes();
