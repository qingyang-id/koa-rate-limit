/**
 * @description http请求工具类
 * @author yq
 * @date 2019-04-29 11:04
 */
const request = require('request');
const qs = require('querystring');

/**
 * 请求参数处理
 * @param  {Object} opts 请求参数
 * @return {Object}      处理后的请求参数
 */
function handleParams(opts) {
  if (!opts) {
    throw new Error('请求参数不正确');
  }
  if (!opts.method) {
    throw new Error('请求方式不正确');
  }
  opts.method = opts.method.toUpperCase();
  if (!['GET', 'POST', 'DELETE', 'PATCH', 'PUT', 'HEAD', 'OPTIONS'].includes(opts.method)) {
    throw new Error('请求方式不正确');
  }
  if (!opts.url) {
    throw new Error('请求路径不能为空');
  }
  // query 参数处理
  if (opts.query) {
    const query = qs.stringify(opts.query);
    opts.url = opts.url.indexOf('?') === -1 ? `${opts.url}?${query}` : `${opts.url}&${query}`;
  }
  // params参数处理
  if (opts.params) {
    Object.keys(opts.params)
      .forEach((key) => {
        opts.url = opts.url.replace(`:${key}`, opts.params[key]);
      });
  }
  return opts;
}

class HttpUtil {
  /**
   * http请求通用方法 调用方法
   * // get请求实例
   * HttpUtil.send({
   *    method: 'GET'
   *    url: 'http://api.tokenclub.com/v1/users,
   *    query: {
   *      uid: 10423
   *    }
   * })
   * // post请求实例
   * HttpUtil.send({
   *    method: 'POST'
   *    url: 'http://api.tokenclub.com/v1/sms/send,
   *    body: {
   *      uid: 10423,
   *      type: 1
   *    }
   * })
   * // 路径中有参数的请求, params中的key必须和路径总保持一致
   * HttpUtil.send({
   *    method: 'POST'
   *    url: 'http://api.tokenclub.com/v1/user/:userId,
   *    params: {
   *      userId: 10423
   *    },
   *    body: {
   *      type: 1
   *    }
   * })
   *  // post 图片上传
   * HttpUtil.send({
   *    headers = {
   *      'Content-Type': 'multipart/form-data'
   *    },
   *    method: 'POST',
   *    url: 'http://api.tokenclub.com/v1/upload,
   *    data: formData(文件表单数据)
   * })
   * @param opts
   * @-- {String}  opts.method 请求方法
   * @-- {String}  opts.url 请求url
   * @-- {Object}  opts.headers 请求头
   * @-- {Boolean}  opts.json 如果为true sets body to JSON representation of value and adds Content-type: application/json header. Additionally, parses the response body as JSON
   * @-- {Object}  opts.body 请求数据,body中的参数
   * @-- {Object}  opts.form 请求数据,form表单提交，此值不为空是，请求头为Content-type: application/x-www-form-urlencoded
   * @-- {Object}  opts.query 请求数据,query中的参数
   * @-- {Object}  opts.qs qs请求参数
   * @param {Object} extras 额外的请求参数
   * @-- {Number}  extras.retryCount 重试次数
   * @returns {*}
   */
  static async send(opts) {
    opts = handleParams(opts);
    const sendOpts = {
      method: opts.method,
      url: opts.url,
      timeout: opts.timeout || 60000,
    };
    // 基础URL
    if (opts.baseUrl) sendOpts.baseUrl = opts.baseUrl;
    // 此项返回原文，用于下载文件
    if (typeof opts.encoding !== 'undefined') opts.encoding = opts.encoding;
    // 设置header
    if (opts.headers) sendOpts.headers = opts.headers;
    // 是否以json格式返回
    if (typeof opts.json === 'boolean') sendOpts.json = opts.json;
    // 表单数据
    if (opts.form) sendOpts.form = opts.form;
    // post body数据
    if (opts.body) sendOpts.body = opts.body;
    // form表单数据
    if (opts.formData) sendOpts.formData = opts.formData;
    if (opts.qs) sendOpts.qs = opts.qs;
    if (opts.encoding) sendOpts.encoding = opts.encoding;
    return new Promise((resolve, reject) => {
      request(sendOpts, (err, response, body) => {
        if (err) return reject(err);
        return resolve({
          response,
          body
        });
      });
    });
  }
}

module.exports = HttpUtil;
