/**
 * @description 返回对象类
 * @author      yq
 * @date        2019-04-29 14:00
 */
const ErrorMsg = require('./errorMsg');
const ErrorCode = require('./errorCode');

class BaseResponse extends Error {
  constructor(code, msg, data) {
    super();
    this.code = typeof code === 'number' ? code : 500;
    this.msg = msg || ((ErrorMsg[this.code] && ErrorMsg[this.code].zh_cn) || 'Server error');
    this.data = data;
    this.timestamp = Date.now();
  }

  /**
   * 创建返回信息
   *
   * @param {Number} code 状态码
   * @param {String} msg 描述
   * @param {Object} [data] 返回数据信息
   *
   * @returns {BaseResponse}
   * @public
   */
  static create(code, msg, data) {
    return new BaseResponse(code, msg, data);
  }

  /**
   * 深度克隆返回信息
   *
   * @returns {BaseResponse}
   * @public
   */
  clone() {
    return new BaseResponse(this.code, this.msg, this.data);
  }

  setLanguage(language = 'zh_cn') {
    this.msg = (ErrorMsg[this.code] && ErrorMsg[this.code][language.toLocaleLowerCase()]) || this.msg;
    return this;
  }

  setCode(code) {
    this.code = code;
    return this;
  }

  setMsg(msg) {
    this.msg = msg;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  getData() {
    return this.data;
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }
}

BaseResponse.SUCCESS = BaseResponse.create(ErrorCode.SUCCESS);

module.exports = BaseResponse;
