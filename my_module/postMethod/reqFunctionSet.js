/**
 * reqUrlSet의 콜백 함수로 사용되기 위한 함수의 모음 객체다.
 */
const reqBaseEvent = require("./reqBaseEvent");
const reqCallback = require("./reqCallback");

const reqFunctionSet = {
  functionWrite: function (req, res) {
    reqBaseEvent(req, res, reqCallback.callbackWrite);
  },
};
module.exports = reqFunctionSet;
