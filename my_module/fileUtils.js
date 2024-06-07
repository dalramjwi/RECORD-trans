/**
 * 전달받은 url에 따라 파일의 확장자를 분석하고, 이 확장자에 따른 mimeType과 contentType을 할당하기 위한 함수를 가진 객체
 */
const mimeType = require("./mimeType.js");

//*url에 따른 파일 경로 결정 함수 객체
const fileUtils = {
  //*매개변수 url에 따른 파일 경로 할당
  getFilePath: function (url) {
    let filePath;
    if (url === "/") {
      filePath = "./public/index.html";
    } else {
      filePath = `./public${url}`;
    }
    return filePath;
  },
  //*파일 경로에 따른 파일 확장자 가져오기
  getFileExtension: function (filePath) {
    //*파일 확장자를 가져오는 명령어
    let ext = path.extname(filePath);
    //*파일 확장자 소문자로 변환
    return ext.toLowerCase();
  },
  //*파일 확장자에 따른 표기 반환
  getContentType: function (ext) {
    //*mimeType에 ext로 가져온 확장자가 있다면 표기 반환
    if (mimeType.hasOwnProperty(ext)) {
      return mimeType[ext];
    } else {
      return "text/plain";
    }
  },
};
