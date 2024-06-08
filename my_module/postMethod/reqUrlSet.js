/**
 *
 * @param {object} req server의 request 객체
 * @param {string} address 접속할 주소
 * @return {}
 */
const path = require("path");

const reqUrlSet = function (req, address) {
  if (req.url === `/${address}`) {
  }
};
module.exports = reqUrlSet;
console.log(reqUrlSet());
