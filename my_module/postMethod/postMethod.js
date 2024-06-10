/**
 * post 요청일 때 처리 함수
 * @param {object} req http 요청 객체
 * @param {object} res http 응답 객체
 * @description post 요청의 url에 따라 reqUrlSet 함수로 실행한다.
 */
const reqUrlSet = require("./reqUrlSet");
const reqFunctionSet = require("./reqFunctionSet");

function postMethod(req, res) {
  reqUrlSet(req, res, "write", reqFunctionSet.functionWrite);
  reqUrlSet(req, res, "data/sak", reqFunctionSet.functionSak);
  reqUrlSet(req, res, "searchtitle", reqFunctionSet.functionSearchTitle);
  reqUrlSet(req, res, "searchcontent", reqFunctionSet.functionSearch);
  reqUrlSet(req, res, "searchtag", reqFunctionSet.functionSearch);
  reqUrlSet(req, res, "data/su", reqFunctionSet.functionSu);
  reqUrlSet(req, res, "suwrite", reqFunctionSet.functionSuWrite);
}
module.exports = postMethod;
