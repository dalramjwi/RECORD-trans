/**
 * post가 데이터를 수신하고, 수신이 완료되면 콜백함수를 호출하는 기본형이다.
 * @param {object} req server의 request 객체
 * @param {object} res server의 response 객체
 * @param {function} callback 실행할 콜백 함수
 */
const reqBaseEvent = function (req, res, callback) {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", () => {
    callback(req, res, body);
  });
};
module.exports = reqBaseEvent;
