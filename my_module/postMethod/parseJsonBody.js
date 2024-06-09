//json으로 parse 해주는 함수

/**
 * @param {string} qparse body가 qs.parse 된 값
 * @returns {Object} 파싱된 데이터 객체 혹은 문자열, 배열
 */
function parseJsonBody(qparse) {
  let jparse = JSON.stringify(qparse);
  return jparse;
}

module.exports = parseJsonBody;
