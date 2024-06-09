/**
 * reqUrlSet의 콜백 함수로 사용되기 위한 함수의 모음 객체다.
 */
const reqBaseEvent = require("./reqBaseEvent");
const reqCallback = require("./reqCallback");

const reqFunctionSet = {
  /**
   * url이 write일 떄 요청 처리 함수
   * @param {object} req 요청 객체
   * @param {object} res 응답 객체
   */
  functionWrite: function (req, res) {
    reqBaseEvent(req, res, reqCallback.callbackWrite);
  },
};
module.exports = reqFunctionSet;
