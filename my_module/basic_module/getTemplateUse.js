const decodeAndParse = require("./decodeAndParse");
const reverseList = require("./reverseList");
/**
 *decodeAndParse된 data로 역 순 리스트를 생성하는 함수이다.
 * @param {string} data - 서버로부터 전송받은 데이터
 * @returns {string} - 생성된 HTML 리스트
 */
function templateList(data) {
  let parse = decodeAndParse(data);
  return reverseList(parse);
}
module.exports = templateList;
