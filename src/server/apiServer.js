/**
 * @description 网关服务启动脚本
 * @author yq
 * @date 2019-04-29 10:33
 */
const Koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const koaCors = require('koa2-cors');
const { appConfig } = require('../config');
const errorHandler = require('../libs/middleware/errorHandler');
const requestHandler = require('../libs/middleware/requestHandler');
const responseHandler = require('../libs/middleware/responseHandler');
const routes = require('../routes');
const Logger = require('../utils/logger').getLogger('rate-limit-server');


class ApiServer {
  constructor() {
    this.app = null;
  }

  async init() {
    this.app = new Koa();

    // 开启nginx获取真实ip
    this.app.proxy = true;

    // enable Access-Control-Allow-Origin
    this.app.use(koaCors({ origin: '*' }));

    // enable Gzip todo

    //  post body parser
    this.app.use(koaBodyParser({ formLimit: '2048kb' }));

    //  the request handler
    this.app.use(requestHandler);

    //  error handle
    this.app.use(errorHandler);

    // the response handler
    this.app.use(responseHandler);

    // load routes
    this.app.use(routes);

    return this;
  }

  start() {
    const { host, port } = appConfig;
    this.app.listen(port, host, () => {
      Logger.info(`open gateway server started, address: ${host}:${port}!`);
    })
      .on('clientError', (err, socket) => {
        Logger.error('HTTP/1.1 400 Bad Request: ', err);
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
      });
  }
}

module.exports = ApiServer;
