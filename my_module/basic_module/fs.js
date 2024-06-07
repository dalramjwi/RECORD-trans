/**
 * fs 모듈을 이용한 작용을 function으로 압축해둔 객체
 */
const fs = require("fs");
const fsFunction = {
  read: function (path, err = (err) => console.log("에러 :", err), data) {},
};
module.exports = fsFunction;
