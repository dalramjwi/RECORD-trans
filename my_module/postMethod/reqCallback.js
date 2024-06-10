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
const deleteObjectJSON = require("./deleteObjectJSON");

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
  /**
   * @param {object} req 요청 객체
   * @param {object} res 응답 객체
   * @param {string} body POST 방식으로 전송된 데이터
   */
  callbackSak: function (req, res, body) {
    let refereName = refererUse(req);
    let dirPath = readPath.publicDataPath();
    const fsreadPath = makePath.publicFolderPath(
      "jsondata",
      "objectData",
      "json"
    );
    let name = refereName.split(".")[0];
    fsFunction.readDir(dirPath, (data) => {
      data.forEach((item) => {
        if (item === refereName) {
          fsFunction.read(`${dirPath}/${refereName}`, (data) => {
            let reptime = getTime(data);
            fsFunction.read(fsreadPath, (data) => {
              let parse = decodeAndParse(data);
              for (let i = 0; i < parse.length; i++) {
                if (parse[i].time === reptime && parse[i].text.title === name) {
                  let data = parse[i].text;
                  let title = data.title;
                  let content = data.content;
                  let tag = data.tag;
                  deleteJSON("title", title);
                  deleteJSON("content", content);
                  deleteJSON("tag", tag);
                  deleteObjectJSON(data);
                }
              }
              fsFunction.unlink(`${dirPath}/${refereName}`);
            });
          });
        }
      });
      writeHead_302(res);
      res.end();
    });
  },
  /**
   * @param {object} req 요청 객체
   * @param {object} res 응답 객체
   * @param {string} body POST 방식으로 전송된 데이터
   */
  callbackSearchTitle: function (req, res, body) {
    let qparse = parseQsBody(body);
    const searchTitle = qparse.search;
    const fsreadPath = makePath.publicFolderPath(
      "jsondata",
      "titleData",
      "json"
    );
    fsFunction.read(fsreadPath, (data) => {
      let parse = decodeAndParse(data);
      // console.log("parse: ", parse);
      let searchResults = [];

      // 검색어와 일치하는 제목을 찾아서 searchResults 배열에 추가
      for (let i = 0; i < parse.length; i++) {
        if (parse[i] === searchTitle) {
          searchResults.push(parse[i]);
        }
      }
      // 검색 결과에 따라 응답 처리
      if (searchResults.length > 0) {
        // 검색 결과가 있을 경우 검색된 제목들을 HTML 리스트로 만들어 응답
        function templateList() {
          let list = "<ul>";
          for (let i = 0; i < searchResults.length; i++) {
            list =
              list +
              `<li><a href="./data/${searchResults[i]}.html">${searchResults[i]}</a></li>`;
          }
          list = list + "</ul>";
          return list;
        }
        res.end(template.searchTemplate(templateList()));
      } else {
        res.end(template.alertFindTemplate(searchTitle));
      }
    });
  },
  callbackSearch: function (req, res, body) {
    let qparse = parseQsBody(body);
    const search = qparse.search;
    const fsreadPath = makePath.publicFolderPath(
      "jsondata",
      `objectData`,
      "json"
    );
    fsFunction.read(fsreadPath, (data) => {
      let parse = decodeAndParse(data);
      let searchResults = [];
      // 검색어와 일치하는 content를 가진 title을 찾아서 searchResults 배열에 추가
      for (let i = 0; i < parse.length; i++) {
        if (parse[i].text.content === search) {
          searchResults.push(parse[i].text.title);
        }
      }
      // 검색 결과에 따라 응답 처리
      if (searchResults.length > 0) {
        // 검색 결과가 있을 경우: 검색된 제목들을 HTML 리스트로 만들어 응답
        function templateList() {
          let list = "<ul>";
          for (let i = 0; i < searchResults.length; i++) {
            list =
              list +
              `<li><a href="./data/${searchResults[i]}.html">${searchResults[i]}</a></li>`;
          }
          list = list + "</ul>";
          return list;
        }
        res.end(template.searchTemplate(templateList()));
      } else {
        res.end(template.alertFindTemplate(search));
      }
    });
  },
  callbackSu: function (req, res, body) {},
  callbackSuWrite: function (req, res, body) {},
};
module.exports = reqCallback;
