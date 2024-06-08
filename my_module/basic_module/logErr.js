/**
 * 오류를 콘솔에 에러 로그로 출력하는 함수이다.
 * @param {string} err 오류
 * @returns console.error("오류 발생 : ", err);
 */
const logErr = function (err) {
  return console.error("오류 발생 : ", err);
};
module.exports = logErr;
