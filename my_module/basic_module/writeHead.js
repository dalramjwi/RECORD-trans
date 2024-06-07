/**
 *
 * @param {object} res http 요청 객체
 * @param {string} statusCode http 응답 상태 코드
 * @param {string} contentType 콘텐츠 mime 유형
 * @returns res.writeHead(statusCode, { "Content-type": contentType }); 의 리터럴
 */
const writeHead = function (res, statusCode, contentType) {
  return res.writeHead(statusCode, { "Content-type": contentType });
};
module.exports = writeHead;
