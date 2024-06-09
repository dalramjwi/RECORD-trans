/**
 * reqUrlSet의 콜백 함수로 사용되기 위한 함수의 모음 객체다.
 */
const reqBaseEvent = require("./reqBaseEvent");
const reqCallback = require("./reqCallback");

const reqFunctionSet = {
  /**
   * url이 write일 때 요청 처리 함수
   * @param {object} req 요청 객체
   * @param {object} res 응답 객체
   */
  functionWrite: function (req, res) {
    reqBaseEvent(req, res, reqCallback.callbackWrite);
  },
  /**
   * url이 data/sak일 때 요청 처리 함수
   * @param {object} req 요청 객체
   * @param {object} res 응답 객체
   */
  functionSak: function (req, res) {
    reqBaseEvent(req, res, reqCallback.callbackSak);
  },
  /**
   * url이 searchtitle일 때 요청 처리 함수
   * @param {object} req 요청 객체
   * @param {object} res 응답 객체
   */
  functionSearchTitle: function (req, res) {
    reqBaseEvent(req, res, reqCallback.callbackSearchTitle);
  },
  /**
   * url이 searchcontent일 때 요청 처리 함수
   * @param {object} req 요청 객체
   * @param {object} res 응답 객체
   */
  functionSearchContent: function (req, res) {
    reqBaseEvent(req, res, reqCallback.callbackSearchContent);
  },
  /**
   * url이 searchtag일 때 요청 처리 함수
   * @param {object} req 요청 객체
   * @param {object} res 응답 객체
   */
  functionSearchTag: function (req, res) {
    reqBaseEvent(req, res, reqCallback.callbackSearchTag);
  },
  /**
   * url이 data/su일 때 요청 처리 함수
   * @param {object} req 요청 객체
   * @param {object} res 응답 객체
   */
  functionSu: function (req, res) {
    reqBaseEvent(req, res, reqCallback.callbackSu);
  },
  /**
   * url이 suwrite일 때 요청 처리 함수
   * @param {object} req 요청 객체
   * @param {object} res 응답 객체
   */
  functionSuWrite: function (req, res) {
    reqBaseEvent(req, res, reqCallback.callbackSuWrite);
  },
};
module.exports = reqFunctionSet;
