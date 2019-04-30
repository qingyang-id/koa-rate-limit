/**
 * @description 启动入口
 * @author yq
 * @date 2019-04-29 10:22
 */
require('./utils/logger');
const ApiServer = require('./server/apiServer');

// 启动API服务
new ApiServer().init()
  .then(apiServer => apiServer.start());
