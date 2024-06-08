/**
 * 문자열을 디코딩하고 JSON으로 파싱하는 함수이다.
 * @param {string} data - 디코딩할 URI 데이터
 * @returns {object} - 파싱된 JSON 객체
 */

function decodeAndParse(data) {
  let decode = decodeURI(data);
  return JSON.parse(decode);
}

module.exports = decodeAndParse;
