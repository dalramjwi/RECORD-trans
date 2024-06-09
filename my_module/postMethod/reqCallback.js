const parseQsBody = require("./parseqsBody");
const readPath = require("../basic_module/readPath");
const fsFunction = require("../basic_module/fsFunction");
const makePath = require("../basic_module/makePath");
const decodeAndParse = require("../basic_module/decodeAndParse");
const writeHead = require("../basic_module/writeHead");
const mimeType = require("../mimeType");
const template = require("../basic_module/literalTemplate");
const writeHead_302 = require("../basic_module/writeHead_302");
const updateJSON = require("./updateJSON");
const objectJSON = require("./objectJSON");
const getCurrentDate = require("./timeCheck");
const refererUse = require("../basic_module/refererUse");
const getTime = require("./getTime");
const deleteJSON = require("./deleteJSON");

/**
 * reqFunctionSet의 콜백 함수로 사용되기 위한 함수의 모음 객체다.
 */
const reqCallback = {
  /**
   * @param {object} req 요청 객체
   * @param {object} res 응답 객체
   * @param {string} body post 방식으로 데이터를 body 변수에 추가한 값
   */
  callbackWrite: function (req, res, body) {
    //data parse
    let qparse = parseQsBody(body);
    const title = qparse.title;
    const content = qparse.content;
    const tag = qparse.tag;
    const fsreadPath = makePath.publicFolderPath(
      "jsondata",
      "titleData",
      "json"
    );
    let htmlPath = readPath.publicDataPath();

    fsFunction.read(fsreadPath, (data) => {
      let parse = decodeAndParse(data);
      if (parse.includes(title)) {
        writeHead(res, 200, mimeType[".html"]);
        res.end(template.alertMakeTemplate(title));
      } else {
        //전송된 데이터로 html 생성
        fsFunction.write(
          `${htmlPath}/${title}.html`,
          template.htmlTempalte(title, content, tag)
        );
        //전송받은 POST 데이터로 JSON DB 업데이트
        updateJSON("title", title);
        updateJSON("content", content);
        updateJSON("tag", tag);
        //object 용 JSON 제작
        objectJSON("object", qparse, getCurrentDate());
        writeHead_302(res);
        res.end();
      }
    });
  },
  callbackSak: function (req, res, body) {
    let refereName = refererUse(req);
    let dirPath = readPath.publicDataPath();
    const fsreadPath = makePath.publicFolderPath(
      "jsondata",
      "objectData",
      "json"
    );
    fsFunction.readDir(dirPath, (data) => {
      data.forEach((item) => {
        if (item === refereName) {
          fsFunction.read(`${dirPath}/${refereName}`, (data) => {
            let reptime = getTime(data);
            fsFunction.read(fsreadPath, (data) => {
              let parse = decodeAndParse(data);
              for (let i = 0; i < parse.length; i++) {
                if (parse[i].time === reptime) {
                  let data = parse[i].text;
                  let title = data.title;
                  let content = data.content;
                  let tag = data.tag;
                  deleteJSON("content", content);
                  deleteJSON("tag", tag);
                  deleteJSON("title", title);
                  fsFunction.unlink(`${dirPath}/${refereName}`);
                }
              }
            });
          });
        }
      });
      writeHead_302(res);
      res.end();
    });
  },
};
module.exports = reqCallback;
