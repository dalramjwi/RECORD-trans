/**
 * 문자열을 디코딩하고 JS으로 파싱하는 함수이다.
 * return 값으로 디코딩하고 JS 객체화 된 parse가 나온다.
 * @param {string} data - 디코딩할 URI JSON 데이터
 * @returns {object} - 디코딩 후 JS로 파싱된 JSON 객체
 */

function decodeAndParse(data) {
  let decode = decodeURI(data);
  let parse = JSON.parse(decode);
  return parse;
}

module.exports = decodeAndParse;
