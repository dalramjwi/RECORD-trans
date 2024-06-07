/**
 * 전달받은 url에 따라 파일의 확장자를 분석하고, 이 확장자에 따른 mimeType과 contentType을 할당하기 위한 함수를 가진 객체
 */
const path = require("path");
const mimeType = require("./mimeType.js");

//*url에 따른 파일 경로 결정 함수 객체
const fileUtils = {
  /**
   *url에 따른 파일 경로 할당
   * @param {string} url 요청된 url 경로
   * @returns {string} ./public 폴더 안의 파일의 전체 경로
   */
  getFilePath: function (url) {
    let filePath;
    if (url === "/") {
      filePath = "./public/index.html";
    } else {
      filePath = `./public${url}`;
    }
    return filePath;
  },
  /**
   * 파일 경로에 따른 파일 확장자 가져오기
   * @param {string} filePath 파일의 전체 경로
   * @returns {string} 파일의 확장자 (ex; `.html`)
   */
  getFileExtension: function (filePath) {
    //*파일 확장자를 가져오는 명령어
    let ext = path.extname(filePath);
    //*파일 확장자 소문자로 변환
    return ext.toLowerCase();
  },
  /**
   *파일 확장자에 따른 표기 반환
   * @param {string} ext 파일 확장자
   * @returns {string} mimeType 객체의 contentType, mimeType 객체에 존재하지 않을 경우 'text/plain' 반환
   */
  getContentType: function (ext) {
    //*mimeType에 ext로 가져온 확장자가 있다면 표기 반환
    if (mimeType.hasOwnProperty(ext)) {
      return mimeType[ext];
    } else {
      return "text/plain";
    }
  },
};
module.exports = fileUtils;
