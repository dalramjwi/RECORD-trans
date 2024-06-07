/**
 * fs 모듈을 이용한 작용을 function으로 압축해둔 객체
 */
const fs = require("fs");
const fsFunction = {
  /**
   * fs.readfile의 함수화, readfile을 한 후 실행할 함수를 콜백함수로 지정했다.
   * @param {string} path file을 읽어올 경로
   * @param {function(data)} callback 실행할 콜백함수
   */
  read: function (path, callback) {
    fs.readFile(`${path}`, (err, data) => {
      if (err) {
        console.error("에러 : ", err);
      } else {
        callback(data);
      }
    });
  },
};
module.exports = fsFunction;
