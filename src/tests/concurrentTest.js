/**
 * @description 接口测试
 * @author yq
 * @date 2019-04-29 18:22
 */
const Promise = require('bluebird');
const HttpUtil = require('../utils/httpUtil');
const apiUrl = 'http://localhost:8001';

async function send(opts) {
  if (!opts) throw new Error('请求参数错误');
  const newOpts = Object.assign({}, opts);
  newOpts.baseUrl = apiUrl;
  newOpts.json = true;
  newOpts.query = newOpts.query || {};
  newOpts.query.time = Date.now();
  const { body = {} } = await HttpUtil.send(newOpts);
  console.info('\n\n\nrequest succeed, params: ', opts.i, opts.url, opts.query, ', result:', body);
  return body;
}

const promises = []
for(let i = 0; i <= 30; i += 1) {
  promises.push({
    i,
    url: `/token-bucket`,
    method: 'GET',
    query: { name: `request-${i}` },
    // timeout: 5000
  });
}

Promise.map(promises, promise => send(promise)
  .catch(err => console.error('request failed: ', err))
  .then(() => new Promise(resolve => setTimeout(() => resolve(), 3000))), {
  concurrency: 3,
});
