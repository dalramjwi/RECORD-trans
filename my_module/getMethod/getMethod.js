/**
 * get 요청일 때 처리 함수
 * @param {object} req http 요청 객체
 * @param {object} res http 응답 객체
 * @param {string} filePath 요청된 파일 경로
 * @param {string} contentType 콘텐츠 mime 유형
 * @description 기본적으로는 public 폴더 안의 요청된 파일을 읽어와 응답하지만,
 * `/` 경로로 요청된 경우에는 html 템플릿을 생성해 응답한다.
 */
const fs = require("fs");
const writeHead = require("../basic_module/writeHead");
const mimeType = require("../mimeType");
const fsFunction = require("../basic_module/fs");
const template = require("../basic_module/literalTemplate");

function getMethod(req, res, filePath, contentType) {
  // console.log(req.url);
  if (req.url === "/") {
    writeHead(res, 200, mimeType[".html"]);
    //titleData.json 읽어와 리스트 생성
    let path = "./public/jsondata/titleData.json";
    fsFunction.read(path, (data) => {
      // fs.readFile("./public/jsondata/titleData.json", (err, data) => {
      function templateList(data) {
        let decode = decodeURI(data);
        let parse = JSON.parse(decode);
        let list = "<ul>";
        for (let i = parse.length - 1; i > parse.length - 6; i--) {
          if (parse[i] === undefined) {
            list =
              list +
              `<li style="visibility: hidden;"><a href="./public/data/${parse[i]}.html">${parse[i]}</a></li>`;
          } else {
            list =
              list +
              `<li><a href="./data/${parse[i]}.html">${parse[i]}</a></li>`;
          }
        }
        list = list + "</ul>";
        return list;
      }
      const htmlList = `${templateList(data)}`;
      res.end(template.createTemplate(htmlList));
      // });
    });

    //이외에는 자동으로 해석
  } else {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log("오류 발생 : ", err);
      } else {
        writeHead(res, 200, contentType);
        res.end(data);
      }
    });
  }
}
module.exports = getMethod;
