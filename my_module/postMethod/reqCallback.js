const parseJsonBody = require("./parseJsonBody");
const parseQsBody = require("./parseqsBody");
const readPath = require("../basic_module/readPath");
const fsFunction = require("../basic_module/fs");
const makePath = require("../basic_module/makePath");

/**
 * reqFunctionSet의 콜백 함수로 사용되기 위한 함수의 모음 객체다.
 */
const reqCallback = {
  /**
   * @param {string} body post 방식으로 데이터를 body 변수에 추가한 값
   */
  callbackWrite: function (body) {
    //data parse
    let qparse = parseQsBody(body);
    // let jparse = parseJsonBody(qparse);
    const title = qparse.title;
    const content = qparse.content;
    const tag = qparse.tag;
    const publicDataPath = readPath.publicDataPath;
    const fsreadPath = makePath.publicFolderPath(
      "jsondata",
      "titleData",
      "json"
    );
    fsFunction.read(fsreadPath, (data) => {
      //한글이나 특수 문자 등이 포함되어 있는 경우 해독을 위한 decode 사용
      let decode = decodeURI(data);
      //json 파일을 읽어오기에 JSON.parse 실행
      let parse = JSON.parse(decode);
      if (parse.includes(title)) {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.end(template.alertMakeTemplate(title));
      } else {
        //전송된 데이터로 html 생성
        fs.writeFile(
          `${publicDataPath}/${title}.html`,
          template.htmlTempalte(title, content, tag),
          (err) => {
            // console.log(err);
          }
        );
        //전송받은 POST 데이터로 JSON DB 업데이트
        updateJSON("title", title);
        updateJSON("content", content);
        updateJSON("tag", tag);
        //object 용 JSON 제작
        objectJSON("object", qparse, getCurrentDate());
        res.writeHead(302, { Location: "/" });
        res.end();
      }
    });
  },
};
module.exports = reqCallback;
