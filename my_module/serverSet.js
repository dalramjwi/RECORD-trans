/**
 * port 번호를 입력해 server를 실행하는 함수이다.
 * @param {number} port port 번호
 */
const serverSet = function serverSet(port) {
  const http = require("http");
  const fileUtils = require("./basic_module/fileUtils.js");
  const getMethod = require("./getMethod/getMethod.js");
  const postMethod = require("./postMethod/postMethod.js");
  const logErr = require("./basic_module/logErr.js");
  // const titleData = require("../public/titleData.json");
  // const contentData = require("../public/contentData.json");
  // const tagData = require("../public/tagData.json");

  /**
   * 서버를 생성하고 요청을 처리하는 함수
   * @param {Object} req - 요청 객체
   * @param {Object} res - 응답 객체
   */

  const server = http.createServer((req, res) => {
    // 요청 url url에 할당
    let url = req.url;
    //favicon 요청 무시
    if (req.url === "/favicon.ico") return;
    //filePath라는 변수를 getFilePath에 req.url을 매개변수로 삽입한 값으로 할당
    let filePath = fileUtils.getFilePath(url);
    //ext 변수는 getFileExtenstion에 filePath를 삽입한 값으로 할당
    let ext = fileUtils.getFileExtension(filePath);
    //contentType 변수는 getContentType에 ext를 삽입한 값으로 할당
    let contentType = fileUtils.getContentType(ext);

    // GET 요청 처리
    if (req.method === "GET") {
      // 파일 경로를 디코딩
      filePath = decodeURI(filePath);
      // getMethod로 요청 처리
      getMethod(req, res, filePath, contentType);
    } else if (req.method === "POST") {
      // 파일 경로를 디코딩
      filePath = decodeURI(filePath);
      // postMethod로 요청 처리
      postMethod(req, res);
    }
  });

  /**
   * port 번호로 server를 실행시키는 실행함수
   * @param {number} port port 번호
   * @param {function} err err 콜백 함수이다.
   */
  server.listen(port, (err) => {
    if (err) {
      logErr(err);
    } else {
      console.log(`http://localhost:${port}`);
    }
  });
};

//*매개변수 port 작성법
//*serverSet(3000);

//? export한 데이터 받아오는 명령어
//?const serverSet = require("./serverSet");

module.exports = serverSet;
