/**
 *postMethod에서 req.url이 특정 주소일 때 어떠한 것을 실행할 것이라 연결해주는 함수이다.
 * @param {object} req server의 request 객체
 * @param {string} address 접속할 주소
 * @param {function} callback 일치할 경우 실행할 콜백 함수
 */

const reqUrlSet = function (req, address, callback) {
  if (req.url === `/${address}`) {
    callback();
  }
};
module.exports = reqUrlSet;
