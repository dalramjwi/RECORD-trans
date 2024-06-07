const serverSet = function serverSet(port) {
  const http = require("http");
  const fs = require("fs");
  const path = require("path");
  const qs = require("node:querystring");
  const fileUtils = require("./fileUtils.js");
  const getMethod = require("./getMethod/getMethod.js");
  const postMethod = require("./postMethod/postMethod.js");
  const nullfavicon = require("./favicon.js");
  const template = require("./literalTemplate");
  const updateJSON = require("./updateJSON");
  const objectJSON = require("./objectJSON");
  const getCurrentDate = require("./timeCheck");
  const getTime = require("./getTime.js");
  const deleteJSON = require("./deleteJSON.js");
  const searchPOSTTemplate = require("./searchTemplate.js");
  const titleData = require("../public/titleData.json");
  const contentData = require("../public/contentData.json");
  const tagData = require("../public/tagData.json");

  // //*서버 생성
  const server = http.createServer((req, res) => {
    let url = req.url;
    nullfavicon();
    //*filePath라는 변수를 getFilePath에 req.url을 매개변수로 삽입한 값으로 할당
    let filePath = fileUtils.getFilePath(url);
    //*ext 변수는 getFileExtenstion에 filePath를 삽입한 값으로 할당
    let ext = fileUtils.getFileExtension(filePath);
    //*contentType 변수는 getContentType에 ext를 삽입한 값으로 할당
    let contentType = fileUtils.getContentType(ext);

    if (req.method === "GET") {
      filePath = decodeURI(filePath);
      getMethod(req, res, filePath, contentType);
    } else if (req.method === "POST") {
      filePath = decodeURI(filePath);
      postMethod(req, res);
    }
  });

  server.listen(port, (err) => {
    if (err) {
      console.log("오류 : ", err);
    } else {
      console.log(`https://localhost:${port}`);
    }
  });
};

//*매개변수 port 작성법
//*serverSet(3000);

//? export한 데이터 받아오는 명령어
//?const serverSet = require("./serverSet");

module.exports = serverSet;
