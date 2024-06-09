/**
 * fs 모듈을 이용한 작용을 function으로 압축해둔 객체
 */
const fs = require("fs");
const logErr = require("./logErr");
const fsFunction = {
  /**
   * fs.readfile의 함수화, readfile을 한 후 실행할 함수를 콜백함수로 지정했다.
   * @param {string} path file을 읽어올 경로
   * @param {function(data)} callback 실행할 콜백함수
   * @description callback 함수 실행할 때 (data) => {} 식으로 화살표 함수 권장
   */
  read: function (path, callback) {
    fs.readFile(`${path}`, (err, data) => {
      if (err) {
        logErr(err);
      } else {
        callback(data);
      }
    });
  },
  write: function (path, data) {
    fs.writeFile(`${path}`, data, (err) => {
      if (err) {
        logErr(err);
      }
    });
  },
};
module.exports = fsFunction;
