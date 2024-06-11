/**
 * body를 qs로 parse 해주는 함수
 * @param {string} body post 방식으로 데이터를 body 변수에 추가한 값
 * @returns {Object} 파싱된 데이터 객체
 */
const qs = require("querystring");

function parseQsBody(body) {
  let qparse = qs.parse(body);
  return qparse;
}

module.exports = parseQsBody;
