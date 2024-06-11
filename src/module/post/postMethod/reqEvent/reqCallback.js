/**
 * reqFunctionSet의 콜백 함수로 사용되기 위한 함수의 모음 객체다.
 */
const parseQsBody = require("../../../basic/parse/parseQsBody");
const readPath = require("../../../basic/path/readPath");
const makePath = require("../../../basic/path/makePath");
const fsFunction = require("../../../basic/fsFunction");
const decodeAndParse = require("../../../basic/parse/decodeAndParse");
const writeHead = require("../../../basic/server/writeHead");
const writeHead_302 = require("../../../basic/server/writeHead_302");
const mimeType = require("../../../basic/server/mimeType");
const template = require("../../../basic/literalTemplate");
const updateJSON = require("../hanldleJSON/updateJSON");
const objectJSON = require("../hanldleJSON/objectJSON");
const deleteJSON = require("../hanldleJSON/deleteJSON");
const deleteObjectJSON = require("../hanldleJSON/deleteObjectJSON");
const getCurrentDate = require("../getCurrentDate");
const refererUse = require("../refererUse");
const getTime = require("../getTime");

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
    let htmlPath = readPath.publicHtmlPath();

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
    let dirPath = readPath.publicHtmlPath();
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
              `<li><a href="./html/${searchResults[i]}.html">${searchResults[i]}</a></li>`;
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
              `<li><a href="./html/${searchResults[i]}.html">${searchResults[i]}</a></li>`;
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
  callbackSu: function (req, res, body) {
    let refereName = refererUse(req);
    let name = refereName.split(".")[0];
    let tArr = [];
    let dirPath = readPath.publicHtmlPath();
    const fsreadPath = makePath.publicFolderPath(
      "jsondata",
      "objectData",
      "json"
    );
    fsFunction.read(fsreadPath, (data) => {
      let objectData = decodeAndParse(data);
      for (let i = 0; i < objectData.length; i++) {
        let text = objectData[i].text;
        let title = text.title;
        tArr.push(title);
        if (tArr[i] === name) {
          let ptitle = text.title;
          let pcontent = text.content;
          let ptag = text.tag;
          deleteJSON("title", ptitle);
          deleteJSON("content", pcontent);
          deleteJSON("tag", ptag);
          deleteObjectJSON(objectData[i].text);

          fsFunction.unlink(`${dirPath}/${refereName}`);
          res.end(template.suTemplate(ptitle, pcontent, ptag));
        }
      }
    });
  },
  callbackSuWrite: function (req, res, body) {
    let parse = parseQsBody(body);
    let title = parse.title;
    let content = parse.content;
    let tag = parse.tag;
    let dirPath = readPath.publicHtmlPath();
    fsFunction.write(
      `${dirPath}/${title}.html`,
      template.htmlTempalte(title, content, tag)
    );
    updateJSON("title", title);
    updateJSON("content", content);
    updateJSON("tag", tag);
    objectJSON("object", parse, getCurrentDate());
    writeHead_302(res);
    res.end();
  },
};
module.exports = reqCallback;
