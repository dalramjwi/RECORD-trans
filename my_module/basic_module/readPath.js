/**
 * 경로를 생성하는 모듈이다. - 폴더
 * @returns {string} - 생성된 경로 문자열
 */
const path = require("path");

const readPath = {
  /**
   * public 폴더 안 데이터 폴더 경로 설정 모듈이다.
   * @returns {string} 데이터 폴더 경로
   */
  publicDataPath: function () {
    return path.join(__dirname, `../../public/data`);
  },
};
module.exports = readPath;
