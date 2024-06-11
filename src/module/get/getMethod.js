/**
 * get 요청일 때 처리 함수
 * @param {object} req http 요청 객체
 * @param {object} res http 응답 객체
 * @param {string} filePath 요청된 파일 경로
 * @param {string} contentType 콘텐츠 mime 유형
 * @description 기본적으로는 public 폴더 안의 요청된 파일을 읽어와 응답하지만,
 * `/` 경로로 요청된 경우에는 html 템플릿을 생성해 응답한다.
 */
const writeHead = require("../basic/server/writeHead");
const mimeType = require("../basic/server/mimeType");
const fsFunction = require("../basic/fsFunction");
const template = require("../basic/literalTemplate");
const templateList = require("./getMethod/getTemplateList");
const makePath = require("../basic/path/makePath");

function getMethod(req, res, filePath, contentType) {
  // console.log(req.url);
  if (req.url === "/") {
    writeHead(res, 200, mimeType[".html"]);
    //titleData.json 읽어와 리스트 생성
    let path = makePath.publicFolderPath("jsondata", "titleData", "json");
    fsFunction.read(path, (data) => {
      const htmlList = templateList(data);
      res.end(template.createTemplate(htmlList));
    });
    //이외에는 자동으로 해석
  } else {
    fsFunction.read(filePath, (data) => {
      writeHead(res, 200, contentType);
      res.end(data);
    });
  }
}
module.exports = getMethod;
